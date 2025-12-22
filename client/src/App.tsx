import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { Quiz } from './components/Quiz';
import { Homepage } from './components/Homepage';
import { Navbar } from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/formulas" element={
              <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
                <Navbar />
                <main role="main" className="fade-in">
                  <Dashboard />
                </main>
              </div>
            } />
            <Route path="/quiz" element={
              <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
                <Navbar />
                <main role="main" className="fade-in">
                  <Quiz />
                </main>
              </div>
            } />
            <Route path="/login" element={<Navigate to="/formulas" replace />} />
            <Route path="/signup" element={<Navigate to="/formulas" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
