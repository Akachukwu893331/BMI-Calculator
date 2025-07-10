'use client';

import { motion } from 'framer-motion';
import { Info, Scale, Ruler, HeartPulse, AlertCircle } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-teal-400 mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-indigo-400 mix-blend-multiply filter blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Content */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-600"
            >
              <Info className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Health Knowledge</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900"
            >
              Understanding <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600">BMI</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="prose prose-lg text-gray-600 max-w-3xl"
            >
              <p>
                Body Mass Index (BMI) is a simple calculation using a person&apos;s height and weight. The
                formula is <span className="font-semibold text-gray-800">BMI = kg/m<sup>2</sup></span> where kg is a person&apos;s weight in kilograms and m<sup>2</sup> is
                their height in meters squared.
              </p>
              <p>
                A BMI of 25.0 or more is overweight, while the healthy range is 18.5 to 24.9. BMI
                applies to most adults 18-65 years.
              </p>
            </motion.div>

            {/* Interactive BMI scale */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">BMI Categories</h3>
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                <div className="h-full flex">
                  <div className="bg-blue-500 w-1/6" title="Underweight (&lt;18.5)"></div>
                  <div className="bg-green-500 w-4/6" title="Normal (18.5-24.9)"></div>
                  <div className="bg-yellow-500 w-1/6" title="Overweight (25-29.9)"></div>
                  <div className="bg-red-500 w-1/6" title="Obese (≥30)"></div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Underweight</span>
                <span>Healthy</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
            </motion.div>
          </div>

          {/* Right column - Visual elements */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {/* Feature cards */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-teal-100 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center mb-4">
                <Scale className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Weight Consideration</h3>
              <p className="text-sm text-gray-600">Takes into account your current weight in kilograms for precise calculation.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-100 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center mb-4">
                <Ruler className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Height Measurement</h3>
              <p className="text-sm text-gray-600">Incorporates your height in meters squared for accurate results.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-purple-100 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center mb-4">
                <HeartPulse className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Health Indicator</h3>
              <p className="text-sm text-gray-600">Provides a quick snapshot of your weight category and potential health risks.</p>
            </div>

            <div className="bg-gradient-to-br from-teal-500 to-indigo-600 p-6 rounded-xl shadow-lg text-white">
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Limitations</h3>
              <p className="text-sm text-white/90">BMI doesn&apos;t account for muscle mass, bone density, or fat distribution.</p>
            </div>
          </motion.div>
        </div>

        {/* Additional info section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-indigo-50 rounded-2xl p-8 md:p-10 border border-indigo-100"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-indigo-900 mb-4">BMI is just one measure</h3>
            <p className="text-indigo-800">
              While BMI is a useful screening tool, it&apos;s not diagnostic of body fatness or health. 
              Consider waist circumference, body composition, and other health markers for a complete picture. 
              Always consult with a healthcare provider for health assessments.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
