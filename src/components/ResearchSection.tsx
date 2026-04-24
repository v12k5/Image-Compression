import React from 'react';
import { motion } from 'motion/react';
import { Layers, Zap, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';
import { RESEARCH_CONTENT } from '../constants';

export const ResearchSection: React.FC = () => {
  const cards = [
    {
      title: "Bio-Inspired Processing",
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      content: "Utilizes Leaky Integrate-and-Fire (LIF) neurons to process information as asynchronous temporal spikes, drastically reducing metabolic energy consumption."
    },
    {
      title: "Efficient bitstream Encoding",
      icon: <Layers className="w-6 h-6 text-blue-500" />,
      content: "Achieves high compression ratios by mapping visual features into sparse spiking patterns, preserving essential structural information in a compact bit-array."
    },
    {
      title: "Third-Generation AI",
      icon: <Cpu className="w-6 h-6 text-emerald-500" />,
      content: "Positioned beyond classical ANNs. Our model integrates temporal dynamics, allowing for superior reconstruction fidelity in highly compressed regimes."
    }
  ];

  return (
    <div id="research-section" className="space-y-12">
      <section className="max-w-3xl">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 font-sans tracking-tight">
          Research Foundations
        </h2>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-4 border-slate-200 dark:border-slate-800 pl-6 mb-8">
            "{RESEARCH_CONTENT.problemStatement}"
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {cards.map((card, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-100 dark:hover:border-indigo-500 transition-colors"
              >
                <div className="mb-4">{card.icon}</div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wide">{card.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{card.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 text-white rounded-xl p-8 md:p-12 overflow-hidden relative border border-slate-800">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-widest">{RESEARCH_CONTENT.generationTitle}</h3>
            <p className="text-slate-400 mb-6 leading-relaxed text-sm font-medium">
              {RESEARCH_CONTENT.generationDescription}
            </p>
            <ul className="space-y-3">
              {[
                "Asynchronous Event-Driven Computation",
                "High Temporal Resolution Data Encoding",
                "Robust Sparse Representation",
                "Scalable Neuromorphic Architecture"
              ].map((item, i) => (
                <li key={i} className="flex items-center text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 mr-3 text-indigo-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h4 className="text-indigo-300 text-[10px] font-bold mb-4 uppercase tracking-[0.2em]">Model Pipeline Architecture</h4>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                  <span className="text-[10px] font-bold font-mono">IMG</span>
                </div>
                <ArrowRight className="mx-3 w-4 h-4 text-slate-700" />
                <div className="flex-1 p-3 rounded bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  SNN Encoder (LIF)
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                  <span className="text-[10px] font-bold font-mono">BIT</span>
                </div>
                <ArrowRight className="mx-3 w-4 h-4 text-slate-700" />
                <div className="flex-1 p-3 rounded bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  Sparse AER Map
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                  <span className="text-[10px] font-bold font-mono">REC</span>
                </div>
                <ArrowRight className="mx-3 w-4 h-4 text-slate-700" />
                <div className="flex-1 p-3 rounded bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  SNN Synthesis
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Scientific Positioning</h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          Based on current internal comparative understanding, this SNN-based approach demonstrates performance profiles comparable to leading edge-optimized codecs while requiring significantly fewer computational operations (OPs) during inference.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Architecture", value: "SNN-LIF" },
            { label: "Target PSNR", value: "32-38 dB" },
            { label: "Bit-rate Opt.", value: "0.1 - 0.5 bpp" },
            { label: "Latency", value: "~40-120ms" }
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="block text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold mb-1">{stat.label}</span>
              <span className="block text-lg font-bold text-slate-800 dark:text-slate-100">{stat.value}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
