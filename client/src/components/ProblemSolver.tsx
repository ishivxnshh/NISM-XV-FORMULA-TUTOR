import { useState, useEffect } from 'react';
import { Formula, GradeResponse } from '../types';
import { EDGE_FUNCTIONS_URL } from '../lib/supabase';
import { Shuffle, Calculator, Lightbulb, Clock } from 'lucide-react';

interface ProblemSolverProps {
  formula: Formula;
  userId: string;
  onGradeComplete: (result: GradeResponse) => void;
  onNewProblem: () => void;
}

const HINTS: Record<number, { title: string; description: string }> = {
  1: {
    title: 'Conceptual Hint',
    description: 'Think about what this formula measures and the relationship between the variables.',
  },
  2: {
    title: 'Step Suggestion',
    description: 'Break down the formula into smaller parts and evaluate each component separately.',
  },
  3: {
    title: 'Numeric Substitution',
    description: 'Substitute each variable with its given value in the formula expression.',
  },
};

export function ProblemSolver({
  formula,
  userId,
  onGradeComplete,
  onNewProblem,
}: ProblemSolverProps) {
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [userAnswer, setUserAnswer] = useState('');
  const [hintsUsed, setHintsUsed] = useState(0);
  const [visibleHints, setVisibleHints] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());

  useEffect(() => {
    initializeInputs();
    setUserAnswer('');
    setHintsUsed(0);
    setVisibleHints([]);
    setStartTime(Date.now());
  }, [formula]);

  const initializeInputs = () => {
    const initialInputs: Record<string, number> = {};
    formula.inputs.forEach((input) => {
      initialInputs[input.name] = 0;
    });
    setInputs(initialInputs);
  };

  const autoGenerateValues = () => {
    const generatedInputs: Record<string, number> = {};
    formula.inputs.forEach((input) => {
      const range = formula.example_ranges[input.name];
      if (range) {
        const randomValue =
          Math.random() * (range.max - range.min) + range.min;
        generatedInputs[input.name] = parseFloat(randomValue.toFixed(2));
      } else {
        generatedInputs[input.name] = Math.random() * 100;
      }
    });
    setInputs(generatedInputs);
  };

  const handleInputChange = (name: string, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const requestHint = () => {
    if (hintsUsed < 3) {
      const nextHint = hintsUsed + 1;
      setHintsUsed(nextHint);
      setVisibleHints((prev) => [...prev, nextHint]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer) return;

    setLoading(true);
    const timeSpentMs = Date.now() - startTime;

    try {
      const response = await fetch(`${EDGE_FUNCTIONS_URL}/grade-attempt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          formulaId: formula.id,
          inputs,
          userAnswer: parseFloat(userAnswer),
          hintsUsed,
          timeSpentMs,
        }),
      });

      const result: GradeResponse = await response.json();
      onGradeComplete(result);
    } catch (error) {
      console.error('Error submitting attempt:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewProblem = () => {
    initializeInputs();
    setUserAnswer('');
    setHintsUsed(0);
    setVisibleHints([]);
    setStartTime(Date.now());
    onNewProblem();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{formula.title}</h2>
            <p className="text-gray-600 mt-2">{formula.explanation}</p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              Difficulty {formula.difficulty}/5
            </span>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">Formula:</p>
          <code className="text-blue-600 font-mono text-sm">
            {formula.expression}
          </code>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Input Values</h3>
            <button
              type="button"
              onClick={autoGenerateValues}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
            >
              <Shuffle className="w-4 h-4" />
              Auto-Generate
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {formula.inputs.map((input) => (
              <div key={input.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {input.label}
                  <span className="text-gray-500 ml-1">({input.unit})</span>
                </label>
                <input
                  type="number"
                  step="any"
                  value={inputs[input.name] || ''}
                  onChange={(e) => handleInputChange(input.name, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Answer
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              placeholder="Enter your calculated result"
              required
            />
            <Calculator className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={requestHint}
              disabled={hintsUsed >= 3}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              <Lightbulb className="w-4 h-4" />
              Request Hint ({3 - hintsUsed} left)
            </button>
            <span className="text-xs text-gray-500">
              -10% per hint
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleNewProblem}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              New Problem
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Grading...' : 'Submit'}
            </button>
          </div>
        </div>
      </form>

      {visibleHints.length > 0 && (
        <div className="px-6 pb-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 text-yellow-800 font-semibold">
              <Lightbulb className="w-5 h-5" />
              Hints
            </div>
            {visibleHints.map((hintNum) => (
              <div key={hintNum} className="pl-7">
                <p className="text-sm font-medium text-yellow-900">
                  {HINTS[hintNum].title}
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  {HINTS[hintNum].description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
