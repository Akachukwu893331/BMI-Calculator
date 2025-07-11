// /types/gemini.ts



// /types/gemini.ts ✅ FIXED
export interface GeminiHistory {
  role: 'user' | 'model';
  parts: { text: string }[];
}
