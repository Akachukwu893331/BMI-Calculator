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

export async function streamChat(messages: any[], bmiData: any) {
  const history = messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  const prompt = messages[messages.length - 1].content;

  try {
    const response = await fetch('/api/gemini-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history, prompt, bmiData }),
    });

    // Check for HTTP error status
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Gemini Chat API Error:', response.status, errorText);
      throw new Error(`Gemini chat API failed with status ${response.status}`);
    }

    const data = await response.json();

    // Defensive fallback if no `content`
    if (!data?.content) {
      console.warn('⚠️ Gemini chat response missing content:', data);
      return 'Sorry, I couldn’t generate a response. Please try again.';
    }

    return data.content;

  } catch (error) {
    console.error('❌ streamChat error:', error);
    return 'An error occurred while getting the response. Please try again later.';
  }
}
