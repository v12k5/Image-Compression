/**
 * Type definitions for the SNN Image Compression system.
 */

export type AppTab = 'overview' | 'compress' | 'reconstruct' | 'research';

export interface ImageMetadata {
  name: string;
  size: number;
  type: string;
  dimensions?: {
    width: number;
    height: number;
  };
  lastModified: number;
}

export interface CompressedResult {
  originalFilename: string;
  originalSize: number;
  compressedFilename: string;
  compressedSize: number;
  compressionRatio: number;
  bitstreamPreview: string; // Hex or binary summary
  processingTimeMs: number;
  status: 'success' | 'error';
  downloadUrl: string;
}

export interface ReconstructionResult {
  reconstructedImageUrl: string;
  originalSize: number;
  reconstructedSize: number;
  dimensions: {
    width: number;
    height: number;
  };
  qualityMetrics: {
    psnr: number;
    ssim: number;
    confidence: number;
  };
  processingTimeMs: number;
  status: 'success' | 'error';
}

export interface ModelInfo {
  version: string;
  architecture: string;
  snnGeneration: string;
  neuronType: string;
  baseAccuracy: number;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}
