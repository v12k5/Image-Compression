import React, { useState } from 'react';
import { UploadZone } from './UploadZone';
import { APP_CONFIG } from '../constants';
import { mockApiService } from '../services/api';
import { CompressedResult } from '../types';
import { 
  Loader2, 
  ChevronRight, 
  FileText, 
  Activity, 
  Download, 
  BarChart3,
  ImageIcon,
  CheckCircle2,
  Cpu,
  X,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CompressionWorkspace: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<CompressedResult | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setResult(null);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleCompress = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    try {
      const data = await mockApiService.compressImage(selectedFile);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
  };

  return (
    <div id="compression-workspace" className="grid lg:grid-cols-12 gap-6 items-start animate-in fade-in duration-500">
      <div className="lg:col-span-4 space-y-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
          <h2 className="technical-label mb-3">Input Source</h2>
          {!selectedFile ? (
            <UploadZone
              label="Select Research Datum"
              acceptedTypes={APP_CONFIG.SUPPORTED_IMAGE_TYPES}
              maxSize={APP_CONFIG.MAX_IMAGE_SIZE}
              onFileSelect={handleFileSelect}
            />
          ) : (
            <div className="space-y-4">
              <div className="relative group rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 aspect-square flex items-center justify-center p-2">
                {previewUrl && (
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-full object-contain rounded-md"
                  />
                )}
                <button 
                  onClick={reset}
                  className="absolute top-2 right-2 p-1.5 bg-slate-900/40 text-white rounded-full hover:bg-slate-900/60 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-100 dark:border-slate-800">
                <div className="flex items-center text-xs font-bold text-slate-700 dark:text-slate-200 truncate mb-1">
                  <ImageIcon className="w-3.5 h-3.5 mr-2 text-slate-400 dark:text-slate-500" />
                  {selectedFile.name}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  {Math.round(selectedFile.size / 1024)} KB • {selectedFile.type.split('/')[1].toUpperCase()}
                </div>
              </div>
              <button
                disabled={isProcessing}
                onClick={handleCompress}
                className="w-full py-2.5 bg-indigo-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all flex items-center justify-center space-x-2 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-500"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Neural Encoding...</span>
                  </>
                ) : (
                  <>
                    <Activity className="w-4 h-4" />
                    <span>Initialize Compression</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {selectedFile && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <h3 className="technical-label mb-3">SNN Metadata</h3>
            <ul className="space-y-3">
              {[
                { label: "Format Check", val: "Validated" },
                { label: "Boundaries", val: "Optimized" },
                { label: "Quantization", val: "8-bit Int" }
              ].map((item, i) => (
                <li key={i} className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">{item.label}</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 font-mono text-[10px]">{item.val}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
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
                <BarChart3 className="w-6 h-6 text-slate-300 dark:text-slate-600" />
              </div>
              <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">
                Awaiting input stream...
              </p>
            </motion.div>
          )}

          {isProcessing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key="loading"
              className="h-full flex flex-col items-center justify-center p-12 bg-slate-900 rounded-xl shadow-xl min-h-[400px] overflow-hidden relative"
            >
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="grid grid-cols-12 gap-4 p-8">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className={`w-1 h-1 rounded-full bg-indigo-500 ${i % 3 === 0 ? 'animate-pulse' : ''}`} />
                  ))}
                </div>
              </div>
              <div className="relative mb-6">
                <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-indigo-500">
                  <Cpu className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-1">Compression Active</h3>
              <p className="text-indigo-400/60 font-mono text-[10px]">Processing Layer 4-Output Spikes...</p>
            </motion.div>
          )}

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key="result"
              className="space-y-4"
            >
              <div className="bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-800">
                <div className="px-6 py-4 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
                    <div>
                      <h3 className="text-xs font-bold text-white tracking-widest uppercase">Process Nominal</h3>
                      <p className="text-[9px] text-slate-500 font-mono uppercase">Reference: SNN-RX-{result.compressedFilename.split('.')[0]}</p>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-900/20">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Bundle</span>
                  </button>
                </div>
                
                <div className="p-6 grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="technical-label !text-slate-500">Compression Profile</h4>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Original</span>
                        <p className="text-lg font-mono font-bold text-white">{(result.originalSize / 1024).toFixed(0)} KB</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Compressed</span>
                        <p className="text-lg font-mono font-bold text-emerald-400">{(result.compressedSize / 1024).toFixed(1)} KB</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Neuromorphic Ratio</span>
                        <p className="text-lg font-mono font-bold text-indigo-400">{result.compressionRatio}x</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Latency</span>
                        <p className="text-lg font-mono font-bold text-white">{result.processingTimeMs.toFixed(0)}ms</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="technical-label !text-slate-500">Bitstream Payload</h4>
                    <div className="bg-slate-950/80 rounded-lg p-3 font-mono text-[10px] text-indigo-400/70 border border-slate-800 leading-relaxed overflow-hidden h-32 relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/90 pointer-events-none" />
                      <div className="break-all">
                        {result.bitstreamPreview.split(' ').map((chunk, i) => (
                          <span key={i} className="inline-block mr-1">{chunk}</span>
                        ))}
                        {result.bitstreamPreview.split(' ').map((chunk, i) => (
                          <span key={i + 100} className="inline-block mr-1 opacity-50">{chunk}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { label: "Spiking Density", value: "12.4%", icon: <Zap className="w-3.5 h-3.5" /> },
                  { label: "Latent Dim", value: "512-bit", icon: <FileText className="w-3.5 h-3.5" /> },
                  { label: "SNN Efficiency", value: "Nominal", icon: <Cpu className="w-3.5 h-3.5" /> }
                ].map((item, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center space-x-4 shadow-sm">
                    <div className="p-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg text-slate-400 dark:text-slate-500">{item.icon}</div>
                    <div>
                      <span className="technical-label !text-slate-400 dark:!text-slate-500 !text-[9px] mb-0.5 block">{item.label}</span>
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono tracking-tight">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
