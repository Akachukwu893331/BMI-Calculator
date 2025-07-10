// components/WorldHealthHero.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function WorldHealthHero() {
  return (
    <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Subtle animated dots */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/world-map-dotted.png"
            alt="World Map"
            fill
            className="object-cover mix-blend-screen"
          />
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-purple-900/50 to-indigo-950/80" />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-teal-400/20"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: Math.random() * 10 + 2,
              height: Math.random() * 10 + 2,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">
        {/* Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
          >
            Global Health <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400">
              Intelligence
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-lg md:text-xl text-white/90 max-w-xl mx-auto lg:mx-0"
          >
            Discover your BMI, body fat percentage, ideal weight, and receive real-time personalized health guidance. One step toward a healthier you.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-medium bg-gradient-to-r from-teal-400 to-emerald-500 text-indigo-900 hover:shadow-lg hover:shadow-teal-400/30 transition-all duration-300 hover:-translate-y-1"
            >
              Start Health Analysis
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-medium border-2 border-white/20 hover:border-teal-300/50 text-white hover:text-teal-300 transition-all duration-300 hover:-translate-y-1"
            >
              Learn More
            </Link>
          </motion.div>
          
          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm text-white/70"
          >
            <div className="flex items-center gap-2">
              
              <span>Trusted by 10k+ users</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/30" />
            <div className="flex items-center gap-2">
              <GlobeIcon className="w-5 h-5 text-teal-300" />
              <span>Available in 15+ countries</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Visual */}
        <div className="lg:w-1/2 relative flex justify-center items-center min-h-[400px]">
          {/* Main 3D device mockup */}
          <motion.div
            initial={{ rotateY: 30, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
          >
            <Image
              src="/fit-woman-smartphone.png"
              alt="Health app dashboard"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>

          {/* Floating metrics */}
          <FloatingMetric 
            icon={<ActivityIcon className="w-6 h-6" />} 
            value="24.1" 
            label="BMI" 
            className="top-10 left-4 lg:left-10 bg-indigo-600/80" 
            delay={0.3}
          />
          <FloatingMetric 
            icon={<HeartPulseIcon className="w-6 h-6" />} 
            value="98%" 
            label="Health Score" 
            className="bottom-10 left-4 lg:left-10 bg-teal-600/80" 
            delay={0.4}
          />
          <FloatingMetric 
            icon={<ScaleIcon className="w-6 h-6" />} 
            value="18%" 
            label="Body Fat" 
            className="top-1/3 -right-2 lg:right-10 bg-purple-600/80" 
            delay={0.5}
          />
        </div>
      </div>

      {/* Animated wave divider */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-16 md:h-24"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            className="fill-current text-indigo-800"
          ></path>
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
            className="fill-current text-indigo-700"
          ></path>
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            className="fill-current text-teal-500/30"
          ></path>
        </svg>
      </div>
    </section>
  );
}

// Floating metric component
function FloatingMetric({
  icon,
  value,
  label,
  className,
  delay,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`absolute backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/10 ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-white/10">
          {icon}
        </div>
        <div>
          <div className="text-xl font-bold">{value}</div>
          <div className="text-xs opacity-80">{label}</div>
        </div>
      </div>
    </motion.div>
  );
}

// Icons (replace with your actual icon components)
function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function ActivityIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function HeartPulseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
    </svg>
  );
}

function ScaleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  );
}