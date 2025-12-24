import { useState, useEffect } from 'react';
import { Lightbulb, RefreshCw } from 'lucide-react';

interface FactData {
    id: number;
    category: string;
    title: string;
    fact: string;
    source: string;
}

export function RandomFact() {
    const [fact, setFact] = useState<FactData | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchFact = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://f-api.ir/api/facts/random');
            const data = await response.json();
            setFact(data);
        } catch (error) {
            console.error('Error fetching fact:', error);
            // Fallback fact if API fails
            setFact({
                id: 0,
                category: 'Finance',
                title: 'Compound Interest',
                fact: 'Compound interest is the eighth wonder of the world. He who understands it, earns it... he who does not... pays it.',
                source: 'Albert Einstein'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFact();
    }, []);

    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white text-center shadow-lg relative overflow-hidden group">
            {/* Dynamic Background Effect */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

            <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-yellow-300" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-blue-100">
                        Did You Know?
                    </h3>
                </div>

                {loading ? (
                    <div className="h-20 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="fade-in">
                        {fact?.title && (
                            <h4 className="text-xl font-bold mb-2">{fact.title}</h4>
                        )}
                        <p className="text-lg font-medium leading-relaxed mb-4">
                            "{fact?.fact}"
                        </p>
                        {fact?.source && (
                            <p className="text-sm text-blue-100 italic">
                                Source: {fact.source}
                            </p>
                        )}

                        <button
                            onClick={fetchFact}
                            className="mt-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-300"
                            title="Get another fact"
                        >
                            <RefreshCw className="w-5 h-5 text-white/80 hover:text-white" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
