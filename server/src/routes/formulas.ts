import { Router } from 'express';
import { supabase } from '../index.js';

const router = Router();

// GET /api/formulas/categories - List all unique categories
router.get('/categories', async (req, res) => {
  try {
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

    res.json({ categories: categoriesWithCount });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/formulas/:id - Get specific formula
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('formulas')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Formula not found' });
    }

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/formulas?category=... - List formulas, optionally filtered by category
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
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

    res.json({ formulas: data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
