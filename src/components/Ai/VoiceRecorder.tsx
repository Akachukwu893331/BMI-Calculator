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

// Add browser SpeechRecognition type definitions for TypeScript

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }

  interface SpeechRecognition extends EventTarget {
    lang: string;
    start(): void;
    stop(): void;
    abort(): void;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    onaudioend?: (event: Event) => void;
    onaudiostart?: (event: Event) => void;
    onend?: (event: Event) => void;
    onerror?: (event: SpeechRecognitionErrorEvent) => void;
    onnomatch?: (event: SpeechRecognitionEvent) => void;
    onresult?: (event: SpeechRecognitionEvent) => void;
    onsoundend?: (event: Event) => void;
    onsoundstart?: (event: Event) => void;
    onspeechend?: (event: Event) => void;
    onspeechstart?: (event: Event) => void;
    onstart?: (event: Event) => void;
  }

  interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
  }

  interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult;
    length: number;
  }

  interface SpeechRecognitionResult {
    [index: number]: SpeechRecognitionAlternative;
    length: number;
    isFinal: boolean;
  }

  interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
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
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

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
