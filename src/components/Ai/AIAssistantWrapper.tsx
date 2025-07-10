'use client';

import AIAssistant from './AIAssistant';
import { useEffect, useState } from 'react';

export default function AIAssistantWrapper() {
  const [bmiData, setBmiData] = useState<{
    bmi: number;
    height: number;
    weight: number;
    age: number;
    gender: 'male' | 'female';
    units: 'metric' | 'imperial';
  } | null>(null);

  // Optional: If you plan to fetch BMI data from localStorage or API
  useEffect(() => {
    const storedData = localStorage.getItem('bmiData');
    if (storedData) {
      try {
        setBmiData(JSON.parse(storedData));
      } catch (err) {
        console.error('Failed to parse BMI data:', err);
      }
    }
  }, []);

  return <AIAssistant bmiData={bmiData} />;
}
