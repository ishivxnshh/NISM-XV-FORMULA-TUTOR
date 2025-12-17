import { useState, useEffect } from 'react';
import { Formula, GradeResponse } from '../types';
import { API_URL } from '../lib/api';
import { Shuffle, Calculator, Lightbulb } from 'lucide-react';

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
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcDisplay, setCalcDisplay] = useState('0');

  useEffect(() => {
    initializeInputs();
    setUserAnswer('');
    setHintsUsed(0);
    setVisibleHints([]);
    setStartTime(Date.now());
    setShowCalculator(false);
    setCalcDisplay('0');
  }, [formula]);

  const initializeInputs = () => {
    const initialInputs: Record<string, number> = {};
    Object.keys(formula.variables).forEach((varName) => {
      initialInputs[varName] = 0;
    });
    setInputs(initialInputs);
  };

  const autoGenerateValues = () => {
    const generatedInputs: Record<string, number> = {};
    Object.entries(formula.variables).forEach(([varName, varDef]) => {
      const randomValue =
        Math.random() * (varDef.max - varDef.min) + varDef.min;
      generatedInputs[varName] = parseFloat(randomValue.toFixed(2));
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
      const response = await fetch(`${API_URL}/grade-attempt`, {
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
    setShowCalculator(false);
    setCalcDisplay('0');
    onNewProblem();
  };

  const handleCalcButton = (value: string) => {
    if (value === 'C') {
      setCalcDisplay('0');
    } else if (value === '=') {
      try {
        const result = eval(calcDisplay.replace(/×/g, '*').replace(/÷/g, '/'));
        setCalcDisplay(String(result));
      } catch {
        setCalcDisplay('Error');
      }
    } else if (value === '←') {
      setCalcDisplay(calcDisplay.length > 1 ? calcDisplay.slice(0, -1) : '0');
    } else if (value === 'Use') {
      setUserAnswer(calcDisplay);
      setShowCalculator(false);
    } else {
      setCalcDisplay(calcDisplay === '0' && value !== '.' ? value : calcDisplay + value);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-blue-100 overflow-hidden fade-in">
      <div className="p-6 bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 border-b-2 border-blue-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gradient mb-2">{formula.title}</h2>
            <p className="text-gray-700">{formula.description}</p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            {formula.difficulty === 1 && (
              <span className="text-xs bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold border-2 border-green-200">
                Easy
              </span>
            )}
            {formula.difficulty === 2 && (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-bold border-2 border-yellow-200">
                Medium
              </span>
            )}
            {formula.difficulty === 3 && (
              <span className="text-xs bg-red-100 text-red-700 px-4 py-2 rounded-full font-bold border-2 border-red-200">
                Hard
              </span>
            )}
          </div>
        </div>

        <div className="mt-5 p-5 bg-white rounded-xl border-2 border-blue-200 shadow-md">
          <p className="text-sm font-bold text-blue-600 mb-2">Formula:</p>
          <code className="text-blue-700 font-mono text-base font-bold bg-blue-50 px-3 py-2 rounded-lg block">
            {formula.expression}
          </code>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Input Values</h3>
            <button
              type="button"
              onClick={autoGenerateValues}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-pska text-white rounded-xl hover:shadow-lg glow-effect transition-all text-sm font-bold transform hover:scale-105"
            >
              <Shuffle className="w-4 h-4" />
              Auto-Generate
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {Object.entries(formula.variables).map(([varName, varDef]) => (
              <div key={varName} className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {varDef.label}
                  <span className="text-gray-500 text-xs font-normal bg-gray-100 px-2 py-0.5 rounded-full ml-2">({varDef.unit})</span>
                </label>
                <input
                  type="number"
                  step="any"
                  value={inputs[varName] || ''}
                  onChange={(e) => handleInputChange(varName, e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all font-semibold text-gray-800 group-hover:border-blue-300"
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
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent text-lg"
              placeholder="Enter your calculated result"
              required
            />
            <button
              type="button"
              onClick={() => setShowCalculator(!showCalculator)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent-600 transition-colors"
            >
              <Calculator className="w-5 h-5" />
            </button>
          </div>

          {showCalculator && (
            <div className="mt-4 p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
              <div className="mb-3 p-3 bg-gray-100 rounded text-right font-mono text-xl">
                {calcDisplay}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
                  <button
                    key={btn}
                    type="button"
                    onClick={() => handleCalcButton(btn)}
                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded font-semibold text-gray-700 transition-colors"
                  >
                    {btn}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => handleCalcButton('C')}
                  className="col-span-2 px-4 py-3 bg-red-100 hover:bg-red-200 rounded font-semibold text-red-700 transition-colors"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => handleCalcButton('←')}
                  className="px-4 py-3 bg-yellow-100 hover:bg-yellow-200 rounded font-semibold text-yellow-700 transition-colors"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => handleCalcButton('Use')}
                  className="px-4 py-3 bg-green-100 hover:bg-green-200 rounded font-semibold text-green-700 transition-colors"
                >
                  Use
                </button>
              </div>
            </div>
          )}
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
              className="px-8 py-2.5 bg-gradient-to-t from-[rgb(90,103,197)] to-[rgb(0,184,201)] text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md"
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
