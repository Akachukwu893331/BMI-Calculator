// src/types/gemini.ts

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export type GeminiHistory = GeminiMessage[];
