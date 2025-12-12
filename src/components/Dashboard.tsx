import { useState } from 'react';
import { CategoryList } from './CategoryList';
import { ProblemSolver } from './ProblemSolver';
import { ResultsPanel } from './ResultsPanel';
import { SessionManager } from './SessionManager';
import { Formula, GradeResponse } from '../types';
import { BookOpen } from 'lucide-react';

export function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null);
  const [gradeResult, setGradeResult] = useState<GradeResponse | null>(null);
  const [sessionAttempts, setSessionAttempts] = useState<string[]>([]);
  const [showSessionReport, setShowSessionReport] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-full mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                NISM Research Analyst (XV) Formula Tutor
              </h1>
              <p className="text-sm text-gray-600">
                Practice, Learn, and Assess Your Readiness
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-gray-500">
                Session: {sessionAttempts.length} attempts
              </p>
            </div>
          </div>
        </div>
      </header>

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
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Select a Formula to Begin
                  </h3>
                  <p className="text-gray-600">
                    Choose a category and formula from the left panel to start practicing
                  </p>
                </div>
              )}
            </div>

            <div className="col-span-3">
              <ResultsPanel
                gradeResult={gradeResult}
                sessionAttempts={sessionAttempts}
                onGenerateReport={() => setShowSessionReport(true)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
