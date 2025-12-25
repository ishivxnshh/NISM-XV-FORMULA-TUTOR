import { useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Home, User, LogOut, ChevronDown, Crown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface NavbarProps {
  onOpenAuthModal?: (tab: 'login' | 'signup') => void;
}

export function Navbar({ onOpenAuthModal }: NavbarProps = {}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isHome = location.pathname === '/';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setShowDropdown(false);
    setLoggingOut(true);

    try {
      // Sign out from Supabase (this will trigger state cleanup in AuthContext)
      await supabase.auth.signOut();

      // Clear all storage
      localStorage.clear();
      sessionStorage.clear();

      // Soft navigation using React Router (smoother, avoids Vite "module" errors)
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      setLoggingOut(false);
      // Fallback if soft navigation fails
      window.location.href = '/';
    }
  };

  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-pska py-3 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
        <div className="absolute inset-0 shimmer"></div>
        <p className="text-white text-xs sm:text-sm font-medium relative z-10 pulse-subtle">
          🎓 Prof. Sheetal Kunder Academy practice quiz and case studies are updated with Jan 2026 curriculum
        </p>
      </div>

      {/* Main Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-lg sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-full mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Logo */}
            <a
              href="https://www.profsheetalkunderacademy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 hover:opacity-80 transition-all transform hover:scale-105"
              aria-label="Prof. Sheetal Kunder Academy"
            >
              <img
                src="/logo.webp"
                alt="Prof. Sheetal Kunder Academy"
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg shadow-md"
              />
            </a>

            {/* Navigation */}
            <nav className="flex items-center gap-2 sm:gap-3" role="navigation" aria-label="Main Navigation">
              <button
                onClick={() => navigate('/')}
                className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-md hover:shadow-xl transition-all flex items-center gap-1.5 button-press ${isHome
                  ? 'bg-gradient-pska text-white scale-105'
                  : 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 hover:scale-105'
                  }`}
                aria-current={isHome ? 'page' : undefined}
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all theme-toggle button-press hover:shadow-md"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300 rotate-in" />
              ) : (
                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300 rotate-in" />
              )}
            </button>

            {/* Login Button or User Profile */}
            {!user ? (
              <button
                onClick={() => onOpenAuthModal?.('login')}
                className="px-4 py-2 bg-gradient-pska text-white rounded-lg hover:shadow-xl transition-all font-medium button-press"
              >
                Login
              </button>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all button-press"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-pska flex items-center justify-center text-white font-semibold">
                    {getUserDisplayName().charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                    {getUserDisplayName()}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-700 dark:text-gray-300 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.user_metadata?.full_name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        navigate('/dashboard');
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Dashboard
                    </button>

                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        navigate('/subscribe');
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
                    >
                      <Crown className="w-4 h-4" />
                      Subscription
                    </button>

                    <button
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className={`w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors ${loggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {loggingOut ? (
                        <div className="w-4 h-4 border-2 border-red-600 dark:border-red-400 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <LogOut className="w-4 h-4" />
                      )}
                      {loggingOut ? 'Logging out...' : 'Logout'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
