import { Trophy } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-gray-900 dark:bg-black text-white py-8 mt-auto w-full z-10 relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-cyan-900/30 p-2 rounded-lg">
                            <Trophy className="w-8 h-8 text-cyan-400" />
                        </div>
                        <div>
                            <p className="font-bold text-lg">Prof. Sheetal Kunder Academy</p>
                            <p className="text-sm text-gray-400">Excellence in NISM Education</p>
                        </div>
                    </div>
                    <div className="text-center md:text-right">
                        <p className="text-gray-300">All Rights Reserved - Prof. Sheetal Kunder Academy 2026</p>
                        <p className="text-sm text-gray-400 mt-1">Making NISM Certification Easier</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
