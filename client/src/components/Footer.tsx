

export function Footer() {
    return (
        <footer className="bg-gray-900 dark:bg-black text-white py-8 mt-auto w-full z-10 relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/10 p-2 rounded-lg">
                            <img src="/logo.webp" alt="Logo" className="w-10 h-10 object-contain" />
                        </div>
                        <div>
                            <p className="font-bold text-lg">Prof. Sheetal Kunder Academy</p>
                            <p className="text-sm text-gray-400">India's Most Valuable NISM Mentorship</p>
                        </div>
                    </div>
                    <div className="text-center md:text-right">
                        <p className="text-gray-300">All Rights Reserved - Prof. Sheetal Kunder Academy 2026</p>
                        <p className="text-sm text-gray-400 mt-2 font-medium">
                            Powered by <a href="https://shivanshmittal.tech" target="_blank" rel="noopener noreferrer" className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-bold hover:from-cyan-300 hover:to-blue-300 transition-all ml-1">shivanshmittal.tech</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
