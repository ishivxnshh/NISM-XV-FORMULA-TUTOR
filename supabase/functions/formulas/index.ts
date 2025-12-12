import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

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
    const path = url.pathname;

    // GET /formulas/categories - List all unique categories
    if (path.includes('/categories')) {
      const { data, error } = await supabase
        .from('formulas')
        .select('category')
        .order('category');

      if (error) throw error;

      const uniqueCategories = [...new Set(data.map((f: any) => f.category))];
      const categoriesWithCount = await Promise.all(
        uniqueCategories.map(async (category) => {
          const { count } = await supabase
            .from('formulas')
            .select('*', { count: 'exact', head: true })
            .eq('category', category);
          
          return { category, count: count || 0 };
        })
      );

      return new Response(JSON.stringify({ categories: categoriesWithCount }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // GET /formulas/:id - Get specific formula
    const idMatch = path.match(/\/formulas\/([a-f0-9-]+)$/);
    if (idMatch) {
      const formulaId = idMatch[1];
      const { data, error } = await supabase
        .from('formulas')
        .select('*')
        .eq('id', formulaId)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        return new Response(JSON.stringify({ error: 'Formula not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // GET /formulas?category=... - List formulas, optionally filtered by category
    const category = url.searchParams.get('category');
    let query = supabase
      .from('formulas')
      .select('*')
      .order('category')
      .order('difficulty')
      .order('title');

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;

    return new Response(JSON.stringify({ formulas: data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
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