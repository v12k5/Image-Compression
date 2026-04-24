import { CompressedResult, ReconstructionResult, ModelInfo } from '../types';
import { APP_CONFIG } from '../constants';

/**
 * Mock API service for SNN Image Compression & Reconstruction.
 * These methods simulate backend behavior for research and demo purposes.
 */

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApiService = {
  /**
   * Simulates image compression using an SNN-based encoder.
   */
  async compressImage(file: File): Promise<CompressedResult> {
    console.log(`[Mock API] Compressing image: ${file.name}`);
    await sleep(APP_CONFIG.MOCK_LATENCY);

    // Mock logic: generate a compression ratio between 8x and 24x
    const ratio = 8 + Math.random() * 16;
    const compressedSize = Math.floor(file.size / ratio);
    
    // Generate mock bitstream preview (hex)
    const mockBitstream = Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
    ).join(' ');

    return {
      originalFilename: file.name,
      originalSize: file.size,
      compressedFilename: file.name.split('.')[0] + '.snn',
      compressedSize,
      compressionRatio: Number(ratio.toFixed(2)),
      bitstreamPreview: mockBitstream + '...',
      processingTimeMs: 400 + Math.random() * 800,
      status: 'success',
      downloadUrl: '#', // Placeholder for actual blob URL
    };
  },

  /**
   * Simulates image reconstruction from a compressed bit-array.
   */
  async reconstructFromBitstream(file: File): Promise<ReconstructionResult> {
    console.log(`[Mock API] Reconstructing from bitstream: ${file.name}`);
    await sleep(APP_CONFIG.MOCK_LATENCY * 1.5);

    // Mock metrics
    return {
      reconstructedImageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=640&auto=format&fit=crop', // A sample nature image
      originalSize: file.size * 10, // Assuming it's 10x larger
      reconstructedSize: file.size * 10,
      dimensions: { width: 1024, height: 768 },
      qualityMetrics: {
        psnr: 32 + Math.random() * 8,
        ssim: 0.92 + Math.random() * 0.07,
        confidence: 0.985
      },
      processingTimeMs: 600 + Math.random() * 1200,
      status: 'success',
    };
  },

  /**
   * Returns metadata about the currently loaded SNN model.
   */
  async getModelInfo(): Promise<ModelInfo> {
    return {
      version: 'v0.4.2-alpha',
      architecture: 'LIF-ResNet-SNN', // Leaky Integrate-and-Fire ResNet
      snnGeneration: '3rd Generation',
      neuronType: 'LIF (Leaky Integrate-and-Fire)',
      baseAccuracy: 0.982,
    };
  },

  /**
   * Returns a list of sample reconstruction outputs for the overview page.
   */
  async getSampleOutputs() {
    return [
      { id: 1, name: 'Sample A', description: 'Nature, High Texture', ratio: '12.5x' },
      { id: 2, name: 'Sample B', description: 'Architecture, Sharp Edges', ratio: '8.2x' },
      { id: 3, name: 'Sample C', description: 'Portrait, Soft Gradients', ratio: '18.1x' },
    ];
  }
};
