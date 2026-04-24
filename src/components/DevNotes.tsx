import React from 'react';
import { Terminal, Cpu, Database, Layout, ArrowRight } from 'lucide-react';

export const DevNotes: React.FC = () => {
  return (
    <div id="dev-notes" className="space-y-12 max-w-5xl animate-in fade-in duration-700">
      <header>
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full border border-slate-200 uppercase tracking-widest mb-4">
          Documentation Node
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">System Specification</h2>
        <p className="text-slate-500 font-medium max-w-2xl">Reference architecture and integration protocols for the 3rd Gen Neuromorphic Compression platform.</p>
      </header>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <section className="card-container !p-0 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Database className="w-4 h-4 text-slate-400" />
                <h3 className="technical-label !text-slate-700">Implementation Protocols</h3>
              </div>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-bold rounded border border-emerald-100 uppercase tracking-tight">Active</span>
            </div>
            <div className="p-8 space-y-6">
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                The current environment operates on a frontend virtualization layer. All SNN processing signals are routed through a mock service layer (<code>/src/services/api.ts</code>) to validate UI-to-Engine handshakes.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded bg-indigo-50 flex items-center justify-center">
                      <Layout className="w-3.5 h-3.5 text-indigo-500" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-tight">Module Patterns</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Decoupled architecture: <code>Encoder</code> modules handle PSNR estimation, while <code>Decoder</code> blocks perform LIF synthesis.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded bg-emerald-50 flex items-center justify-center">
                      <Database className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-tight">Persistence</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Stateless execution. Session data persists in local ephemeral state only. External DB hooks recommended for research tracking.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Terminal className="w-24 h-24 text-white" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-6 pb-2 border-b border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-[0.2em]">Neural Port Configuration</span>
              </div>
              <div className="space-y-4 font-mono text-[11px] leading-relaxed">
                <div className="p-3 bg-white/5 rounded border border-white/10 group hover:border-indigo-500/50 transition-colors">
                  <span className="text-indigo-400 font-bold uppercase tracking-widest mr-4">Target</span>
                  <span className="text-slate-300">POST neural/v1/encode_stream</span>
                </div>
                <div className="p-3 bg-white/5 rounded border border-white/10 group hover:border-indigo-500/50 transition-colors">
                  <span className="text-indigo-400 font-bold uppercase tracking-widest mr-4">Signal</span>
                  <span className="text-slate-300">AER-Mapped Spiking Temporal Bitstream</span>
                </div>
                <div className="p-3 bg-white/5 rounded border border-white/10 group hover:border-indigo-500/50 transition-colors">
                  <span className="text-indigo-400 font-bold uppercase tracking-widest mr-4">Format</span>
                  <span className="text-slate-300">SNN-V1-SPARSE [BIN/SNN]</span>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <span className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.3em]">Awaiting Handshake...</span>
                <button className="flex items-center text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest transition-colors">
                  View Full Schema
                  <ArrowRight className="ml-2 w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <section className="card-container">
            <h3 className="technical-label mb-4">Neural Metadata</h3>
            <ul className="space-y-4">
              {[
                { label: "Architecture", val: "LIF SNN v3" },
                { label: "Precision", val: "INT8 Sparse" },
                { label: "dt Resolution", val: "16ms" },
                { label: "Synapse Count", val: "4.2M" }
              ].map((item, i) => (
                <li key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0 last:pb-0">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{item.label}</span>
                  <span className="text-[10px] font-mono font-bold text-slate-900">{item.val}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-indigo-600 rounded-xl p-6 text-white shadow-xl shadow-indigo-100 flex flex-col items-center text-center">
            <Cpu className="w-10 h-10 text-indigo-300 mb-4" />
            <h3 className="text-xs font-bold uppercase tracking-widest mb-2">Neuromorphic Ready</h3>
            <p className="text-[10px] text-indigo-100 leading-relaxed font-medium mb-6">
              Architecture fully optimized for SpiNNaker and Loihi-based acceleration hardware.
            </p>
            <button className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-colors">
              Platform Roadmap
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};
