import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ClipboardList, 
  TrendingUp, 
  Users, 
  Clock, 
  Bell, 
  BarChart3, 
  Shield, 
  Smartphone, 
  FileText, 
  Calendar, 
  Settings,
  Zap,
  Target,
  Globe,
  Database,
  ArrowRight,
  Star,
  PlayCircle
} from 'lucide-react';

// Enhanced Header Component
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white shadow-sm'
    } border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Project Manager
              </Link>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Home
            </Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Dashboard
            </Link>
            <Link to="/features" className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium">
              Features
            </Link>
            <Link to="/support" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Support
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">ProjectFlow</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Streamline your project management with our comprehensive tool. 
              Track progress, manage tasks, and boost team productivity.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/dev-harshhh19" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
              <a href="https://in.linkedin.com/in/harshad-nikam-311734281" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z"/></svg>
              </a>
              <a href="https://instagram.com/dev.harshhh19/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.775.13 4.602.388 3.635 1.355 2.668 2.322 2.41 3.495 2.352 4.772.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.058 1.277.316 2.45 1.283 3.417.967.967 2.14 1.225 3.417 1.283C8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 1.277-.058 2.45-.316 3.417-1.283.967-.967 1.225-2.14 1.283-3.417.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.058-1.277-.316-2.45-1.283-3.417-.967-.967-2.14-1.225-3.417-1.283C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
              <a href="https://twitter.com/not_harshad_19/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
            </div>
            <div className="mt-4 text-gray-400 text-xs">
              <div>Email: <a href="mailto:nikamharshadshivaji@gmail.com" className="hover:text-white">nikamharshadshivaji@gmail.com</a></div>
              <div>Phone: <a href="tel:+919156633238" className="hover:text-white">+91 9156633238</a></div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/dashboard" className="text-gray-300 hover:text-blue-400 transition">Dashboard</a></li>
              <li><a href="/features" className="text-gray-300 hover:text-blue-400 transition">Features</a></li>
              <li><a href="/support" className="text-gray-300 hover:text-blue-400 transition">Support</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/privacy-policy" className="text-gray-300 hover:text-blue-400 transition">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="text-gray-300 hover:text-blue-400 transition">Terms of Service</a></li>
              <li><a href="/cookie-policy" className="text-gray-300 hover:text-blue-400 transition">Cookie Policy</a></li>
              <li><a href="/user-agreement" className="text-gray-300 hover:text-blue-400 transition">User Agreement</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li><a href="mailto:nikamharshadshivaji@gmail.com" className="text-gray-300 hover:text-blue-400 transition">Email</a></li>
              <li><a href="tel:+919156633238" className="text-gray-300 hover:text-blue-400 transition">Phone</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} ProjectFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

