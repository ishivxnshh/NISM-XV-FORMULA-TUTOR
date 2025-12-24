import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface Subscription {
  id: string;
  status: string;
  current_end: string;
  plan_name: string;
  amount: number;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  subscription: Subscription | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  hasActiveSubscription: boolean;
  refreshSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  // Initialize subscription from localStorage (prevents flash of "Inactive")
  const [subscription, setSubscription] = useState<Subscription | null>(() => {
    try {
      const cached = localStorage.getItem('subscription_status');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  const fetchSubscription = async (userId: string) => {
    try {
      // Create a timeout promise to prevent hanging
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), 4000)
      );

      const dbQuery = supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();

      // @ts-ignore
      const { data, error } = await Promise.race([dbQuery, timeoutPromise])
        .catch(err => ({ data: null, error: err }));

      if (error) {
        // IMPORTANT: Do NOT clear existing subscription on transient errors (timeout/network)
        // Only clear if we receive a specific "not found" error or if the user is explicitly null
        if (error.code === 'PGRST116') { // JSON object requested, multiple (or no) rows returned
          setSubscription(null);
          localStorage.removeItem('subscription_status');
        } else {
          // For timeouts or network errors, keep the stale state to prevent UI flicker
          console.warn('Subscription fetch warning (keeping stale state):', error);
        }
        return;
      }

      if (data) {
        setSubscription(data);
        localStorage.setItem('subscription_status', JSON.stringify(data));
      } else {
        setSubscription(null);
        localStorage.removeItem('subscription_status');
      }
    } catch (error) {
      // Keep stale state on crash
      console.error('Error in fetchSubscription:', error);
    }
  };

  useEffect(() => {
    let mounted = true;

    // Set a timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      if (mounted && loading) {
        setLoading(false);
      }
    }, 3000);

    // Get initial session
    supabase.auth.getSession()
      .then(({ data: { session }, error }) => {
        if (!mounted) return;

        if (error) console.error('Error getting session:', error);

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          fetchSubscription(session.user.id).finally(() => {
            if (mounted) setLoading(false);
          });
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Session fetch error:', error);
        if (mounted) setLoading(false);
      });

    // Listen for auth changes
    const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Fetch in background (don't set loading=true to prevent flicker)
          await fetchSubscription(session.user.id);
        } else {
          setSubscription(null);
          localStorage.removeItem('subscription_status');
        }

        // Only set loading false if it was true (initial load)
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      clearTimeout(loadingTimeout);
      authListener.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    });

    if (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      throw error;
    }
    setSubscription(null);
    localStorage.removeItem('subscription_status');
  };

  const refreshSubscription = async () => {
    if (user) {
      await fetchSubscription(user.id);
    }
  };

  const hasActiveSubscription = subscription !== null &&
    subscription.status === 'active' &&
    new Date(subscription.current_end) > new Date();

  return (
    <AuthContext.Provider value={{
      user,
      session,
      subscription,
      loading,
      signInWithGoogle,
      signOut,
      hasActiveSubscription,
      refreshSubscription
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

