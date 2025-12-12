import { useState, useEffect } from 'react';
import { Formula, CategoryInfo } from '../types';
import { EDGE_FUNCTIONS_URL } from '../lib/supabase';
import { ChevronRight, Folder } from 'lucide-react';

interface CategoryListProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string) => void;
  onFormulaSelect: (formula: Formula) => void;
}

export function CategoryList({
  selectedCategory,
  onCategorySelect,
  onFormulaSelect,
}: CategoryListProps) {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [formulas, setFormulas] = useState<Formula[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchFormulas(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${EDGE_FUNCTIONS_URL}/formulas/categories`);
      const data = await response.json();
      setCategories(data.categories);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  const fetchFormulas = async (category: string) => {
    try {
      const response = await fetch(
        `${EDGE_FUNCTIONS_URL}/formulas?category=${encodeURIComponent(category)}`
      );
      const data = await response.json();
      setFormulas(data.formulas);
    } catch (error) {
      console.error('Error fetching formulas:', error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p className="text-gray-500">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Formula Categories</h2>
        <p className="text-sm text-gray-600 mt-1">
          {categories.length} categories available
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {categories.map((cat) => (
          <div key={cat.category}>
            <button
              onClick={() =>
                onCategorySelect(
                  selectedCategory === cat.category ? '' : cat.category
                )
              }
              className={`w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                selectedCategory === cat.category ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <Folder
                  className={`w-5 h-5 ${
                    selectedCategory === cat.category
                      ? 'text-blue-600'
                      : 'text-gray-400'
                  }`}
                />
                <span
                  className={`font-medium ${
                    selectedCategory === cat.category
                      ? 'text-blue-900'
                      : 'text-gray-700'
                  }`}
                >
                  {cat.category}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {cat.count}
                </span>
                <ChevronRight
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    selectedCategory === cat.category ? 'rotate-90' : ''
                  }`}
                />
              </div>
            </button>

            {selectedCategory === cat.category && (
              <div className="bg-gray-50 divide-y divide-gray-100">
                {formulas.map((formula) => (
                  <button
                    key={formula.id}
                    onClick={() => onFormulaSelect(formula)}
                    className="w-full px-6 py-3 text-left hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">
                          {formula.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Difficulty: {formula.difficulty}/5
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
