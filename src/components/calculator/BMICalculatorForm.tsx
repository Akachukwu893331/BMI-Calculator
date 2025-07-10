"use client";

import { useState, useEffect } from 'react';
import Modal from '@/components/calculator/Modal';
import { getActivityLevelDescription, ActivityLevel, getActivityLevelLabel, activityLevels } from '@/components/calculator/activity';

type Units = 'metric' | 'imperial';
type Gender = 'male' | 'female';

interface BMICalculatorFormProps {
  onCalculate: (data: {
    height: number;
    weight: number;
    age: number;
    gender: Gender;
    units: Units;
    activityLevel?: ActivityLevel;
    waistCircumference?: number;
    hipCircumference?: number;
  }) => void;
  resetResult: () => void;
  units: Units;
  setUnits: (units: Units) => void;
}

export default function BMICalculatorForm({
  onCalculate,
  resetResult,
  units,
  setUnits,
}: BMICalculatorFormProps) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender>('male');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderately_active');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [resultDisplayed, setResultDisplayed] = useState(false);

  const [selectedHeightUnit, setSelectedHeightUnit] = useState('cm');
  const [selectedWeightUnit, setSelectedWeightUnit] = useState('kg');

  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [showRefreshPrompt, setShowRefreshPrompt] = useState(false);
  const [autoRefreshNotice, setAutoRefreshNotice] = useState('');
  const [refreshTimeout, setRefreshTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleInteraction = () => setLastInteraction(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastInteraction > 30000 && !showRefreshPrompt && resultDisplayed) {
        setShowRefreshPrompt(true);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [lastInteraction, showRefreshPrompt, resultDisplayed]);

  useEffect(() => {
    return () => {
      if (refreshTimeout) clearTimeout(refreshTimeout);
    };
  }, [refreshTimeout]);

  const refreshForm = () => {
    setAge('');
    setHeight('');
    setWeight('');
    setFeet('');
    setInches('');
    setWaist('');
    setHip('');
    setActivityLevel('moderately_active');
    setGender('male');
    setShowAdvanced(false);
    setResultDisplayed(false);
    resetResult();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleInteraction();

    const parsedAge = parseInt(age);
    const parsedWaist = waist ? parseFloat(waist) : undefined;
    const parsedHip = hip ? parseFloat(hip) : undefined;
    let finalHeight: number;
    let finalWeight: number;

    // Convert height
    if (selectedHeightUnit === 'cm') {
      finalHeight = parseFloat(height);
    } else if (selectedHeightUnit === 'm') {
      finalHeight = parseFloat(height) * 100;
    } else if (selectedHeightUnit === 'in') {
      finalHeight = parseFloat(height) * 2.54;
    } else {
      finalHeight = ((parseInt(feet) || 0) * 12 + (parseInt(inches) || 0)) * 2.54;
    }

    // Convert weight
    if (selectedWeightUnit === 'kg') {
      finalWeight = parseFloat(weight);
    } else if (selectedWeightUnit === 'lbs') {
      finalWeight = parseFloat(weight) * 0.453592;
    } else {
      finalWeight = ((parseInt(feet) || 0) * 14 + (parseInt(inches) || 0)) * 0.453592;
    }

    if (!finalWeight || !finalHeight || !parsedAge) {
      setModalMessage('Please fill in all required fields with valid numbers.');
      setShowModal(true);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResultDisplayed(true);
      onCalculate({
        height: finalHeight,
        weight: finalWeight,
        age: parsedAge,
        gender,
        units,
        activityLevel,
        waistCircumference: parsedWaist,
        hipCircumference: parsedHip,
      });
    }, 1000);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto" onClick={handleInteraction}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">BMI & Health Calculator</h2>
        <p className="text-gray-600">Get a comprehensive analysis of your body mass index and health metrics</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Age (years) <span className="text-red-500">*</span></label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
              min="1"
              max="120"
              placeholder="e.g. 32"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Gender <span className="text-red-500">*</span></label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`flex-1 py-3 px-4 rounded-lg border transition-all ${gender === 'male' ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`flex-1 py-3 px-4 rounded-lg border transition-all ${gender === 'female' ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
              >
                Female
              </button>
            </div>
          </div>

          {/* Weight */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Weight <span className="text-red-500">*</span></label>
            <div className="flex gap-2">
              <select
                value={selectedWeightUnit}
                onChange={(e) => setSelectedWeightUnit(e.target.value)}
                className="w-1/3 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
                <option value="st+lbs">st+lbs</option>
              </select>
              {selectedWeightUnit === 'kg' || selectedWeightUnit === 'lbs' ? (
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder={`Weight in ${selectedWeightUnit}`}
                  step="0.1"
                />
              ) : (
                <div className="flex gap-2 flex-1">
                  <input
                    type="number"
                    value={feet}
                    onChange={(e) => setFeet(e.target.value)}
                    placeholder="Stone"
                    className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                  <input
                    type="number"
                    value={inches}
                    onChange={(e) => setInches(e.target.value)}
                    placeholder="Pounds"
                    className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Height */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Height <span className="text-red-500">*</span></label>
            <div className="flex gap-2">
              <select
                value={selectedHeightUnit}
                onChange={(e) => setSelectedHeightUnit(e.target.value)}
                className="w-1/3 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="cm">cm</option>
                <option value="m">m</option>
                <option value="in">in</option>
                <option value="ft+in">ft+in</option>
              </select>
              {selectedHeightUnit === 'cm' || selectedHeightUnit === 'm' || selectedHeightUnit === 'in' ? (
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder={`Height in ${selectedHeightUnit}`}
                  step="0.1"
                />
              ) : (
                <div className="flex gap-2 flex-1">
                  <input
                    type="number"
                    value={feet}
                    onChange={(e) => setFeet(e.target.value)}
                    placeholder="Feet"
                    className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                  <input
                    type="number"
                    value={inches}
                    onChange={(e) => setInches(e.target.value)}
                    placeholder="Inches"
                    className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Activity Level */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Activity Level</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              {activityLevels.map((level) => (
                <option key={level} value={level}>
                  {getActivityLevelLabel(level)}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1 italic">
              {getActivityLevelDescription(activityLevel)}
            </p>
          </div>

          {/* Unit System */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Measurement System</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setUnits('metric')}
                className={`flex-1 py-3 px-4 rounded-lg border transition-all ${units === 'metric' ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
              >
                Metric
              </button>
              <button
                type="button"
                onClick={() => setUnits('imperial')}
                className={`flex-1 py-3 px-4 rounded-lg border transition-all ${units === 'imperial' ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
              >
                Imperial
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2 italic">
              Metric (kg, cm) is commonly used worldwide. Imperial (lbs, ft/in) is mostly used in the US.
            </p>
          </div>
        </div>

        {/* Advanced Options */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg
              className={`w-4 h-4 mr-2 transition-transform ${showAdvanced ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
          </button>

          {showAdvanced && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-fadeIn">
              <h4 className="font-medium text-gray-700 mb-3">Body Measurements</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Waist Circumference ({units === 'metric' ? 'cm' : 'in'})
                  </label>
                  <input
                    type="number"
                    value={waist}
                    onChange={(e) => setWaist(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder={units === 'metric' ? 'e.g. 85' : 'e.g. 33'}
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hip Circumference ({units === 'metric' ? 'cm' : 'in'})
                  </label>
                  <input
                    type="number"
                    value={hip}
                    onChange={(e) => setHip(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder={units === 'metric' ? 'e.g. 95' : 'e.g. 37'}
                    step="0.1"
                    disabled={gender === 'male'}
                  />
                  {gender === 'male' && (
                    <p className="text-xs text-gray-500 mt-1">Hip measurement is typically only used for female calculations</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Calculating...
              </>
            ) : (
              'Calculate BMI & Health Metrics'
            )}
          </button>
        </div>
      </form>

      {/* Auto Refresh Notice */}
      {autoRefreshNotice && (
        <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">{autoRefreshNotice}</p>
            </div>
          </div>
        </div>
      )}

      {/* Input Error Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-300">Input Error</h3>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-600">{modalMessage}</p>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              onClick={() => setShowModal(false)}
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      </Modal>

      {/* Inactivity Modal */}
      <Modal show={showRefreshPrompt} onClose={() => setShowRefreshPrompt(false)}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-red-100">Inactivity Detected</h3>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-100">
              You've been inactive for 30 seconds. Would you like to refresh the form to start over?
            </p>
          </div>
          <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setShowRefreshPrompt(false);
                setAutoRefreshNotice('Form will auto-refresh in 2 minute.');
                const timeout = setTimeout(() => {
                  refreshForm();
                  setAutoRefreshNotice('');
                }, 12000);
                setRefreshTimeout(timeout);
              }}
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm transition-colors"
            >
              No, keep data
            </button>
            <button
              onClick={() => {
                setShowRefreshPrompt(false);
                setAutoRefreshNotice('Refreshing in 10 seconds...');
                const timeout = setTimeout(() => {
                  refreshForm();
                  setAutoRefreshNotice('');
                }, 10000);
                setRefreshTimeout(timeout);
              }}
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm transition-colors"
            >
              Yes, refresh
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}