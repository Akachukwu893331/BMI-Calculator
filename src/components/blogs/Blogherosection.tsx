// src/components/blog/BlogComingSoon.tsx
import Image from 'next/image';
import { FiClock, FiMail } from 'react-icons/fi';
import { FaAppleAlt, FaWeight, FaHeartbeat } from 'react-icons/fa';

export default function BlogComingSoon() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 text-center">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full mb-5">
          <FiClock className="mr-2" />
          Launching Soon
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Healthy Living <span className="text-blue-600">Blog</span>
        </h1>
        <p className="text-lg text-gray-600">
          Practical guides on BMI, weight management, and nutritious eating
        </p>
      </div>

      {/* Focus Areas */}
      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <FaWeight className="text-blue-600 text-xl" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">BMI Insights</h3>
          <p className="text-gray-600 text-sm">
            Understanding your Body Mass Index and what it means for your health
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <FaHeartbeat className="text-green-600 text-xl" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Weight Loss</h3>
          <p className="text-gray-600 text-sm">
            Sustainable strategies for healthy weight management
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <FaAppleAlt className="text-yellow-600 text-xl" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Healthy Foods</h3>
          <p className="text-gray-600 text-sm">
            Nutrient-rich foods that support your wellness goals
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <FiMail className="text-purple-600 text-xl" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Get Updates</h3>
          <p className="text-gray-600 text-sm">
            Be notified when we launch with exclusive content
          </p>
        </div>
      </div>

      {/* Email Signup */}
      <div className="bg-blue-50 rounded-xl p-8 max-w-md mx-auto">
        <h3 className="font-bold text-gray-800 mb-3">Join the waitlist</h3>
        <p className="text-gray-600 text-sm mb-4">
          Get early access to our health guides and BMI resources
        </p>
        <form className="flex">
          <input
            type="email"
            placeholder="Your email"
            className="flex-grow px-4 py-3 rounded-l-lg border border-r-0 focus:outline-none focus:ring-1 focus:ring-blue-300"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-3 rounded-r-lg hover:bg-blue-700 transition"
          >
            Notify Me
          </button>
        </form>
      </div>

      {/* Simple Image */}
      <div className="mt-12 relative h-96 rounded-lg overflow-hidden">
        <Image
          src="/healthly.jpg"
          alt="Healthy lifestyle"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end p-6">
          <span className="text-white font-medium">Healthy Living Starts Here</span>
        </div>
      </div>
    </div>
  );
}