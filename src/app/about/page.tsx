import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutCard from '@/components/about/AboutCard';

import ProjectHighlights from '@/components/about/ProjectHighlights';


export default function AboutPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-800">
      <Header />
      <div className="max-w-4xl mx-auto space-y-10">
        <AboutCard />
        <ProjectHighlights />
      </div>
      <Footer />
    </div>
  );
}
