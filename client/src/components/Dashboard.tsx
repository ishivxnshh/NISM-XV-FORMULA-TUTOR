import { useState } from 'react';
import { CategoryList } from './CategoryList';
import { ProblemSolver } from './ProblemSolver';
import { ResultsPanel } from './ResultsPanel';
import { SessionManager } from './SessionManager';
import { Formula, GradeResponse } from '../types';
import { BookOpen, AlertCircle } from 'lucide-react';

export function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null);
  const [gradeResult, setGradeResult] = useState<GradeResponse | null>(null);
  const [sessionAttempts, setSessionAttempts] = useState<string[]>([]);
  const [showSessionReport, setShowSessionReport] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleFormulaSelect = (formula: Formula) => {
    setSelectedFormula(formula);
    setGradeResult(null);
  };

  const handleGradeComplete = (result: GradeResponse) => {
    setGradeResult(result);
    setSessionAttempts((prev) => [...prev, result.attemptId]);
  };

  const handleNewProblem = () => {
    setGradeResult(null);
  };

  const handleGenerateReport = () => {
    if (sessionAttempts.length < 3) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 5000);
    } else {
      setShowSessionReport(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Top Banner matching PSKA website */}
      <div className="bg-gradient-pska py-3 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
        <p className="text-white text-sm font-medium relative z-10 pulse-subtle">
          Prof. Sheetal Kunder Academy programs are entirely updated as per the latest NISM curriculum (June 2025). 
          We ensure all the updates regarding SEBI compliance & NISM are touched based regularly
        </p>
      </div>

      {/* Main Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-lg sticky top-0 z-50">
        <div className="max-w-full mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Logo - Clickable to main website */}
            <a 
              href="https://www.profsheetalkunderacademy.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <img 
                src="/logo.png" 
                alt="Prof. Sheetal Kunder Academy" 
                className="w-14 h-14"
              />
            </a>
            
            {/* Navigation */}
            <nav className="flex items-center gap-3">
              <button className="px-5 py-2 bg-gradient-to-t from-[rgb(90,103,197)] to-[rgb(0,184,201)] text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all">
                Formula Tutor
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-gray-500">
                Session: {sessionAttempts.length} attempts
              </p>
            </div>
            <button 
              onClick={handleGenerateReport}
              className="px-6 py-2.5 bg-gradient-to-t from-[rgb(90,103,197)] to-[rgb(0,184,201)] text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all"
            >
              Generate Report
            </button>
          </div>
        </div>
      </header>

      {/* Warning Banner */}
      {showWarning && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mx-6 mt-4 rounded-r-lg shadow-sm animate-pulse">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                Insufficient Attempts
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                You need at least 3 attempts to generate a readiness report. Current attempts: {sessionAttempts.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Title Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-full mx-auto px-6 py-8">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-1 w-12 bg-gradient-pska rounded-full"></div>
            <h1 className="text-4xl font-extrabold text-gradient text-center">
              NISM Research Analyst (XV) Formula Tutor
            </h1>
            <div className="h-1 w-12 bg-gradient-pska rounded-full"></div>
          </div>
          <p className="text-gray-600 text-lg text-center">
            Practice, Learn, and Assess Your Readiness | Powered by Prof. Sheetal Kunder Academy
          </p>
        </div>
      </div>

      <div className="max-w-full mx-auto p-6">
        {showSessionReport ? (
          <SessionManager
            userId="anonymous"
            attemptIds={sessionAttempts}
            onClose={() => setShowSessionReport(false)}
          />
        ) : (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <CategoryList
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
                onFormulaSelect={handleFormulaSelect}
              />
            </div>

            <div className="col-span-6">
              {selectedFormula ? (
                <ProblemSolver
                  formula={selectedFormula}
                  userId="anonymous"
                  onGradeComplete={handleGradeComplete}
                  onNewProblem={handleNewProblem}
                />
              ) : (
                <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-xl border-2 border-blue-100 p-12 text-center card-hover fade-in">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-pska rounded-full blur-xl opacity-20 animate-pulse"></div>
                    <BookOpen className="w-20 h-20 text-blue-400 mx-auto mb-6 bounce-soft relative z-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gradient mb-3">
                    Ready to Master NISM Formulas?
                  </h3>
                  <p className="text-gray-600 text-lg mb-4">
                    Choose a category and formula from the left panel to start your journey!
                  </p>
                  <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
                    <span className="px-4 py-2 bg-blue-100 rounded-full font-semibold">50+ Formulas</span>
                    <span className="px-4 py-2 bg-cyan-100 rounded-full font-semibold">Smart Hints</span>
                    <span className="px-4 py-2 bg-purple-100 rounded-full font-semibold">Progress Tracking</span>
                  </div>
                </div>
              )}
            </div>

            <div className="col-span-3">
              <ResultsPanel
                gradeResult={gradeResult}
                sessionAttempts={sessionAttempts}
                onGenerateReport={handleGenerateReport}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
