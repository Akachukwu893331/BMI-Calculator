import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIAssistantWrapper from '@/components/Ai/AIAssistantWrapper';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata = {
  title: 'AI Health Assistant | HealthMetrics',
  description: 'Get personalized health advice from your AI assistant',
};

export default function AssistantPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ScrollToTop />
      <Header />
      <main className="max-w-4xl w-full mx-auto py-12 px-4 flex-grow">
        <AIAssistantWrapper />
      </main>
      <Footer />
    </div>
  );
}