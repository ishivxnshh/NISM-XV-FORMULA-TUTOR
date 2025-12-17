import { GradeResponse } from '../types';
import { CheckCircle, XCircle, TrendingUp, FileText } from 'lucide-react';

interface ResultsPanelProps {
  gradeResult: GradeResponse | null;
  sessionAttempts: string[];
  onGenerateReport: () => void;
}

export function ResultsPanel({
  gradeResult,
  sessionAttempts,
  onGenerateReport,
}: ResultsPanelProps) {
  if (!gradeResult) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-blue-100 dark:border-gray-700 p-6 fade-in transition-colors duration-300">
        <h3 className="text-lg font-bold text-gradient mb-4">Session Progress</h3>
        <div className="text-center py-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 rounded-xl border-2 border-blue-100 dark:border-gray-600 transition-colors duration-300">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-gradient-pska rounded-full blur-lg opacity-20 animate-pulse"></div>
            <TrendingUp className="w-16 h-16 text-blue-400 dark:text-cyan-400 mx-auto bounce-soft relative z-10" />
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm font-medium px-4">
            Submit answers to see results and step-by-step solutions
          </p>
        </div>

        {sessionAttempts.length > 0 && (
          <div className="mt-6 pt-6 border-t-2 border-blue-100 dark:border-gray-700">
            <div className="text-center">
              <div className="bg-gradient-pska text-white rounded-xl p-4 mb-4">
                <p className="text-3xl font-bold">{sessionAttempts.length}</p>
                <p className="text-sm opacity-90">
                  Attempt{sessionAttempts.length !== 1 ? 's' : ''} Completed
                </p>
              </div>
              <button
                onClick={onGenerateReport}
                disabled={sessionAttempts.length < 3}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-pska text-white rounded-xl hover:shadow-lg glow-effect transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-bold transform hover:scale-105"
              >
                <FileText className="w-5 h-5" />
                Generate Readiness Report
              </button>
              {sessionAttempts.length < 3 && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-2 font-medium transition-colors duration-300">
                  Complete at least {3 - sessionAttempts.length} more attempt{3 - sessionAttempts.length !== 1 ? 's' : ''} to generate report
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  const { isCorrect, userAnswer, correctAnswer, percentageError, finalScore, stepByStep, hintsUsed } = gradeResult;

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Result</h3>
          {isCorrect ? (
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          ) : (
            <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
          )}
        </div>

        <div className={`p-4 rounded-lg mb-4 ${
          isCorrect 
            ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700' 
            : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
        }`}>
          <p className={`font-semibold ${
            isCorrect 
              ? 'text-green-900 dark:text-green-300' 
              : 'text-red-900 dark:text-red-300'
          }`}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </p>
          {userAnswer !== undefined && (
            <p className={`text-sm mt-1 ${
              isCorrect 
                ? 'text-green-700 dark:text-green-400' 
                : 'text-red-700 dark:text-red-400'
            }`}>
              Your answer: {userAnswer.toFixed(4)}
            </p>
          )}
          {!isCorrect && correctAnswer !== undefined && (
            <p className="text-sm text-red-700 dark:text-red-400 mt-1">
              Correct answer: {correctAnswer.toFixed(4)}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Score</span>
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {finalScore !== undefined ? finalScore.toFixed(1) : '0.0'}/100
            </span>
          </div>

          {hintsUsed > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Hints Used</span>
              <span className="text-sm text-yellow-700 dark:text-yellow-400 font-medium">
                {hintsUsed} (-{hintsUsed * 10}% penalty)
              </span>
            </div>
          )}

          {percentageError !== undefined && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Error</span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {percentageError.toFixed(2)}%
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Step-by-Step Solution
        </h3>
        <div className="space-y-4">
          {stepByStep.map((step) => (
            <div key={step.step} className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-t from-[rgb(90,103,197)] to-[rgb(0,184,201)] text-white rounded-full flex items-center justify-center text-xs font-bold">
                {step.step}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 dark:text-gray-300">{step.description}</p>
                {step.value !== undefined && (
                  <p className="text-sm font-mono text-[rgb(0,184,201)] dark:text-cyan-400 mt-1">
                    = {step.value.toFixed(4)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Session: {sessionAttempts.length} attempt{sessionAttempts.length !== 1 ? 's' : ''}
          </p>
          <button
            onClick={onGenerateReport}
            disabled={sessionAttempts.length < 3}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            <FileText className="w-4 h-4" />
            Generate Readiness Report
          </button>
          {sessionAttempts.length < 3 && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Complete at least 3 attempts
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
