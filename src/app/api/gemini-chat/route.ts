// // /app/api/gemini-chat/route.ts
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { NextRequest } from 'next/server';

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   const messages = body.messages as { role: 'user' | 'assistant'; content: string }[];

//   const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
//   const chat = model.startChat({ history: messages });

//   const result = await chat.sendMessage(body.prompt);
//   const response = result.response.text();

//   return new Response(JSON.stringify({ content: response }));
// }


import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const history = body.history as {
      role: 'user' | 'model';
      parts: { text: string }[];
    }[];

    if (!history?.length) {
      return new Response(JSON.stringify({ error: 'No history provided.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const chat = model.startChat({ history });

    const lastUserMessage = history.reverse().find(m => m.role === 'user')?.parts?.[0]?.text;
    const prompt = lastUserMessage || 'Hello';

    const result = await chat.sendMessage(prompt);

    const responseText = result.response.text();

    return new Response(JSON.stringify({ text: responseText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Gemini API Route Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
