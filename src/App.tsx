import React, { useState } from 'react';
import { HomeView } from './components/HomeView';
import { CompressionWorkspace } from './components/CompressionWorkspace';
import { ReconstructionWorkspace } from './components/ReconstructionWorkspace';
import { ResearchSection } from './components/ResearchSection';
import { AppTab } from './types';
import { 
  Home, 
  Activity, 
  RefreshCcw, 
  BookOpen, 
  Cpu,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const navItems: { id: AppTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <Home className="w-4 h-4" /> },
    { id: 'compress', label: 'Encoder', icon: <Activity className="w-4 h-4" /> },
    { id: 'reconstruct', label: 'Decoder', icon: <RefreshCcw className="w-4 h-4" /> },
    { id: 'research', label: 'Research', icon: <BookOpen className="w-4 h-4" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <HomeView onNavigate={setActiveTab} />;
      case 'compress': return <CompressionWorkspace />;
      case 'reconstruct': return <ReconstructionWorkspace />;
      case 'research': return <ResearchSection />;
      default: return <HomeView onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans transition-colors duration-300 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center space-x-3 cursor-pointer shrink-0" 
              onClick={() => setActiveTab('overview')}
            >
              <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100 uppercase leading-none">NeuroCompress v3.0</h1>
                <p className="text-[10px] text-slate-500 font-medium leading-none mt-1">3rd Gen SNN Research Platform</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all duration-200 ${
                    activeTab === item.id 
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    {activeTab === item.id && item.icon}
                    <span>{item.label}</span>
                  </span>
                </button>
              ))}
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <span className="flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-100 dark:border-emerald-900/50 uppercase tracking-tight">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> 
                Mock Service Active
              </span>
            </div>

            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-500 hover:text-slate-900"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      activeTab === item.id 
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' 
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 py-12 mt-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 bg-slate-900 dark:bg-slate-200 rounded flex items-center justify-center text-white dark:text-slate-900">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-slate-100">SNN-Compressor</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
                A third-generation neural network showcase focused on efficient image compression and biological plausibility in visual computing.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><button onClick={() => setActiveTab('research')} className="hover:text-indigo-600 dark:hover:text-indigo-400">SNN Whitepaper</button></li>
                <li><button onClick={() => setActiveTab('research')} className="hover:text-indigo-600 dark:hover:text-indigo-400">Benchmark Data</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><span className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer">Research Licensing</span></li>
                <li><span className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer">Data Policy</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-50 dark:border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 font-medium">
            <p>© 2026 SNN Neural Research platform. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="https://github.com/v12k5" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 dark:hover:text-slate-200">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
