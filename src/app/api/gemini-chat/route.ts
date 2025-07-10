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
    let messages = (body.messages as { role: 'user' | 'assistant'; content: string }[])
      .filter(msg => !!msg.content?.trim());

    const prompt = body.prompt;

    const firstUserIndex = messages.findIndex(m => m.role === 'user');
    if (firstUserIndex === -1) {
      return new Response(JSON.stringify({ error: 'No user message found.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    messages = messages.slice(firstUserIndex);

    if (messages[0].role !== 'user') {
      return new Response(JSON.stringify({ error: 'First message must be from user.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // ✅ Convert to Gemini-compatible format
    const geminiHistory = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [msg.content],
    }));

    console.log('🔍 Gemini Chat History Sent:', geminiHistory);

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const chat = model.startChat({ history: geminiHistory });

    // ✅ Send prompt as { parts: [...] }
    const result = await chat.sendMessage({ parts: [prompt] });

    // ✅ Extract response safely
    const responseText = result.response.text();

    return new Response(JSON.stringify({ content: responseText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('❌ Gemini API Route Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
