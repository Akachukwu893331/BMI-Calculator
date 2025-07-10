// src/components/about/ProfileCard.tsx
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

export default function ProfileCard() {
  return (
    <div className="max-w-4xl mx-auto mt-14 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg overflow-hidden md:flex md:p-0 transform transition-all hover:scale-[1.01] hover:shadow-xl">
      {/* Profile Image Section */}
      <div className="md:w-1/3 relative h-64 md:h-auto">
        <Image
          src="/fit-woman-smartphone.png"
          alt="Chinemerem Promise Aleke"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover md:object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:bg-gradient-to-r md:from-black/30 md:to-transparent" />
      </div>

      {/* Profile Content Section */}
      <div className="p-8 md:p-10 md:w-2/3 space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Aleke Akachukwu Akuma</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-indigo-800 bg-indigo-100 rounded-full">
              Front-end Developer
            </span>
            <span className="inline-block px-2 py-1 text-xs font-semibold text-purple-800 bg-purple-100 rounded-full">
              Computer Science
            </span>
          </div>
        </div>

        <p className="text-gray-600 leading-relaxed">
          Final Year Computer Science student at EBSU with a passion for creating beautiful, accessible, and performant web experiences. 
          Currently focused on React ecosystems and modern CSS architectures.
        </p>

        <div className="pt-2">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Education</h2>
          <p className="text-gray-700 mt-1">Ebonyi State University (EBSU) - B.Sc Computer Science</p>
          <p className="text-sm text-gray-500">Expected Graduation: 2025</p>
        </div>

        {/* Social Links */}
        <div className="pt-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Connect</h2>
          <div className="flex gap-4 mt-3">
            <a 
              href="https://github.com/username" 
              aria-label="GitHub profile"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com/in/username" 
              aria-label="LinkedIn profile"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://twitter.com/username" 
              aria-label="Twitter profile"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
            <a 
              href="mailto:your.email@example.com" 
              aria-label="Email"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <FaEnvelope className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}