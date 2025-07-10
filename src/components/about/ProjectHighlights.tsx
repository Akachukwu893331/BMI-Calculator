// src/components/about/ProjectShowcase.tsx
import Image from 'next/image';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaFigma } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript } from 'react-icons/si';

export default function ProjectShowcase() {
  return (
    <section className="max-w-6xl mx-auto bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg overflow-hidden">
      {/* Project Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-100 bg-indigo-900/30 rounded-full mb-2">
              Final Year Project
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Web-Based BMI Calculator</h2>
            <p className="text-indigo-100 mt-1">A comprehensive health assessment tool implementing WHO standards</p>
          </div>
          <div className="flex gap-3">
            <a 
              href="https://github.com/yourusername/bmi-calculator" 
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub className="w-5 h-5" />
              <span>Code</span>
            </a>
            <a 
              href="/calculator" 
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-100 rounded-lg text-indigo-600 transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiExternalLink className="w-5 h-5" />
              <span>Live Demo</span>
            </a>
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
        {/* Project Details */}
        <div className="space-y-6">
          {/* Project Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Overview</h3>
            <p className="text-gray-700 leading-relaxed">
              Developed as my final year computer science project at EBSU, this web-based BMI Calculator provides 
              accurate body mass index calculations with comprehensive health classifications based on WHO standards. 
              The application features personalized recommendations and educational resources 
              about healthy weight management.
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="flex-shrink-0 mt-1 w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                <span className="text-gray-700">Precise BMI calculation with WHO-standard classification</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 mt-1 w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                <span className="text-gray-700">Responsive design with mobile-first approach</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 mt-1 w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                <span className="text-gray-700">Interactive charts for weight trend visualization</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 mt-1 w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                <span className="text-gray-700">Accessible interface following WCAG guidelines</span>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Technology Stack</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 rounded-lg">
                <SiNextdotjs className="w-5 h-5 text-gray-800" />
                <span className="text-sm font-medium">Next.js</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 rounded-lg">
                <FaReact className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">React</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 rounded-lg">
                <SiTypescript className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">TypeScript</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 rounded-lg">
                <SiTailwindcss className="w-5 h-5 text-cyan-500" />
                <span className="text-sm font-medium">Tailwind CSS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Screenshot */}
        <div className="relative group">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200 transform transition-all group-hover:shadow-xl">
            <Image
              src="/images/bmi-screenshot.png"
              alt="BMI Calculator Interface"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <span className="text-white font-medium">BMI Calculator Interface</span>
            </div>
          </div>
          
          {/* Design Process */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <FaFigma className="text-purple-500" />
              Design Process
            </h4>
            <p className="text-sm text-gray-600">
              The UI/UX was carefully designed in Figma with multiple iterations, focusing on intuitive 
              health data visualization and accessibility considerations for diverse users.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}