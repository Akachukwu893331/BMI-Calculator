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

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = (body.messages as ChatMessage[]).filter(m => !!m.content?.trim());
    const prompt: string = body.prompt;

    const firstUserIndex = messages.findIndex(m => m.role === 'user');
    if (firstUserIndex === -1) {
      return new Response(JSON.stringify({ error: 'No user message found.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const validMessages = messages.slice(firstUserIndex);
    if (validMessages[0].role !== 'user') {
      return new Response(JSON.stringify({ error: 'First message must be from user.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const geminiHistory = validMessages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    console.log('🔍 Gemini Chat History Sent:', geminiHistory);

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const chat = model.startChat({ history: geminiHistory });

    // ✅ Correct: use string directly as prompt
    const result = await chat.sendMessage(prompt);

    const responseText = result.response.text();

    return new Response(JSON.stringify({ content: responseText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('❌ Gemini API Route Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

