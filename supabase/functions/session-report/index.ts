import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface CategoryPerformance {
  category: string;
  accuracy: number;
  avgScore: number;
  avgTime: number;
  attempts: number;
}

function generateRecommendation(
  score: number,
  confidence: number
): { recommendation: string; rationale: string } {
  if (score >= 75 && confidence >= 70) {
    return {
      recommendation: 'book_exam',
      rationale: 'Your performance indicates strong readiness for the NISM Research Analyst (XV) exam. You demonstrate solid understanding across multiple formula categories with consistent accuracy.',
    };
  } else if ((score >= 50 && score < 75) || (confidence >= 50 && confidence < 70)) {
    return {
      recommendation: 'borderline',
      rationale: 'You show good foundational knowledge, but there are areas that need improvement. Consider additional practice on weak topics before booking your exam.',
    };
  } else {
    return {
      recommendation: 'not_ready',
      rationale: 'Your current performance suggests you need more preparation before attempting the exam. Focus on understanding core concepts and practicing weak areas systematically.',
    };
  }
}

function generateImprovements(
  categoryPerformance: CategoryPerformance[],
  avgHintsUsed: number,
  avgTime: number
): string[] {
  const improvements: string[] = [];
  
  const weakCategories = categoryPerformance
    .filter(c => c.accuracy < 60)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3);
  
  if (weakCategories.length > 0) {
    improvements.push(
      `Focus on these weak categories: ${weakCategories.map(c => c.category).join(', ')}. Review the formulas and practice more problems in these areas.`
    );
  }
  
  if (avgHintsUsed > 1.5) {
    improvements.push(
      'Try to solve problems independently without hints. Overreliance on hints reduces your score and indicates gaps in understanding.'
    );
  }
  
  if (avgTime > 180000) {
    improvements.push(
      'Work on improving your speed. The exam is time-bound, so practice solving problems more quickly while maintaining accuracy.'
    );
  }
  
  const slowCategories = categoryPerformance
    .filter(c => c.avgTime > 200000)
    .sort((a, b) => b.avgTime - a.avgTime)
    .slice(0, 2);
  
  if (slowCategories.length > 0) {
    improvements.push(
      `You're taking more time on ${slowCategories.map(c => c.category).join(' and ')}. Practice these formulas to build fluency.`
    );
  }
  
  if (improvements.length === 0) {
    improvements.push(
      'Maintain consistent practice across all categories.',
      'Review complex formulas like CAPM, WACC, and DCF models regularly.',
      'Take timed practice sessions to simulate exam conditions.'
    );
  }
  
  return improvements.slice(0, 3);
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    const sessionId = url.searchParams.get('sessionId');
    
    if (req.method === 'POST') {
      const body = await req.json();
      const { userId: bodyUserId, attemptIds } = body;
      
      if (!bodyUserId || !attemptIds || attemptIds.length === 0) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      const { data: attempts, error: attemptsError } = await supabase
        .from('attempts')
        .select('*, formulas(*)')
        .in('id', attemptIds)
        .eq('user_id', bodyUserId);
      
      if (attemptsError) throw attemptsError;
      
      const totalAttempts = attempts.length;
      const correctAttempts = attempts.filter(a => a.is_correct).length;
      const aggregatedScore = attempts.reduce((sum, a) => sum + a.final_score, 0) / totalAttempts;
      
      const categoryMap = new Map<string, any[]>();
      attempts.forEach(attempt => {
        const category = attempt.formulas.category;
        if (!categoryMap.has(category)) {
          categoryMap.set(category, []);
        }
        categoryMap.get(category)!.push(attempt);
      });
      
      const categoryPerformance: CategoryPerformance[] = Array.from(categoryMap.entries()).map(
        ([category, catAttempts]) => ({
          category,
          accuracy: (catAttempts.filter(a => a.is_correct).length / catAttempts.length) * 100,
          avgScore: catAttempts.reduce((sum, a) => sum + a.final_score, 0) / catAttempts.length,
          avgTime: catAttempts.reduce((sum, a) => sum + a.time_spent_ms, 0) / catAttempts.length,
          attempts: catAttempts.length,
        })
      );
      
      const weakCategories = categoryPerformance.filter(c => c.accuracy < 60);
      
      const avgHintsUsed = attempts.reduce((sum, a) => sum + a.hints_used, 0) / totalAttempts;
      const avgTime = attempts.reduce((sum, a) => sum + a.time_spent_ms, 0) / totalAttempts;
      
      const confidenceLevel = Math.min(
        100,
        ((correctAttempts / totalAttempts) * 60) + 
        (Math.max(0, 100 - (avgHintsUsed * 15)) * 0.2) + 
        (Math.max(0, 100 - (weakCategories.length * 10)) * 0.2)
      );
      
      const { recommendation, rationale } = generateRecommendation(
        aggregatedScore,
        confidenceLevel
      );
      
      const topImprovements = generateImprovements(
        categoryPerformance,
        avgHintsUsed,
        avgTime
      );
      
      const { data: session, error: sessionError } = await supabase
        .from('sessions')
        .insert({
          user_id: bodyUserId,
          attempt_ids: attemptIds,
          total_attempts: totalAttempts,
          correct_attempts: correctAttempts,
          aggregated_score: aggregatedScore,
          confidence_level: confidenceLevel,
          weak_categories: weakCategories,
          recommendation,
          recommendation_rationale: rationale,
          top_improvements: topImprovements,
        })
        .select()
        .single();
      
      if (sessionError) throw sessionError;
      
      return new Response(
        JSON.stringify({
          sessionId: session.id,
          totalAttempts,
          correctAttempts,
          aggregatedScore: parseFloat(aggregatedScore.toFixed(2)),
          confidenceLevel: parseFloat(confidenceLevel.toFixed(2)),
          recommendation,
          rationale,
          topImprovements,
          categoryPerformance,
          weakCategories,
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    if (req.method === 'GET' && sessionId) {
      const { data: session, error: sessionError } = await supabase
        .from('sessions')
        .select('*')
        .eq('id', sessionId)
        .maybeSingle();
      
      if (sessionError) throw sessionError;
      if (!session) {
        return new Response(
          JSON.stringify({ error: 'Session not found' }),
          {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      return new Response(JSON.stringify(session), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    if (req.method === 'GET' && userId) {
      const { data: sessions, error: sessionsError } = await supabase
        .from('sessions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (sessionsError) throw sessionsError;
      
      return new Response(JSON.stringify({ sessions }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(
      JSON.stringify({ error: 'Invalid request' }),
      {
        status: 400,
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