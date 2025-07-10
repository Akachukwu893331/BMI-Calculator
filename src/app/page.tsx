// pages/index.tsx
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>HealthMetrics | BMI Calculator & Health Tracker</title>
        <meta name="description" content="Calculate your BMI and get personalized health recommendations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}