import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Sun, Moon, LogOut, ChevronDown, User } from 'lucide-react';
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
      await supabase.auth.signOut();
      localStorage.clear();
      sessionStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      setLoggingOut(false);
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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Formulas', path: '/formulas' },
    { name: 'Quiz', path: '/quiz' },
    { name: 'Subscribe', path: '/subscribe' },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 py-2 px-4 text-center">
        <p className="text-white text-xs sm:text-sm font-medium">
          🎓 Practice quiz and case studies updated with Jan 2026 curriculum
        </p>
      </div>

      {/* Floating Pill Navbar */}
      <div className="sticky top-4 z-50 px-4 mt-4">
        <nav className="max-w-5xl mx-auto bg-gray-900 dark:bg-gray-800 rounded-full px-6 py-2.5 shadow-2xl shadow-black/20 flex items-center justify-between border border-gray-700/50">
          {/* Left - Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
              <img
                src="/logo.webp"
                alt="Logo"
                className="w-6 h-6 rounded-full"
              />
            </div>
            <span className="hidden sm:block text-white font-semibold">PSKA</span>
          </Link>

          {/* Center - Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${location.pathname === link.path
                  ? 'text-white bg-white/10'
                  : 'text-gray-400 hover:text-white'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* User Menu or Login */}
            {!user ? (
              <button
                onClick={() => onOpenAuthModal?.('login')}
                className="px-4 py-2 bg-white text-gray-900 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Login
              </button>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-xs">
                    {getUserDisplayName().charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-sm text-white">
                    {getUserDisplayName()}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-56 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 py-1 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-700">
                      <p className="text-sm font-medium text-white">
                        {user.user_metadata?.full_name || 'User'}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors disabled:opacity-50"
                    >
                      {loggingOut ? (
                        <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
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
        </nav>
      </div>
    </>
  );
}
