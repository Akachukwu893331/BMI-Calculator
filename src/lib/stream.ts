// // /lib/stream.ts
// export async function streamChat(messages: any[], bmiData: any) {
//   const history = messages.map((msg) => ({
//     role: msg.role,
//     content: msg.content,
//   }));

//   const prompt = messages[messages.length - 1].content;

//   const response = await fetch('/api/gemini-chat', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ messages: history, prompt, bmiData }),
//   });

//   const data = await response.json();
//   return data.content;
// }



// /lib/stream.ts

import { GeminiHistory } from '@/types/gemini';

export async function streamChat(
  history: GeminiHistory[],
  context?: {
    bmi: number;
    height: number;
    weight: number;
    age: number;
    gender: 'male' | 'female';
    units: 'metric' | 'imperial';
  }
): Promise<string> {
  try {
    const res = await fetch('/api/gemini-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history, context }),
    });

    if (!res.ok) {
      throw new Error('Failed to fetch AI response');
    }

    const data = await res.json();
    return data.text || 'Sorry, I could not understand.';
  } catch (error) {
    console.error('streamChat error:', error);
    return 'An error occurred while getting the response.';
  }
}
