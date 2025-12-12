import { useState, useEffect } from 'react';
import { SessionReport } from '../types';
import { API_URL } from '../lib/api';
import {
  X,
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Target,
  Award,
  BookOpen,
} from 'lucide-react';

interface SessionManagerProps {
  userId: string;
  attemptIds: string[];
  onClose: () => void;
}

export function SessionManager({
  userId,
  attemptIds,
  onClose,
}: SessionManagerProps) {
  const [report, setReport] = useState<SessionReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateReport();
  }, []);

  const generateReport = async () => {
    try {
      const response = await fetch(`${API_URL}/session-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          attemptIds,
        }),
      });

      const data: SessionReport = await response.json();
      setReport(data);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'book_exam':
        return <CheckCircle className="w-8 h-8 text-green-600" />;
      case 'borderline':
        return <AlertTriangle className="w-8 h-8 text-yellow-600" />;
      case 'not_ready':
        return <XCircle className="w-8 h-8 text-red-600" />;
      default:
        return <BookOpen className="w-8 h-8 text-gray-600" />;
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'book_exam':
        return 'bg-green-50 border-green-200 text-green-900';
      case 'borderline':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      case 'not_ready':
        return 'bg-red-50 border-red-200 text-red-900';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-900';
    }
  };

  const getRecommendationTitle = (recommendation: string) => {
    switch (recommendation) {
      case 'book_exam':
        return 'Ready to Book Exam';
      case 'borderline':
        return 'Borderline - More Practice Recommended';
      case 'not_ready':
        return 'Not Ready - Focus on Weak Areas';
      default:
        return 'Assessment Complete';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating your readiness report...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
        <p className="text-red-600 text-center">Failed to generate report</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            NISM Readiness Assessment Report
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-8">
          <div className={`border rounded-xl p-6 mb-8 ${getRecommendationColor(report.recommendation)}`}>
            <div className="flex items-start gap-4">
              {getRecommendationIcon(report.recommendation)}
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">
                  {getRecommendationTitle(report.recommendation)}
                </h3>
                <p className="text-sm opacity-90">{report.rationale}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Target className="w-5 h-5" />
                <span className="text-xs font-medium">Attempts</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">
                {report.totalAttempts}
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <CheckCircle className="w-5 h-5" />
                <span className="text-xs font-medium">Correct</span>
              </div>
              <p className="text-2xl font-bold text-green-900">
                {report.correctAttempts}
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <Award className="w-5 h-5" />
                <span className="text-xs font-medium">Score</span>
              </div>
              <p className="text-2xl font-bold text-purple-900">
                {report.aggregatedScore.toFixed(1)}
              </p>
            </div>

            <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
              <div className="flex items-center gap-2 text-orange-600 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-xs font-medium">Confidence</span>
              </div>
              <p className="text-2xl font-bold text-orange-900">
                {report.confidenceLevel.toFixed(1)}%
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Top 3 Improvements
            </h3>
            <div className="space-y-3">
              {report.improvements.map((improvement, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-sm text-blue-900">{improvement}</p>
                </div>
              ))}
            </div>
          </div>

          {report.categoryPerformance.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Performance by Category
              </h3>
              <div className="space-y-3">
                {report.categoryPerformance.map((cat) => (
                  <div
                    key={cat.category}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">
                        {cat.category}
                      </h4>
                      <span className="text-sm text-gray-600">
                        {cat.attempts} attempt{cat.attempts !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Accuracy:</span>
                        <span className={`ml-2 font-semibold ${
                          cat.accuracy >= 70
                            ? 'text-green-600'
                            : cat.accuracy >= 50
                            ? 'text-yellow-600'
                            : 'text-red-600'
                        }`}>
                          {cat.accuracy.toFixed(1)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Avg Score:</span>
                        <span className="ml-2 font-semibold text-gray-900">
                          {cat.avgScore.toFixed(1)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Avg Time:</span>
                        <span className="ml-2 font-semibold text-gray-900">
                          {(cat.avgTime / 1000).toFixed(1)}s
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
