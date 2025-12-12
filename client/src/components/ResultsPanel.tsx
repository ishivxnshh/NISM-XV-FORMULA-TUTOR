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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Session Progress
        </h3>
        <div className="text-center py-8">
          <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">
            Submit answers to see results and step-by-step solutions
          </p>
        </div>

        {sessionAttempts.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">
                Current Session: {sessionAttempts.length} attempt
                {sessionAttempts.length !== 1 ? 's' : ''}
              </p>
              <button
                onClick={onGenerateReport}
                disabled={sessionAttempts.length < 3}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-t from-[rgb(90,103,197)] to-[rgb(0,184,201)] text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium shadow-md"
              >
                <FileText className="w-4 h-4" />
                Generate Readiness Report
              </button>
              {sessionAttempts.length < 3 && (
                <p className="text-xs text-gray-500 mt-2">
                  Complete at least 3 attempts to generate report
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Result</h3>
          {isCorrect ? (
            <CheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <XCircle className="w-6 h-6 text-red-600" />
          )}
        </div>

        <div className={`p-4 rounded-lg mb-4 ${
          isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <p className={`font-semibold ${isCorrect ? 'text-green-900' : 'text-red-900'}`}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </p>
          {userAnswer !== undefined && (
            <p className={`text-sm mt-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              Your answer: {userAnswer.toFixed(4)}
            </p>
          )}
          {!isCorrect && correctAnswer !== undefined && (
            <p className="text-sm text-red-700 mt-1">
              Correct answer: {correctAnswer.toFixed(4)}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Score</span>
            <span className="text-lg font-bold text-gray-900">
              {finalScore !== undefined ? finalScore.toFixed(1) : '0.0'}/100
            </span>
          </div>

          {hintsUsed > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Hints Used</span>
              <span className="text-sm text-yellow-700 font-medium">
                {hintsUsed} (-{hintsUsed * 10}% penalty)
              </span>
            </div>
          )}

          {percentageError !== undefined && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Error</span>
              <span className="text-sm font-medium text-gray-900">
                {percentageError.toFixed(2)}%
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Step-by-Step Solution
        </h3>
        <div className="space-y-4">
          {stepByStep.map((step) => (
            <div key={step.step} className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-t from-[rgb(90,103,197)] to-[rgb(0,184,201)] text-white rounded-full flex items-center justify-center text-xs font-bold">
                {step.step}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">{step.description}</p>
                {step.value !== undefined && (
                  <p className="text-sm font-mono text-[rgb(0,184,201)] mt-1">
                    = {step.value.toFixed(4)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-3">
            Session: {sessionAttempts.length} attempt{sessionAttempts.length !== 1 ? 's' : ''}
          </p>
          <button
            onClick={onGenerateReport}
            disabled={sessionAttempts.length < 3}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            <FileText className="w-4 h-4" />
            Generate Readiness Report
          </button>
          {sessionAttempts.length < 3 && (
            <p className="text-xs text-gray-500 mt-2">
              Complete at least 3 attempts
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
