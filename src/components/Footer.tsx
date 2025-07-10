// components/Footer.tsx
import { FaHeartbeat, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <FaHeartbeat className="text-red-500 text-2xl mr-2" />
              <h3 className="text-xl font-bold text-gray-800">HealthMetrics</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Your comprehensive health tracking and BMI calculation tool.
            </p>
            <div className="flex space-x-4">
              <link href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <FaFacebook className="w-5 h-5" />
              </link>
              <link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaTwitter className="w-5 h-5" />
              </link>
              <link href="#" className="text-gray-400 hover:text-pink-600 transition-colors">
                <FaInstagram className="w-5 h-5" />
              </link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <link href="/" className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                  Home
                </link>
              </li>
              <li>
                <link href="/calculator" className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                  BMI Calculator
                </link>
              </li>
              <li>
                <link href="#" className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                  Privacy Policy
                </link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaEnvelope className="text-gray-400 mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-600">support@healthmetrics.com</span>
              </li>
              <li className="flex items-start">
                <FaPhoneAlt className="text-gray-400 mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Stay Updated</h3>
            <p className="text-gray-600 mb-3">Subscribe to our health tips newsletter</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} HealthMetrics. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}