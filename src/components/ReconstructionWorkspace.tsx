import React, { useState } from 'react';
import { UploadZone } from './UploadZone';
import { APP_CONFIG } from '../constants';
import { mockApiService } from '../services/api';
import { ReconstructionResult } from '../types';
import { 
  Loader2, 
  Terminal, 
  Image as ImageIcon, 
  Zap, 
  RefreshCcw, 
  BarChart, 
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ReconstructionWorkspace: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ReconstructionResult | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setResult(null);
  };

  const handleReconstruct = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    try {
      const data = await mockApiService.reconstructFromBitstream(selectedFile);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div id="reconstruction-workspace" className="grid lg:grid-cols-12 gap-6 items-start animate-in fade-in duration-500">
      <div className="lg:col-span-4 space-y-4">
        <div className="card-container">
          <h2 className="technical-label mb-3">Encoded Source</h2>
          {!selectedFile ? (
            <UploadZone
              label="Select SNN Stream"
              acceptedTypes={APP_CONFIG.SUPPORTED_COMPRESSED_EXT}
              maxSize={APP_CONFIG.MAX_COMPRESSED_SIZE}
              onFileSelect={handleFileSelect}
              icon={<Terminal className="w-8 h-8 text-slate-400 dark:text-slate-500" />}
            />
          ) : (
            <div className="space-y-4">
              <div className="p-6 bg-slate-900 border border-slate-800 flex flex-col items-center text-center shadow-inner rounded-xl">
                <Terminal className="w-10 h-10 text-indigo-400 mb-2" />
                <div className="text-xs font-mono text-indigo-300 truncate w-full mb-1">
                  {selectedFile.name}
                </div>
                <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                  {(selectedFile.size / 1024).toFixed(1)} KB • SNN V1.0
                </div>
              </div>
              
              <button
                disabled={isProcessing}
                onClick={handleReconstruct}
                className="w-full py-2.5 bg-indigo-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all flex items-center justify-center space-x-2 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-500"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Synthesizing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Run Decoder</span>
                  </>
                )}
              </button>

              <button 
                onClick={() => setSelectedFile(null)}
                className="w-full text-[9px] text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest font-bold"
              >
                Reset Datum
              </button>
            </div>
          )}
        </div>

        <div className="card-container">
          <h3 className="technical-label mb-3">Model Parameters</h3>
          <div className="space-y-3">
            {[
              { label: "Synthesis", val: "Temporal-LIF" },
              { label: "Precision", val: "FP16 (Half)" },
              { label: "Reference", val: "SNN-RX-v4" }
            ].map((item, i) => (
              <div key={i} className="flex justify-between text-[11px]">
                <span className="text-slate-500 font-medium">{item.label}</span>
                <span className="text-slate-900 font-bold font-mono tracking-tight">{item.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          {!result && !isProcessing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm min-h-[400px]"
            >
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-full mb-4">
                <RefreshCcw className="w-6 h-6 text-slate-300 dark:text-slate-600" />
              </div>
              <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">
                Decoder idle. Awaiting bitstream...
              </p>
            </motion.div>
          )}

          {isProcessing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm min-h-[400px]"
            >
              <div className="w-full max-w-sm space-y-6 text-center">
                <div className="flex justify-between technical-label !text-slate-500">
                  <span>Synthesizing Output</span>
                  <span className="text-indigo-600 dark:text-indigo-400">Active</span>
                </div>
                <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="h-full w-1/3 bg-indigo-500" 
                  />
                </div>
                <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest animate-pulse">
                  Decoding Temporal Spikes to Spatial Grid...
                </p>
              </div>
            </motion.div>
          )}

          {result && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                <div className="p-2">
                  <div className="relative group rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800/50 aspect-video flex items-center justify-center border border-slate-100 dark:border-slate-800">
                    <img 
                      src={result.reconstructedImageUrl} 
                      alt="Reconstructed" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30 hover:bg-white/30 transition-all">
                        <Maximize2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-indigo-600/90 backdrop-blur-md text-white text-[9px] font-bold rounded uppercase tracking-widest shadow-lg">
                        Reconstructed Frame
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-50 dark:border-slate-800 grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="technical-label !text-slate-500">Fidelity Report</h4>
                    <div className="space-y-2">
                      {[
                        { label: "PSNR Index", val: `${result.qualityMetrics.psnr.toFixed(2)} dB`, icon: <BarChart className="w-4 h-4 text-indigo-500" /> },
                        { label: "SSIM Value", val: result.qualityMetrics.ssim.toFixed(4), icon: <ImageIcon className="w-4 h-4 text-emerald-500" /> },
                        { label: "Confidence", val: `${(result.qualityMetrics.confidence * 100).toFixed(1)}%`, icon: <ShieldCheck className="w-4 h-4 text-amber-500" /> }
                      ].map((stat, i) => (
                        <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                          <div className="flex items-center">
                            {stat.icon}
                            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase ml-3 tracking-tight">{stat.label}</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">{stat.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="technical-label !text-slate-500">Spatial Dimensions</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 text-center">
                        <span className="technical-label !text-slate-400 dark:!text-slate-500 mb-1 block">Output Res</span>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-100 font-mono tracking-tight">{result.dimensions.width}x{result.dimensions.height}</span>
                      </div>
                      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 text-center">
                        <span className="technical-label !text-slate-400 dark:!text-slate-500 mb-1 block">Latency</span>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-100 font-mono tracking-tight">{result.processingTimeMs.toFixed(0)}ms</span>
                      </div>
                    </div>
                    <div className="pt-2">
                      <button className="w-full py-2.5 bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white rounded-lg text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-slate-200 dark:shadow-none hover:bg-slate-800 dark:hover:bg-white transition-colors">
                        Export Statistics
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl p-4 flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[11px] font-bold text-emerald-900 dark:text-emerald-400 uppercase tracking-widest mb-1">Stability Analysis Pass</h4>
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-500 leading-relaxed font-medium">
                    The reconstructed frame matches reference temporal signatures with high confidence. No significant spike-dropout detected in early layers.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
