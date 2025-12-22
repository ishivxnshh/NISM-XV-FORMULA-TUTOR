import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Brain, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isFormulas = location.pathname === '/' || location.pathname === '/formulas';
  const isQuiz = location.pathname === '/quiz';

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-pska py-3 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
        <p className="text-white text-sm font-medium relative z-10 pulse-subtle">
          Prof. Sheetal Kunder Academy programs are entirely updated as per the latest NISM curriculum (June 2025). 
          We ensure all the updates regarding SEBI compliance & NISM are touched based regularly
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
              className="flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <img 
                src="/logo.png" 
                alt="Prof. Sheetal Kunder Academy" 
                className="w-10 h-10 sm:w-14 sm:h-14"
              />
            </a>
            
            {/* Navigation */}
            <nav className="flex items-center gap-2 sm:gap-3">
              <button 
                onClick={() => navigate('/formulas')}
                className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 ${
                  isFormulas 
                    ? 'bg-gradient-pska text-white' 
                    : 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Formula Tutor</span>
                <span className="sm:hidden">Formulas</span>
              </button>
              <button 
                onClick={() => navigate('/quiz')}
                className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 ${
                  isQuiz 
                    ? 'bg-gradient-pska text-white' 
                    : 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400'
                }`}
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
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all theme-toggle"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
