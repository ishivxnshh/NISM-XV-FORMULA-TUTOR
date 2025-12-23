import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Brain, Sun, Moon, Home } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isHome = location.pathname === '/';
  const isFormulas = location.pathname === '/formulas';
  const isQuiz = location.pathname === '/quiz';

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
              <button
                onClick={() => navigate('/formulas')}
                className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-md hover:shadow-xl transition-all flex items-center gap-1.5 button-press ${isFormulas
                  ? 'bg-gradient-pska text-white scale-105'
                  : 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 hover:scale-105'
                  }`}
                aria-current={isFormulas ? 'page' : undefined}
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Formula Tutor</span>
                <span className="sm:hidden">Formulas</span>
              </button>
              <button
                onClick={() => navigate('/quiz')}
                className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-md hover:shadow-xl transition-all flex items-center gap-1.5 button-press ${isQuiz
                  ? 'bg-gradient-pska text-white scale-105'
                  : 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 hover:scale-105'
                  }`}
                aria-current={isQuiz ? 'page' : undefined}
              >
                <Brain className="w-4 h-4" />
                <span className="hidden sm:inline">Quiz Practice</span>
                <span className="sm:hidden">Quiz</span>
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
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
          </div>
        </div>
      </header>
    </>
  );
}
