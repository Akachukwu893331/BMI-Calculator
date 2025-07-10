'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BMICalculatorForm from './BMICalculatorForm';
import BMIResult from './BMIResult';
import BMIChart from './BMIChart';
import HealthTips from './HealthTips';

type Units = 'metric' | 'imperial';
type Gender = 'male' | 'female';

type BMIResultData = {
  bmi: number;
  height: number;
  weight: number;
  age: number;
  gender: Gender;
  units: Units;
  waistCircumference?: number;
  hipCircumference?: number;
};

export default function CalculatorClient() {
  const [result, setResult] = useState<BMIResultData | null>(null);
  const [units, setUnits] = useState<Units>('metric');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCalculate = (data: {
    height: number;
    weight: number;
    age: number;
    gender: Gender;
    units: Units;
    waistCircumference?: number;
    hipCircumference?: number;
  }) => {
    try {
      if (data.height <= 0 || data.weight <= 0 || data.age <= 0) {
        throw new Error('Please enter valid positive numbers for all fields');
      }

      if (data.age < 2 || data.age > 120) {
        throw new Error('Age must be between 2 and 120 years');
      }

      let heightInMeters: number;
      let weightInKg: number;

      if (data.units === 'metric') {
        if (data.height < 100 || data.height > 250) {
          throw new Error('Height must be between 100cm and 250cm');
        }
        if (data.weight < 20 || data.weight > 500) {
          throw new Error('Weight must be between 20kg and 500kg');
        }
        heightInMeters = data.height / 100;
        weightInKg = data.weight;
      } else {
        if (data.height < 36 || data.height > 96) {
          throw new Error('Height must be between 3ft and 8ft');
        }
        if (data.weight < 44 || data.weight > 1100) {
          throw new Error('Weight must be between 44lbs and 1100lbs');
        }
        heightInMeters = (data.height * 2.54) / 100;
        weightInKg = data.weight * 0.453592;
      }

      const bmi = weightInKg / (heightInMeters * heightInMeters);
      if (!isFinite(bmi)) {
        throw new Error('Invalid calculation - please check your inputs');
      }

      setResult({ ...data, bmi });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setResult(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Calculator Form */}
      <BMICalculatorForm
        onCalculate={handleCalculate}
        resetResult={() => setResult(null)}
        units={units}
        setUnits={setUnits}
      />

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <p className="ml-3 text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* BMI Result Sections */}
      {result && (
        <div className="space-y-6">
          <BMIResult result={result} />
          <BMIChart
            bmi={result.bmi}
            age={result.age}
            gender={result.gender}
            height={result.height}
            weight={result.weight}
            units={result.units}
          />
          <HealthTips
            bmi={result.bmi}
            age={result.age}
            gender={result.gender}
            bmiCategory={getBMICategory(result.bmi, result.age)?.category}
            bodyFatPercentage={calculateBodyFat(result.bmi, result.age, result.gender)}
          />

          {/* AI Assistant Link CTA */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg space-y-2">
            <p className="text-blue-800 font-medium">
              Want deeper insights or personalized guidance?
            </p>
            <p className="text-sm text-blue-700">
              Click the button below to chat with our AI Health Assistant.
            </p>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.setItem('bmiData', JSON.stringify(result));
                }
                router.push('/Ai');
              }}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Talk to AI Assistant
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helpers
const getBMICategory = (bmi: number, age: number) => {
  if (!bmi) return null;
  const adjustedBMI = age > 65 ? bmi * 0.95 : bmi;
  if (adjustedBMI < 16) return { category: 'Severe Thinness', color: 'bg-red-600' };
  if (adjustedBMI < 17) return { category: 'Moderate Thinness', color: 'bg-red-400' };
  if (adjustedBMI < 18.5) return { category: 'Mild Thinness', color: 'bg-yellow-300' };
  if (adjustedBMI < 25) return { category: 'Normal', color: 'bg-green-500' };
  if (adjustedBMI < 30) return { category: 'Overweight', color: 'bg-yellow-500' };
  if (adjustedBMI < 35) return { category: 'Obese Class I', color: 'bg-orange-500' };
  if (adjustedBMI < 40) return { category: 'Obese Class II', color: 'bg-red-500' };
  return { category: 'Obese Class III', color: 'bg-red-700' };
};

const calculateBodyFat = (bmi: number, age: number, gender: Gender) => {
  if (!bmi || !age) return null;
  return gender === 'male'
    ? 1.2 * bmi + 0.23 * age - 16.2
    : 1.2 * bmi + 0.23 * age - 5.4;
};
