// 'use client';

// import { useEffect, useState } from 'react';

// export default function VoiceRecorder({ onResult }: { onResult: (text: string) => void }) {
//   const [recording, setRecording] = useState(false);

//   useEffect(() => {
//     if (!recording) return;

//     const recognition = new (window as any).webkitSpeechRecognition();
//     recognition.lang = 'en-US';
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     recognition.onresult = (event: any) => {
//       const text = event.results[0][0].transcript;
//       onResult(text);
//       setRecording(false);
//     };

//     recognition.onerror = () => setRecording(false);
//     recognition.onend = () => setRecording(false);
//     recognition.start();

//     return () => recognition.stop();
//   }, [recording]);

//   return (
//     <button
//       className="bg-gray-200 p-2 rounded"
//       onClick={() => setRecording((prev) => !prev)}
//     >
      
//     </button>
//   );
// }


'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface VoiceRecorderProps {
  onResult: (text: string) => void;
  disabled?: boolean;
  className?: string;
}

export default function VoiceRecorder({ onResult, disabled = false, className = '' }: VoiceRecorderProps) {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const SpeechRecognitionConstructor =
      typeof window !== 'undefined' &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (!SpeechRecognitionConstructor) {
      console.warn('Speech recognition not supported in this browser.');
      return;
    }

    const recognition: SpeechRecognition = new SpeechRecognitionConstructor();

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
  }, [onResult]);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }

    setIsRecording(!isRecording);
  };

  return (
    <button
      type="button"
      onClick={toggleRecording}
      disabled={disabled}
      className={`rounded-full border p-2 text-sm ${isRecording ? 'bg-red-500 text-white' : 'bg-gray-200'} ${className}`}
      title={isRecording ? 'Stop Recording' : 'Start Recording'}
    >
      🎙️
    </button>
  );
}

