import { useState, useEffect } from 'react';
import { Formula, CategoryInfo } from '../types';
import { API_URL } from '../lib/api';
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
      const response = await fetch(`${API_URL}/formulas/categories`);
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
        `${API_URL}/formulas?category=${encodeURIComponent(category)}`
      );
      const data = await response.json();
      setFormulas(data.formulas);
    } catch (error) {
      console.error('Error fetching formulas:', error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
        <p className="text-gray-500 dark:text-gray-400">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-blue-100 dark:border-gray-700 overflow-hidden fade-in slide-in-left transition-colors duration-300">
      <div className="p-4 sm:p-5 bg-gradient-pska">
        <h2 className="text-lg sm:text-xl font-bold text-white">Formula Categories</h2>
        <p className="text-white/90 text-xs sm:text-sm mt-2">
          <span className="bg-white/20 px-2 py-0.5 rounded-full font-semibold">{categories.length}</span> categories available
        </p>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-[500px] sm:max-h-[600px] overflow-y-auto">
        {categories.map((cat) => (
          <div key={cat.category}>
            <button
              onClick={() =>
                onCategorySelect(
                  selectedCategory === cat.category ? '' : cat.category
                )
              }
              className={`w-full px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between transition-all duration-300 group ${
                selectedCategory === cat.category 
                  ? 'bg-gradient-pska text-white shadow-lg glow-effect transform scale-[1.02]' 
                  : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3">
                <Folder
                  className={`w-5 h-5 ${
                    selectedCategory === cat.category
                      ? 'text-white'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                />
                <span
                  className={`font-medium ${
                    selectedCategory === cat.category
                      ? 'text-white'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {cat.category}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedCategory === cat.category
                    ? 'text-white bg-white/20'
                    : 'text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700'
                }`}>
                  {cat.count}
                </span>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    selectedCategory === cat.category 
                      ? 'rotate-90 text-white' 
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                />
              </div>
            </button>

            {selectedCategory === cat.category && (
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 divide-y divide-white/50 dark:divide-gray-500/50 p-3 slide-in-right transition-colors duration-300">
                {formulas.map((formula) => (
                  <button
                    key={formula.id}
                    onClick={() => onFormulaSelect(formula)}
                    className="w-full px-4 py-3 text-left bg-white dark:bg-gray-800 rounded-xl hover:bg-gradient-to-r hover:from-white hover:to-blue-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all border-2 border-transparent hover:border-blue-200 dark:hover:border-cyan-500 hover:shadow-lg card-hover mb-2 last:mb-0"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm group-hover:text-blue-600 dark:group-hover:text-cyan-400">
                            {formula.title}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {formula.difficulty === 1 && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Easy</span>
                          )}
                          {formula.difficulty === 2 && (
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-semibold">Medium</span>
                          )}
                          {formula.difficulty === 3 && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">Hard</span>
                          )}
                        </div>
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
