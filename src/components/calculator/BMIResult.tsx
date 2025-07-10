"use client";

import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type Gender = 'male' | 'female';
type Units = 'metric' | 'imperial';

interface HealthMetrics {
  bodyFat: number | null;
  bmr: number | null;
  leanBodyMass: number | null;
  idealWeight: { min: number; max: number };
  waistToHeightRatio: number | null;
  waistToHipRatio: number | null;
  bodyFatCategory: string | null;
  bmiCategory: string | null;
}

interface BMIResultProps {
  result: {
    bmi: number;
    height: number;
    weight: number;
    age: number;
    gender: Gender;
    units: Units;
    waistCircumference?: number;
    hipCircumference?: number;
  } | null;
}

const getBMICategory = (bmi: number, age: number) => {
  if (!bmi) return null;

  // Adjust BMI for older adults
  let adjustedBMI = bmi;
  if (age > 65) adjustedBMI *= 0.95;

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
    ? (1.20 * bmi) + (0.23 * age) - 16.2
    : (1.20 * bmi) + (0.23 * age) - 5.4;
};

const getBodyFatCategory = (bodyFat: number, gender: Gender) => {
  if (!bodyFat) return null;

  if (gender === 'male') {
    if (bodyFat < 6) return 'Essential fat';
    if (bodyFat < 14) return 'Athletic';
    if (bodyFat < 18) return 'Fitness';
    if (bodyFat < 25) return 'Average';
    return 'Obese';
  } else {
    if (bodyFat < 14) return 'Essential fat';
    if (bodyFat < 21) return 'Athletic';
    if (bodyFat < 25) return 'Fitness';
    if (bodyFat < 32) return 'Average';
    return 'Obese';
  }
};

const calculateBMR = (weight: number, height: number, age: number, gender: Gender, units: Units) => {
  if (!weight || !height || !age) return null;

  const weightKg = units === 'metric' ? weight : weight * 0.453592;
  const heightCm = units === 'metric' ? height : height * 2.54;

  return gender === 'male'
    ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
};

const calculateIdealWeight = (height: number, units: Units) => {
  const heightM = units === 'metric' ? height / 100 : height * 0.0254;
  const min = 18.5 * heightM * heightM;
  const max = 25 * heightM * heightM;
  return { min, max };
};

const calculateWaistToHeightRatio = (waist: number | undefined, height: number, units: Units) => {
  if (!waist) return null;
  const waistCm = units === 'metric' ? waist : waist * 2.54;
  const heightCm = units === 'metric' ? height : height * 2.54;
  return waistCm / heightCm;
};

const calculateWaistToHipRatio = (waist: number | undefined, hip: number | undefined, units: Units) => {
  if (!waist || !hip) return null;
  const waistCm = units === 'metric' ? waist : waist * 2.54;
  const hipCm = units === 'metric' ? hip : hip * 2.54;
  return waistCm / hipCm;
};

const getWaistHipCategory = (ratio: number, gender: Gender) => {
  if (!ratio) return null;
  if (gender === 'male') {
    return ratio > 0.9 ? 'High risk' : 'Low risk';
  } else {
    return ratio > 0.85 ? 'High risk' : 'Low risk';
  }
};

