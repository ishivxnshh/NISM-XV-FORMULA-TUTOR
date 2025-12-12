import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface GradeRequest {
  userId: string;
  formulaId: string;
  problemId?: string;
  inputs: Record<string, number>;
  userAnswer: number;
  hintsUsed: number;
  timeSpentMs: number;
}

function evaluateFormula(expression: string, inputs: Record<string, number>): number {
  let expr = expression;
  
  for (const [key, value] of Object.entries(inputs)) {
    const regex = new RegExp(`\\b${key}\\b`, 'g');
    expr = expr.replace(regex, String(value));
  }
  
  try {
    return eval(expr);
  } catch (error) {
    throw new Error(`Failed to evaluate formula: ${error.message}`);
  }
}

function generateStepByStep(
  formula: any,
  inputs: Record<string, number>,
  correctAnswer: number
): Array<{ step: number; description: string; value?: number }> {
  const steps = [];
  
  steps.push({
    step: 1,
    description: `Formula: ${formula.title}`,
  });
  
  steps.push({
    step: 2,
    description: `Expression: ${formula.expression}`,
  });
  
  let substituted = formula.expression;
  for (const [key, value] of Object.entries(inputs)) {
    const regex = new RegExp(`\\b${key}\\b`, 'g');
    substituted = substituted.replace(regex, String(value));
  }
  
  steps.push({
    step: 3,
    description: `Substituting values: ${substituted}`,
  });
  
  steps.push({
    step: 4,
    description: 'Calculating result',
    value: correctAnswer,
  });
  
  steps.push({
    step: 5,
    description: `Final Answer: ${correctAnswer.toFixed(4)}`,
    value: correctAnswer,
  });
  
  return steps;
}

function checkTolerance(
  userAnswer: number,
  correctAnswer: number,
  toleranceType: string,
  toleranceValue: number
): { isCorrect: boolean; percentageError: number } {
  const diff = Math.abs(userAnswer - correctAnswer);
  const percentageError = correctAnswer !== 0 
    ? (diff / Math.abs(correctAnswer)) * 100 
    : 0;
  
  let isCorrect = false;
  
  if (toleranceType === 'absolute') {
    isCorrect = diff <= toleranceValue;
  } else {
    isCorrect = percentageError <= (toleranceValue * 100);
  }
  
  return { isCorrect, percentageError };
}

function calculateScore(
  isCorrect: boolean,
  hintsUsed: number,
  difficulty: number
): { baseScore: number; hintPenalty: number; finalScore: number } {
  const maxScore = 100;
  const baseScore = isCorrect ? maxScore : 0;
  
  const hintPenalties = [0, 0.10, 0.20, 0.30];
  const hintPenalty = hintsUsed >= 0 && hintsUsed <= 3 ? hintPenalties[hintsUsed] : 0;
  
  const difficultyMultiplier = difficulty / 3;
  const finalScore = baseScore * (1 - hintPenalty) * difficultyMultiplier;
  
  return {
    baseScore,
    hintPenalty,
    finalScore,
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const body: GradeRequest = await req.json();
    const { userId, formulaId, problemId, inputs, userAnswer, hintsUsed, timeSpentMs } = body;

    if (!userId || !formulaId || !inputs || userAnswer === undefined) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { data: formula, error: formulaError } = await supabase
      .from('formulas')
      .select('*')
      .eq('id', formulaId)
      .maybeSingle();

    if (formulaError || !formula) {
      return new Response(
        JSON.stringify({ error: 'Formula not found' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const correctAnswer = evaluateFormula(formula.expression, inputs);
    const { isCorrect, percentageError } = checkTolerance(
      userAnswer,
      correctAnswer,
      formula.tolerance_type,
      formula.tolerance_value
    );
    
    const { baseScore, hintPenalty, finalScore } = calculateScore(
      isCorrect,
      hintsUsed,
      formula.difficulty
    );
    
    const stepByStep = generateStepByStep(formula, inputs, correctAnswer);

    const { data: attempt, error: attemptError } = await supabase
      .from('attempts')
      .insert({
        user_id: userId,
        problem_id: problemId || null,
        formula_id: formulaId,
        inputs,
        user_answer: userAnswer,
        correct_answer: correctAnswer,
        is_correct: isCorrect,
        percentage_error: percentageError,
        hints_used: hintsUsed,
        hint_penalty: hintPenalty,
        base_score: baseScore,
        final_score: finalScore,
        time_spent_ms: timeSpentMs,
        step_by_step: stepByStep,
      })
      .select()
      .single();

    if (attemptError) {
      throw attemptError;
    }

    return new Response(
      JSON.stringify({
        attemptId: attempt.id,
        isCorrect,
        userAnswer,
        correctAnswer,
        percentageError,
        baseScore,
        hintPenalty,
        finalScore,
        stepByStep,
        hintsUsed,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});