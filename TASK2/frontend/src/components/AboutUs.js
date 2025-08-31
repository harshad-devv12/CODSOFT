import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Target, Users, Lightbulb, TrendingUp, Handshake } from 'lucide-react';

// Placeholder team members data
const teamMembers = [
  { name: 'Harshad Nikam', role: 'Founder & CEO', image: 'https://avatars.githubusercontent.com/u/142901963?v=4' },
  // Add more team members here
];

// Main About Us Component
const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header could be a shared component */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Project Manager
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
              <Link to="/features" className="text-gray-700 hover:text-blue-600">Features</Link>
              <Link to="/about" className="text-blue-600 font-semibold">About Us</Link>
              <Link to="/support" className="text-gray-700 hover:text-blue-600">Support</Link>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-white py-20 px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">About Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are a passionate team dedicated to building the future of project management.
          </p>
        </section>

        {/* Mission and Vision */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                To empower teams of all sizes to achieve their goals by providing an intuitive, powerful, and collaborative project management platform.
              </p>
              <p className="text-lg text-gray-600">
                We believe that the right tools can transform how people work together, fostering innovation and driving success.
              </p>
            </div>
            <div className="text-center">
              <Target size={120} className="mx-auto text-blue-500" />
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center p-6">
                <Lightbulb size={48} className="mx-auto text-yellow-500 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">We constantly seek new and better ways to solve problems and deliver value to our users.</p>
              </div>
              <div className="text-center p-6">
                <TrendingUp size={48} className="mx-auto text-green-500 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Customer Success</h3>
                <p className="text-gray-600">Our customers are at the heart of everything we do. Their success is our success.</p>
              </div>
              <div className="text-center p-6">
                <Handshake size={48} className="mx-auto text-purple-500 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Integrity</h3>
                <p className="text-gray-600">We believe in being transparent, honest, and ethical in all of our interactions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Meet the Team</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {teamMembers.map(member => (
                <div key={member.name} className="text-center">
                  <img src={member.image} alt={member.name} className="w-40 h-40 rounded-full mx-auto mb-4 shadow-lg" />
                  <h4 className="text-xl font-bold">{member.name}</h4>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer could be a shared component */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Project Manager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;

