import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="bg-gradient-to-r from-indigo-800 to-purple-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold mb-6">
          Your Health Journey Starts Now
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Discover your BMI, body fat %, ideal weight, and get real-time guidance from our AI health assistant. One step toward a healthier you.
        </p>
        <Link
          href="/calculator"
          className="inline-block bg-white text-indigo-700 font-semibold py-3 px-8 rounded-xl shadow-md hover:bg-indigo-100 transition duration-300"
        >
          Calculate My BMI
        </Link>
      </div>
    </section>
  );
}
