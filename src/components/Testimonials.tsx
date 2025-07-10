// components/Testimonials.tsx
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    quote: 'This BMI calculator helped me understand my health better. The personalized recommendations were spot on!',
    attribution: 'Sarah Johnson, Fitness Enthusiast',
    rating: 5
  },
  {
    id: 2,
    quote: 'As a nutritionist, I recommend this tool to all my clients. The detailed metrics provide great insights.',
    attribution: 'Dr. Michael Chen, Nutrition Specialist',
    rating: 5
  },
  {
    id: 3,
    quote: 'Tracking my BMI has never been easier. The progress charts motivate me to stay on track with my health goals.',
    attribution: 'David Wilson, Health Coach',
    rating: 4
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Health Professionals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear what experts and users say about our BMI calculator
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-200'}`} 
                  />
                ))}
              </div>
              
              <FaQuoteLeft className="text-gray-300 text-2xl mb-4" />
              
              <blockquote className="text-gray-700 text-lg leading-relaxed mb-6">
                {testimonial.quote}
              </blockquote>
              
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-12 h-12 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4">
                  {testimonial.attribution.charAt(0)}
                </div>
                <div>
                  <p className="text-gray-900 font-medium">{testimonial.attribution}</p>
                  <p className="text-sm text-gray-500">
                    {testimonial.attribution.includes('Dr.') ? 'Verified Professional' : 'Satisfied User'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}