export default function BMIResult({ result }: BMIResultProps) {
  const [metrics, setMetrics] = useState<HealthMetrics | null>(null);

  useEffect(() => {
    if (result && result.bmi) {
      const bodyFat = calculateBodyFat(result.bmi, result.age, result.gender);
      const bmr = calculateBMR(result.weight, result.height, result.age, result.gender, result.units);
      const idealWeight = calculateIdealWeight(result.height, result.units);
      const waistToHeightRatio = calculateWaistToHeightRatio(result.waistCircumference, result.height, result.units);
      const waistToHipRatio = calculateWaistToHipRatio(result.waistCircumference, result.hipCircumference, result.units);

      const weightInKg = result.units === 'metric'
        ? result.weight
        : result.weight * 0.453592;

      const leanBodyMass = bodyFat !== null
        ? weightInKg - (weightInKg * (bodyFat / 100))
        : null;

      setMetrics({
        bodyFat,
        bmr,
        leanBodyMass,
        idealWeight,
        waistToHeightRatio,
        waistToHipRatio,
        bodyFatCategory: bodyFat ? getBodyFatCategory(bodyFat, result.gender) : null,
        bmiCategory: getBMICategory(result.bmi, result.age)?.category || null,
      });
    }
  }, [result]);

  if (!result || !result.bmi) return null;

  const bmiCategory = getBMICategory(result.bmi, result.age);
  const displayHeight = result.units === 'metric'
    ? `${result.height} cm`
    : `${Math.floor(result.height / 12)} ft ${Math.round(result.height % 12)} in`;

  const displayWeight = result.units === 'metric'
    ? `${result.weight} kg`
    : `${result.weight} lbs`;

  const displayIdealWeight = (weight: number) => {
    return result?.units === 'metric'
      ? `${weight.toFixed(1)} kg`
      : `${(weight * 2.20462).toFixed(1)} lbs`;
  };

  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5) return '#f59e0b'; // Yellow
    if (bmi < 25) return '#10b981';   // Green
    if (bmi < 30) return '#f59e0b';   // Yellow
    if (bmi < 35) return '#f97316';   // Orange
    return '#ef4444';                 // Red
  };

  const getBodyFatColor = (bodyFat: number | null, gender: Gender) => {
    if (!bodyFat) return '#6b7280';
    
    if (gender === 'male') {
      if (bodyFat < 14) return '#10b981';   // Green (athletic)
      if (bodyFat < 20) return '#a3e635';   // Lime (fitness)
      if (bodyFat < 25) return '#f59e0b';   // Yellow (average)
      return '#ef4444';                    // Red (obese)
    } else {
      if (bodyFat < 21) return '#10b981';   // Green (athletic)
      if (bodyFat < 25) return '#a3e635';   // Lime (fitness)
      if (bodyFat < 32) return '#f59e0b';   // Yellow (average)
      return '#ef4444';                    // Red (obese)
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <h3 className="text-xl font-semibold mb-6">Your Health Metrics</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* BMI Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium">Body Mass Index (BMI)</h4>
            {bmiCategory && (
              <span className={`px-3 py-1 text-sm rounded-full text-white ${bmiCategory.color}`}>
                {bmiCategory.category}
              </span>
            )}
          </div>

          <div className="flex items-center">
            <div className="w-24 h-24 mr-4">
              <CircularProgressbar
                value={Math.min(result.bmi, 40)}
                maxValue={40}
                text={`${result.bmi.toFixed(1)}`}
                styles={buildStyles({
                  pathColor: getBMIColor(result.bmi),
                  textColor: '#1f2937',
                  trailColor: '#e5e7eb',
                  textSize: '24px',
                })}
              />
            </div>
            <div className="text-sm text-gray-600">
              <p>Height: {displayHeight}</p>
              <p>Weight: {displayWeight}</p>
              <p>Age: {result.age} years</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-medium text-blue-800 mb-2">Healthy BMI Range</h5>
            <p className="text-sm text-blue-700">
              18.5 - 25 (adjusted for age {result.age > 65 ? 'over 65' : 'under 65'})
            </p>
          </div>

          {metrics?.idealWeight && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-medium text-green-800 mb-1">Ideal Weight Range</h5>
              <p className="text-sm text-green-700">
                {displayIdealWeight(metrics.idealWeight.min)} - {displayIdealWeight(metrics.idealWeight.max)}
              </p>
            </div>
          )}
        </div>

        {/* Body Composition Section */}
        <div className="space-y-4">
          {metrics?.bodyFat && (
            <>
              <h4 className="text-lg font-medium">Body Composition</h4>
              <div className="flex items-center">
                <div className="w-24 h-24 mr-4">
                  <CircularProgressbar
                    value={metrics.bodyFat}
                    text={`${metrics.bodyFat.toFixed(1)}%`}
                    styles={buildStyles({
                      pathColor: getBodyFatColor(metrics.bodyFat, result.gender),
                      textColor: '#1f2937',
                      trailColor: '#e5e7eb',
                      textSize: '20px',
                    })}
                  />
                </div>
                <div className="text-sm text-gray-600">
                  <p>Category: {metrics.bodyFatCategory}</p>
                  {metrics.leanBodyMass && (
                    <p>Lean Mass: {metrics.leanBodyMass.toFixed(1)} kg</p>
                  )}
                  {metrics.bmr && (
                    <p>BMR: {metrics.bmr} kcal/day</p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Waist Measurements */}
          {(metrics?.waistToHeightRatio || metrics?.waistToHipRatio) && (
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h5 className="font-medium text-yellow-800 mb-2">Waist Measurements</h5>
              {metrics.waistToHeightRatio && (
                <p className="text-sm text-yellow-700 mb-1">
                  Waist-to-Height: {metrics.waistToHeightRatio.toFixed(2)} (Healthy &lt; 0.5)
                </p>
              )}
              {metrics.waistToHipRatio && (
                <p className="text-sm text-yellow-700">
                  Waist-to-Hip: {metrics.waistToHipRatio.toFixed(2)} (
                  {getWaistHipCategory(metrics.waistToHipRatio, result.gender)})
                </p>
              )}
            </div>
          )}

          {/* Health Recommendations */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h5 className="font-medium text-purple-800 mb-2">Recommendations</h5>
            <ul className="text-sm text-purple-700 list-disc pl-5 space-y-1">
              {bmiCategory?.category.includes('Thinness') && (
                <li>Consider consulting a nutritionist for healthy weight gain</li>
              )}
              {bmiCategory?.category.includes('Overweight') && (
                <li>Moderate exercise 3-5 times per week recommended</li>
              )}
              {bmiCategory?.category.includes('Obese') && (
                <li>Consult with a healthcare provider for weight management</li>
              )}
              {metrics?.bodyFat && metrics.bodyFat > (result.gender === 'male' ? 25 : 32) && (
                <li>Focus on body fat reduction through diet and exercise</li>
              )}
              {metrics?.waistToHeightRatio && metrics.waistToHeightRatio > 0.5 && (
                <li>Consider reducing abdominal fat for better health</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Detailed Information */}
      <div className="mt-8 border-t pt-6">
        <h4 className="text-lg font-medium mb-3">Understanding Your Results</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
          <div>
            <h5 className="font-medium text-gray-800 mb-1">BMI Categories</h5>
            <ul className="space-y-1">
              <li className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                <span>Normal: 18.5 - 24.9</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                <span>Overweight: 25 - 29.9</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                <span>Obese: 30+</span>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-800 mb-1">Body Fat Guidelines</h5>
            <ul className="space-y-1">
              <li>Men: Athletic 6-13%, Fitness 14-17%, Average 18-24%</li>
              <li>Women: Athletic 14-20%, Fitness 21-24%, Average 25-31%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}