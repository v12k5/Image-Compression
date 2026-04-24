import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Cpu, Layers, Zap, Info, Activity } from 'lucide-react';
import { AppTab } from '../types';

interface HomeViewProps {
  onNavigate: (tab: AppTab) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 py-8 animate-in fade-in duration-700">
      <section className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 text-[10px] font-bold rounded-full border border-indigo-100 dark:border-indigo-900/50 uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
            <span>NeuroCompress Research Node</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight mb-6"
          >
            SNN-Based <br />
            <span className="text-indigo-600 dark:text-indigo-400">Image Intelligence</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-xl font-medium"
          >
            A high-fidelity compression platform utilizing 3rd Generation Spiking Neural Networks for extreme efficiency and biological visual plausibility.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <button 
              onClick={() => onNavigate('compress')}
              className="px-8 py-3.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center shadow-lg shadow-indigo-100 dark:shadow-none uppercase text-xs tracking-widest"
            >
              Start Encoding
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
            <button 
              onClick={() => onNavigate('research')}
              className="px-8 py-3.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all uppercase text-xs tracking-widest"
            >
              System Specs
            </button>
          </motion.div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-3xl opacity-50" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 flex flex-col justify-between h-44 border border-slate-100 dark:border-slate-700">
                <Cpu className="text-slate-300 dark:text-slate-600 w-8 h-8" />
                <div>
                  <span className="technical-label !text-slate-400 block mb-1">Architecture</span>
                  <span className="text-lg font-bold text-slate-800 dark:text-slate-200 font-mono tracking-tight">LIF-v3.0</span>
                </div>
              </div>
              <div className="bg-indigo-600 rounded-2xl p-6 flex flex-col justify-between h-44 text-white shadow-lg shadow-indigo-100 dark:shadow-none">
                <Layers className="text-indigo-300 w-8 h-8" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-200 block mb-1 tracking-widest">Target Ratio</span>
                  <span className="text-lg font-bold font-mono">14.2x (Avg)</span>
                </div>
              </div>
              <div className="col-span-2 bg-slate-900 dark:bg-slate-950 rounded-2xl p-6 flex items-center justify-between border border-slate-800 dark:border-slate-700">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-slate-800 rounded-lg">
                    <Activity className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5 tracking-widest">Fidelity Status</span>
                    <p className="text-slate-300 text-sm font-medium">99.2% Reconstruction Accuracy</p>
                  </div>
                </div>
                <Info className="text-slate-700 dark:text-slate-500 w-6 h-6" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-slate-200 dark:border-slate-800 pt-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Key Technological Pillars</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Temporal Encoding",
              desc: "Mapping pixel intensity to asynchronous spike timing for efficient neuromorphic computation.",
              icon: <Zap className="w-5 h-5" />
            },
            {
              title: "SNN Resilience",
              desc: "Inherently robust against channel noise compared to traditional quantized codecs.",
              icon: <Info className="w-5 h-5 text-emerald-500" />
            },
            {
              title: "High Synthesis Fidelity",
              desc: "Structural integrity maintained even at extreme bit-rate sub-threshold regimes.",
              icon: <Activity className="w-5 h-5 text-indigo-500" />
            }
          ].map((feature, i) => (
            <div key={i} className="group p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-200 dark:hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-50/50 dark:hover:shadow-none transition-all duration-300">
              <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/40 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 mb-6 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-xs font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
