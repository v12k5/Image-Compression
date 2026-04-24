import React, { useRef, useState } from 'react';
import { Upload, X, FileImage, FileCode, AlertCircle } from 'lucide-react';
import { APP_CONFIG } from '../constants';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  acceptedTypes: string[];
  maxSize: number;
  label: string;
  icon?: React.ReactNode;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onFileSelect,
  acceptedTypes,
  maxSize,
  label,
  icon
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    setError(null);
    
    const isAcceptedType = acceptedTypes.length === 0 || 
      acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return file.name.toLowerCase().endsWith(type.toLowerCase());
        }
        return file.type === type;
      });

    if (!isAcceptedType) {
      setError(`Invalid file type. Accepted: ${acceptedTypes.join(', ')}`);
      return false;
    }

    if (file.size > maxSize) {
      setError(`File is too large. Max size is ${Math.round(maxSize / 1024 / 1024)}MB`);
      return false;
    }

    return true;
  };

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      onFileSelect(file);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div
        id="upload-zone-container"
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
          isDragging 
            ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20' 
            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/30 dark:bg-slate-900/50'
        }`}
      >
        <input
          id="file-input-hidden"
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          accept={acceptedTypes.join(',')}
        />
        
        <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm mb-4 border border-slate-100 dark:border-slate-700">
          {icon || <Upload className="w-6 h-6 text-slate-400 dark:text-slate-500" />}
        </div>
        
        <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase mb-1">{label}</h3>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-medium uppercase tracking-tighter">
          Drag and drop or click to browse
        </p>
        <p className="mt-4 text-[9px] text-slate-300 dark:text-slate-600 font-bold uppercase tracking-[0.1em]">
          Max {Math.round(maxSize / 1024 / 1024)}MB • {acceptedTypes.map(t => t.split('/')[1] || t).join(', ')}
        </p>
      </div>

      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center text-red-700 text-sm animate-in fade-in slide-in-from-top-1">
          <AlertCircle className="w-4 h-4 mr-2" />
          {error}
        </div>
      )}
    </div>
  );
};
