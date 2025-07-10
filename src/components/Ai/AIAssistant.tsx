'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { speak } from '@/lib/tts';
import { streamChat } from '@/lib/stream';
import VoiceRecorder from './VoiceRecorder';
import { FiSend } from 'react-icons/fi';
import { IoMdNutrition } from 'react-icons/io';
import { FaRunning, FaWeight } from 'react-icons/fa';
import { MdHealthAndSafety } from 'react-icons/md';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Props {
  bmiData?: {
    bmi: number;
    height: number;
    weight: number;
    age: number;
    gender: 'male' | 'female';
    units: 'metric' | 'imperial';
  } | null;
}

export default function AIAssistant({ bmiData }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'health'>('chat');

  const getBMICategory = (bmi: number, age: number) => {
    const adjustedBMI = age > 65 ? bmi * 0.95 : bmi;
    if (adjustedBMI < 16) return 'Severe Thinness';
    if (adjustedBMI < 17) return 'Moderate Thinness';
    if (adjustedBMI < 18.5) return 'Mild Thinness';
    if (adjustedBMI < 25) return 'Normal';
    if (adjustedBMI < 30) return 'Overweight';
    if (adjustedBMI < 35) return 'Obese Class I';
    if (adjustedBMI < 40) return 'Obese Class II';
    return 'Obese Class III';
  };

  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5) return '#f59e0b';
    if (bmi < 25) return '#10b981';
    if (bmi < 30) return '#f59e0b';
    if (bmi < 35) return '#f97316';
    return '#ef4444';
  };

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await streamChat([...messages, userMessage], bmiData);

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      await speak(response);
    } catch (error) {
      console.error('Failed to get response:', error);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, bmiData]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleVoiceResult = (text: string) => {
    setInput(text);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: `Hello! I'm your Health Assistant. ${
          bmiData ? `I see your BMI is ${bmiData.bmi.toFixed(1)} (${getBMICategory(bmiData.bmi, bmiData.age)}).` : ''
        } How can I help you today?`,
        timestamp: new Date(),
      }]);
    }
  }, [bmiData, messages.length]);

  const quickPrompts = [
    { icon: <IoMdNutrition className="text-green-500" />, text: "Nutrition tips for my BMI" },
    { icon: <FaRunning className="text-blue-500" />, text: "Best exercises for me" },
    { icon: <MdHealthAndSafety className="text-purple-500" />, text: "Health risks to watch for" },
    { icon: <FaWeight className="text-orange-500" />, text: "Healthy weight goals" }
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center border-b border-gray-200">
        <button
          onClick={() => setActiveTab('chat')}
          className={`w-1/2 py-3 text-sm font-medium ${activeTab === 'chat' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
        >
          Chat
        </button>
        <button
          onClick={() => setActiveTab('health')}
          className={`w-1/2 py-3 text-sm font-medium ${activeTab === 'health' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
        >
          Summary
        </button>
      </div>

      {activeTab === 'chat' ? (
        <div className="flex flex-col flex-grow overflow-y-auto px-4 py-2 space-y-4" ref={chatContainerRef}>
          {messages.map((msg) => (
            <div key={msg.id} className={`max-w-md px-4 py-2 rounded-lg ${msg.role === 'user' ? 'ml-auto bg-indigo-100 text-gray-800' : 'mr-auto bg-white border text-gray-700'}`}>
              {msg.content}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 text-sm text-gray-600 space-y-3">
          {bmiData ? (
            <>
              <div><strong>BMI:</strong> {bmiData.bmi.toFixed(1)} (<span style={{ color: getBMIColor(bmiData.bmi) }}>{getBMICategory(bmiData.bmi, bmiData.age)}</span>)</div>
              <div><strong>Age:</strong> {bmiData.age}</div>
              <div><strong>Gender:</strong> {bmiData.gender}</div>
              <div><strong>Height:</strong> {bmiData.height} {bmiData.units === 'metric' ? 'cm' : 'in'}</div>
              <div><strong>Weight:</strong> {bmiData.weight} {bmiData.units === 'metric' ? 'kg' : 'lbs'}</div>
            </>
          ) : (
            <div>No BMI data available.</div>
          )}
        </div>
      )}

      <div className="px-4 py-2 border-t border-gray-200 bg-white">
        <div className="flex flex-wrap gap-2 mb-2">
          {quickPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => setInput(prompt.text)}
              className="flex items-center gap-1 text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-full hover:bg-gray-200"
            >
              {prompt.icon} {prompt.text}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <VoiceRecorder onResult={handleVoiceResult} disabled={isLoading} className="w-10 h-10" />
          <textarea
            rows={1}
            className="flex-grow resize-none border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            className="p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg disabled:opacity-50"
            disabled={isLoading}
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}