const Features = () => {
  const [isVisible, setIsVisible] = useState({});

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const coreFeatures = [
    {
      title: "Smart Project Management",
      description: "Create, organize, and track projects with intelligent workflows. Set priorities, deadlines, and automate status updates.",
      icon: <ClipboardList className="w-8 h-8" />,
      color: "blue",
      stats: "500+ Projects Managed"
    },
    {
      title: "Collaborative Workspaces",
      description: "Create shared workspaces for teams to collaborate, share files, and communicate in real-time.",
      icon: <Users className="w-8 h-8" />,
      color: "green",
      stats: "100+ Teams Onboarded"
    },
    {
      title: "Intelligent Time Tracking",
      description: "Automatically track time spent on tasks and projects. Generate insightful reports for better productivity.",
      icon: <Clock className="w-8 h-8" />,
      color: "purple",
      stats: "5000+ Hours Tracked"
    },
    {
      title: "Advanced Progress Tracking",
      description: "Utilize Gantt charts, Kanban boards, and custom dashboards to visualize project progress and identify bottlenecks.",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "yellow",
      stats: "95% Project Success Rate"
    },
    {
      title: "Automated Notifications",
      description: "Stay informed with automated alerts for deadlines, task assignments, and project updates.",
      icon: <Bell className="w-8 h-8" />,
      color: "red",
      stats: "10k+ Notifications Sent"
    },
    {
      title: "In-depth Analytics",
      description: "Gain actionable insights with comprehensive analytics on project performance, team productivity, and resource allocation.",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "indigo",
      stats: "50+ Pre-built Reports"
    }
  ];

  const advancedFeatures = [
    { title: "AI-Powered Task Prioritization", description: "Leverage AI to automatically prioritize tasks based on urgency, impact, and dependencies.", icon: <Zap /> },
    { title: "Goal Setting & OKRs", description: "Align your team around strategic objectives with integrated Goal and OKR tracking.", icon: <Target /> },
    { title: "Multi-Platform Accessibility", description: "Access your projects on the go with our fully-featured web, desktop, and mobile applications.", icon: <Smartphone /> },
    { title: "Enterprise-Grade Security", description: "Protect your data with SSO, multi-factor authentication, and advanced security protocols.", icon: <Shield /> },
    { title: "Custom Integrations", description: "Connect with your favorite tools through our extensive API and integration library.", icon: <Settings /> },
    { title: "Resource Management", description: "Optimize resource allocation and workload balancing to prevent team burnout.", icon: <Users /> },
    { title: "Cross-Functional Roadmaps", description: "Visualize and coordinate complex projects across multiple teams with shared roadmaps.", icon: <Globe /> },
    { title: "Budgeting & Financials", description: "Track project budgets, expenses, and profitability in real-time.", icon: <Database /> },
    { title: "Document Management", description: "Store, share, and collaborate on project documents with version control.", icon: <FileText /> },
    { title: "Calendar Sync", description: "Sync project deadlines and milestones with your favorite calendar app.", icon: <Calendar /> }
  ];

  const testimonials = [
    { name: "Alex Johnson", company: "Innovate Inc.", quote: "This tool has revolutionized our workflow. We're more organized and productive than ever before.", rating: 5 },
    { name: "Samantha Lee", company: "Creative Solutions", quote: "The analytics features are a game-changer. We can now make data-driven decisions with confidence.", rating: 5 },
    { name: "Michael Chen", company: "TechForward", quote: "A must-have for any remote team. The collaboration features are seamless and intuitive.", rating: 5 }
  ];

  const FeatureCard = ({ feature }) => (
    <div 
      data-animate 
      id={`feature-${feature.title}`}
      className={`bg-white rounded-2xl shadow-lg p-8 transform hover:-translate-y-2 transition-transform duration-300 ${isVisible[`feature-${feature.title}`] ? 'animate-fade-in-up' : 'opacity-0'}`}>
      <div className={`w-16 h-16 bg-${feature.color}-100 text-${feature.color}-600 rounded-2xl flex items-center justify-center mb-6`}>
        {feature.icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
      <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>
      <div className={`text-sm font-semibold text-${feature.color}-600 bg-${feature.color}-50 px-3 py-1 rounded-full inline-block`}>
        {feature.stats}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 text-gray-800">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section 
          data-animate 
          id="hero"
          className={`text-center py-20 px-4 bg-white ${isVisible['hero'] ? 'animate-fade-in' : 'opacity-0'}`}>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Everything you need to ship
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">faster and better</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Our project management platform is designed to help your team achieve its full potential with a comprehensive suite of powerful and intuitive features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2">
              <span>Get Started Free</span>
              <ArrowRight size={20} />
            </Link>
            <Link to="/demo" className="bg-white border-2 border-gray-300 text-gray-800 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2">
              <PlayCircle size={20} />
              <span>Watch Demo</span>
            </Link>
          </div>
        </section>

        {/* Core Features Section */}
        <section id="core-features" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Features</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The essential tools to manage your projects from start to finish with unmatched efficiency.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {coreFeatures.map((feature, index) => <FeatureCard key={index} feature={feature} />)}
            </div>
          </div>
        </section>

        {/* Advanced Features Section */}
        <section id="advanced-features" className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Unlock Your Potential with Advanced Features</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Supercharge your workflow with enterprise-grade tools designed for scalability, security, and integration.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {advancedFeatures.map((feature, index) => (
                <div 
                  key={index}
                  data-animate 
                  id={`advanced-${index}`}
                  className={`p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 ${isVisible[`advanced-${index}`] ? 'animate-fade-in-up' : 'opacity-0'}`}>
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Loved by Teams Worldwide</h2>
              <p className="text-lg text-gray-600">Don't just take our word for it. Here's what our users are saying.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  data-animate 
                  id={`testimonial-${index}`}
                  className={`bg-white p-8 rounded-2xl shadow-lg ${isVisible[`testimonial-${index}`] ? 'animate-fade-in-up' : 'opacity-0'}`}>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
                  </div>
                  <p className="text-gray-700 italic mb-6">\"{testimonial.quote}\"</p>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="bg-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-2xl shadow-2xl">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Workflow?</h2>
            <p className="text-lg opacity-90 mb-8">
              Join thousands of teams who are building better products, faster. Start your free trial today and experience the future of project management.
            </p>
            <Link to="/dashboard" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-300">
              Start Your Free Trial
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
