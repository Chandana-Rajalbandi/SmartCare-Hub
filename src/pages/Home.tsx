import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Pill as Pills, Truck, Clock, Shield, Activity, HeartPulse, Stethoscope } from 'lucide-react';
import heroProductsImage from '../assets/medicine/hero-products.svg';
import { MEDICINES } from '../services/medicineService';

const featuredProducts = MEDICINES.slice(0, 4);

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="md:flex md:items-center md:space-x-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Your Health, Our Priority
              </h1>
              <p className="text-lg md:text-xl mb-8 text-blue-100">
                Get AI-powered diagnosis based on your symptoms and have medicines delivered to your doorstep.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/diagnosis"
                  className="btn bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold flex items-center justify-center transition-colors duration-300"
                >
                  <Stethoscope className="mr-2 h-5 w-5" />
                  Check Symptoms
                </Link>
                <Link
                  to="/medicines"
                  className="btn bg-blue-800 text-white hover:bg-blue-900 px-6 py-3 rounded-lg font-semibold flex items-center justify-center transition-colors duration-300"
                >
                  <Pills className="mr-2 h-5 w-5" />
                  Browse Medicines
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-8 text-center">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-2xl font-bold">30 min</p>
                  <p className="text-sm text-blue-100">fast delivery</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-2xl font-bold">10+</p>
                  <p className="text-sm text-blue-100">featured products</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-2xl font-bold">AI</p>
                  <p className="text-sm text-blue-100">guided support</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <img src={heroProductsImage} alt="Medicine products showcase" className="rounded-2xl shadow-2xl w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How MediCare Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A simple three-step process to get diagnosed and receive your medications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-xl p-6 text-center transform transition-transform duration-300 hover:scale-105">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Describe Your Symptoms</h3>
              <p className="text-gray-600">
                Tell us about your health conditions and symptoms through our interactive form.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 text-center transform transition-transform duration-300 hover:scale-105">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Get AI Diagnosis</h3>
              <p className="text-gray-600">
                Our AI analyzes your symptoms and provides potential diagnoses with recommended medications.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 text-center transform transition-transform duration-300 hover:scale-105">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Get Medicines Delivered</h3>
              <p className="text-gray-600">
                Order the recommended medicines and get them delivered to your door in as little as 30 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Products</h2>
              <p className="text-gray-600">Added product visuals so the project looks more complete and easier to explain.</p>
            </div>
            <Link to="/medicines" className="text-blue-600 font-medium hover:text-blue-800">
              View all medicines →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="h-52 bg-gray-50">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 mb-2">{product.category}</p>
                  <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{product.dosage}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-800">${product.price.toFixed(2)}</span>
                    <Link to="/medicines" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose MediCare</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We combine advanced AI technology with fast medicine delivery services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<HeartPulse className="h-6 w-6 text-blue-600" />}
              title="Accurate Diagnosis"
              description="Our AI is trained on millions of medical cases to provide precise symptom analysis."
            />
            <FeatureCard
              icon={<Clock className="h-6 w-6 text-blue-600" />}
              title="Fast Delivery"
              description="Get your essential medicines delivered within 30 minutes in select areas."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6 text-blue-600" />}
              title="Secure & Private"
              description="Your health data is encrypted and protected with the highest security standards."
            />
            <FeatureCard
              icon={<Pills className="h-6 w-6 text-blue-600" />}
              title="Wide Medicine Range"
              description="Access to a growing catalogue of daily healthcare and wellness products."
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to take control of your health?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of users who trust MediCare for their healthcare needs.
          </p>
          <Link
            to="/diagnosis"
            className="inline-block bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300"
          >
            Start Your Health Check Now
          </Link>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;
