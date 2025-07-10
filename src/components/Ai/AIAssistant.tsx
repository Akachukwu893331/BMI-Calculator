'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { speak } from '@/lib/tts';
import { streamChat } from '@/lib/stream';
import VoiceRecorder from './VoiceRecorder';
import { FiSend } from 'react-icons/fi';
import { IoMdNutrition } from 'react-icons/io';
import { FaRunning, FaWeight } from 'react-icons/fa';
import { MdHealthAndSafety } from 'react-icons/md';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

type Props = {
  bmiData?: {
    bmi: number;
    height: number;
    weight: number;
    age: number;
    gender: 'male' | 'female';
    units: 'metric' | 'imperial';
  } | null;
};

export default function AIAssistant({ bmiData }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'health'>('chat');

  const getBMICategory = (bmi: number, age: number) => {
    let adjustedBMI = age > 65 ? bmi * 0.95 : bmi;
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
      setIsSpeaking(true);
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
      <div className="bg-white border-b">
        <div className="flex">
          <button
            className={`flex-1 py-3 font-medium text-sm ${activeTab === 'chat' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('chat')}
          >
            Chat
          </button>
          {bmiData && (
            <button
              className={`flex-1 py-3 font-medium text-sm ${activeTab === 'health' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('health')}
            >
              Health Summary
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {activeTab === 'health' && bmiData ? (
          <div className="p-6 space-y-6">
            {/* BMI Ring */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
              <div className="flex justify-center items-center space-x-4">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="45"
                      fill="none"
                      stroke={getBMIColor(bmiData.bmi)}
                      strokeWidth="8"
                      strokeDasharray={`${(Math.min(bmiData.bmi, 40) / 40) * 282.6} 282.6`}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                    <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold fill-gray-800">
                      {bmiData.bmi.toFixed(1)}
                    </text>
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {getBMICategory(bmiData.bmi, bmiData.age)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {bmiData.age} years • {bmiData.gender}
                  </p>
                </div>
              </div>
            </div>

            {/* Height & Weight */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-xs">
                <h4 className="text-xs font-medium text-gray-500 mb-1">Height</h4>
                <p className="text-lg font-semibold">
                  {bmiData.units === 'metric'
                    ? `${bmiData.height} cm`
                    : `${Math.floor(bmiData.height / 12)} ft ${Math.round(bmiData.height % 12)} in`}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-xs">
                <h4 className="text-xs font-medium text-gray-500 mb-1">Weight</h4>
                <p className="text-lg font-semibold">
                  {bmiData.units === 'metric'
                    ? `${bmiData.weight} kg`
                    : `${bmiData.weight} lbs`}
                </p>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {bmiData.bmi < 18.5 && (
                  <>
                    <li><span className="text-green-500 mr-2">•</span> Increase calorie intake with nutrient-dense foods</li>
                    <li><span className="text-green-500 mr-2">•</span> Strength training to build muscle mass</li>
                  </>
                )}
                {bmiData.bmi >= 18.5 && bmiData.bmi < 25 && (
                  <>
                    <li><span className="text-green-500 mr-2">•</span> Maintain current healthy habits</li>
                    <li><span className="text-green-500 mr-2">•</span> Regular physical activity (150+ mins/week)</li>
                  </>
                )}
                {bmiData.bmi >= 25 && (
                  <>
                    <li><span className="text-green-500 mr-2">•</span> Moderate calorie reduction</li>
                    <li><span className="text-green-500 mr-2">•</span> Increase aerobic exercise</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <>
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs mt-1 opacity-70 text-right">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2 max-w-xs">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-400"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 grid grid-cols-2 gap-2">
                {quickPrompts.map((p, i) => (
                  <button key={i} className="bg-white border rounded-lg p-3 text-xs flex items-center hover:bg-gray-50" onClick={() => setInput(p.text)}>
                    <span className="mr-2">{p.icon}</span>{p.text}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {/* Input Section */}
        <div className="border-t bg-white p-4">
          <div className="relative flex items-center">
            <input
              className="flex-1 border rounded-full py-3 pl-4 pr-12 focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about health, nutrition, exercise..."
              disabled={isLoading}
            />
            <div className="absolute right-2 flex space-x-1">
              <VoiceRecorder onResult={handleVoiceResult} disabled={isLoading} className="p-2 text-gray-500 hover:text-blue-600" />
              <button
                className={`p-2 rounded-full ${!input.trim() || isLoading ? 'text-gray-400' : 'text-white bg-blue-600 hover:bg-blue-700'}`}
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
              >
                {isLoading ? <div className="animate-spin h-5 w-5 border-b-2 border-white rounded-full" /> : <FiSend size={18} />}
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">Health Assistant provides general information only. Consult a healthcare professional.</p>
        </div>
      </div>
    </div>
  );
}
