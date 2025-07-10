// components/FeaturesSection.tsx
'use client';

import { motion } from 'framer-motion';
import { 
  Calculator, 
  Scale, 
  Activity, 
  HeartPulse, 
  Brain, 
  MessageSquareText,
  User,
  Gauge,
  ChevronRight
} from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      title: 'BMI & Ideal Weight Calculator',
      icon: <Calculator className="w-6 h-6" />,
      color: 'text-blue-600 bg-blue-50',
      items: [
        'Height, Weight, Age, Gender inputs',
        'BMI & Category (e.g., Overweight)',
        'Ideal Weight Range calculation',
        'Age-adjusted BMI interpretation'
      ]
    },
    {
      title: 'Body Composition Analyzer',
      icon: <Scale className="w-6 h-6" />,
      color: 'text-purple-600 bg-purple-50',
      items: [
        'Body Fat % & Lean Mass',
        'Category breakdown (Athletic, Average)',
        'Gender-specific fat ranges',
        'Visual body composition chart'
      ]
    },
    {
      title: 'Health Status & Recommendations',
      icon: <HeartPulse className="w-6 h-6" />,
      color: 'text-teal-600 bg-teal-50',
      items: [
        'BMI category labeling',
        'Tailored exercise & nutrition plans',
        'Lifestyle improvement tips',
        'Priority level indicators'
      ]
    },
    {
      title: 'AI Health Assistant (coming soon)',
      icon: <Brain className="w-6 h-6" />,
      color: 'text-indigo-600 bg-indigo-50',
      items: [
        'ChatGPT-powered interface',
        'Health Q&A and guidance',
        'Voice input & text-to-speech',
        'Personalized improvement plans'
      ]
    }
  ];

  const stats = [
    { value: '10k+', label: 'Daily Calculations', icon: <Gauge className="w-5 h-5" /> },
    { value: '98%', label: 'Accuracy Rate', icon: <Activity className="w-5 h-5" /> },
    { value: '24/7', label: 'AI Support', icon: <MessageSquareText className="w-5 h-5" /> },
    { value: '15+', label: 'Health Metrics', icon: <User className="w-5 h-5" /> }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Health Analysis</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get complete insights into your body composition with our advanced health metrics and AI-powered recommendations.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all"
            >
              <div className="p-6">
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <ul className="space-y-2">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 md:p-10 text-white"
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to transform your health?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get started with our comprehensive health analysis tools and personalized recommendations today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3.5 rounded-xl font-medium bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:shadow-lg hover:shadow-blue-400/30 transition-all duration-300 hover:-translate-y-1">
              <a href="/calculator">Calculate Your BMI Now</a>
            </button>
            <button className="px-8 py-3.5 rounded-xl font-medium border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:-translate-y-1">
              <a href="/Ai">Talk to AI Assistant</a>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}