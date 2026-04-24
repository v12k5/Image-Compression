/**
 * Constants used throughout the application.
 */

export const APP_CONFIG = {
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_COMPRESSED_SIZE: 1 * 1024 * 1024, // 1MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  SUPPORTED_COMPRESSED_EXT: ['.snn', '.bin', '.bit'],
  MOCK_LATENCY: 1500, // ms
};

export const RESEARCH_CONTENT = {
  problemStatement: "SNN based image compression often struggles with the power-fidelity trade-off. As IoT and edge devices proliferate, the need for efficient, biologically-inspired computation becomes critical.",
  snnRelevance: "Spiking Neural Networks (SNNs) process information using asynchronous spikes, mimicking biological brain activity. This results in significant energy efficiency and high temporal resolution.",
  generationTitle: "Third-Generation Neural Networks",
  generationDescription: "SNNs represent the third generation of neural network models. Unlike 1st gen (Perceptrons) or 2nd gen (MLPs/CNNs), SNNs use time as a dimension, potentially offering superior performance in sparse data reconstruction.",
};
