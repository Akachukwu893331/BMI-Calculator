// ✅ Server component — no "use client" here
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalculatorClient from '@/components/calculator/CalculatorClient';

export const metadata = {
  title: 'BMI Calculator | HealthMetrics',
  description: 'Calculate your BMI and get personalized health recommendations',
};

export default function CalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="max-w-4xl mx-auto py-10 px-4 flex-grow">
        <h2 className="text-3xl font-bold text-center mb-8">BMI Calculator</h2>
        <CalculatorClient />
      </main>
      <Footer />
    </div>
  );
}
