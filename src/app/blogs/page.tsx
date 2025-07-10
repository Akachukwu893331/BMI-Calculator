import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogheroSection from '@/components/blogs/Blogherosection';

export default function AboutPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-800">
      <Header />
      <div className="max-w-4xl mx-auto space-y-10">
        <BlogheroSection />
      </div>
      <Footer />
    </div>
  );
}
