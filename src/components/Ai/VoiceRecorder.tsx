'use client';

import { useEffect, useState } from 'react';

export default function VoiceRecorder({ onResult }: { onResult: (text: string) => void }) {
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    if (!recording) return;

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      onResult(text);
      setRecording(false);
    };

    recognition.onerror = () => setRecording(false);
    recognition.onend = () => setRecording(false);
    recognition.start();

    return () => recognition.stop();
  }, [recording]);

  return (
    <button
      className="bg-gray-200 p-2 rounded"
      onClick={() => setRecording((prev) => !prev)}
    >
      
    </button>
  );
}
