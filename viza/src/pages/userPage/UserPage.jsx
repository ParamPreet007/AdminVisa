"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Globe, Users, Award, Clock, CheckCircle, ArrowRight, Plane, Star } from "lucide-react"

export default function VisaLandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 4000)

    // Mouse tracking for parallax effect
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      clearInterval(interval)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const countries = [
    { name: "USA", flag: "🇺🇸", visaTypes: ["Work", "Study", "Tourist"], color: "from-red-400 to-blue-600" },
    { name: "Canada", flag: "🇨🇦", visaTypes: ["Express Entry", "Study", "Visit"], color: "from-red-500 to-red-600" },
    {
      name: "Australia",
      flag: "🇦🇺",
      visaTypes: ["Skilled", "Student", "Tourist"],
      color: "from-blue-500 to-green-500",
    },
    { name: "UK", flag: "🇬🇧", visaTypes: ["Work", "Study", "Visit"], color: "from-blue-600 to-red-500" },
    { name: "Germany", flag: "🇩🇪", visaTypes: ["Work", "Study", "Business"], color: "from-yellow-400 to-red-500" },
    { name: "New Zealand", flag: "🇳🇿", visaTypes: ["Skilled", "Study", "Work"], color: "from-blue-500 to-green-600" },
  ]

  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Visa Services",
      description: "Expert assistance for visa applications to 50+ countries worldwide",
      features: ["Document Preparation", "Application Filing", "Interview Coaching"],
      gradient: "from-blue-500 to-purple-600",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Immigration Consultation",
      description: "Personalized guidance from certified immigration consultants",
      features: ["Eligibility Assessment", "Strategy Planning", "Legal Advice"],
      gradient: "from-green-500 to-blue-600",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Success Guarantee",
      description: "98% success rate with money-back guarantee on visa approvals",
      features: ["Quality Assurance", "Refund Policy", "Success Tracking"],
      gradient: "from-purple-500 to-pink-600",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      country: "Canada PR",
      rating: 5,
      text: "Excellent service! Got my Canada PR in just 8 months. The team was very professional and guided me through every step.",
      avatar: "👩‍💼",
    },
    {
      name: "Raj Patel",
      country: "Australia Work Visa",
      rating: 5,
      text: "Amazing experience! They helped me secure my Australian work visa quickly. Highly recommend their services.",
      avatar: "👨‍💻",
    },
    {
      name: "Maria Garcia",
      country: "UK Study Visa",
      rating: 5,
      text: "Professional and reliable. Got my UK student visa approved without any hassle. Thank you for the excellent support!",
      avatar: "👩‍🎓",
    },
  ]

  const stats = [
    { number: "15,000+", label: "Successful Applications", icon: "📊" },
    { number: "50+", label: "Countries Covered", icon: "🌍" },
    { number: "98%", label: "Success Rate", icon: "✅" },
    { number: "24/7", label: "Support Available", icon: "🕐" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Animated Background with Parallax */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-float-slow"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            top: "10%",
            left: "10%",
          }}
        ></div>
        <div
          className="absolute w-80 h-80 bg-gradient-to-r from-green-200/30 to-blue-200/30 rounded-full blur-3xl animate-float-reverse"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
            top: "60%",
            right: "10%",
          }}
        ></div>
        <div
          className="absolute w-64 h-64 bg-gradient-to-r from-yellow-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse-slow"
          style={{
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
            bottom: "20%",
            left: "20%",
          }}
        ></div>
      </div>

      {/* Floating Icons */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-4xl animate-bounce-slow">✈️</div>
        <div className="absolute top-40 right-20 text-3xl animate-spin-slow">🌍</div>
        <div className="absolute bottom-32 left-1/4 text-2xl animate-pulse">📋</div>
        <div className="absolute bottom-20 right-1/3 text-3xl animate-bounce">🎯</div>
        <div className="absolute top-1/2 left-1/2 text-2xl animate-wiggle">📍</div>
      </div>

      {/* Header with Slide Down Animation */}
      <header className="relative z-10 bg-white/80 backdrop-blur-sm shadow-sm animate-slide-down">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2 animate-fade-in-left">
              <Globe className="w-8 h-8 text-blue-600 animate-spin-slow" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GlobalVisa Pro
              </span>
            </div>
            <div className="hidden md:flex space-x-8 animate-fade-in-right">
              <a
                href="#services"
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-110"
              >
                Services
              </a>
              <a
                href="#countries"
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-110"
              >
                Countries
              </a>
             
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-pulse-button">
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section with Staggered Animations */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-zoom-in">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-gradient">
                Your Gateway to
              </span>
              <br />
              <span className="text-gray-800 animate-slide-up-delayed">Global Opportunities</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in-up-slow">
              Expert visa consultation services for work, study, and immigration to 50+ countries worldwide. Turn your
              dreams into reality with our proven success rate.
            </p>

         
            {/* Animated Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center animate-count-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="text-4xl mb-2 animate-bounce-gentle">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-number-roll">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 mt-2 animate-fade-in-up">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Countries Section with Card Animations */}
      <section id="countries" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-slide-in-left">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-slide-in-right">
              We provide visa services for the world's most sought-after destinations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {countries.map((country, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 p-6 border border-gray-100 animate-card-slide-up group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-bounce-gentle group-hover:animate-spin-once">
                    {country.flag}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 animate-fade-in">{country.name}</h3>
                  <div className="space-y-2">
                    {country.visaTypes.map((type, typeIndex) => (
                      <span
                        key={typeIndex}
                        className={`inline-block bg-gradient-to-r ${country.color} text-white px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2 animate-tag-appear hover:scale-110 transition-transform duration-300`}
                        style={{ animationDelay: `${typeIndex * 100}ms` }}
                      >
                        {type} Visa
                      </span>
                    ))}
                  </div>
                  <button className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-button-glow">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with Advanced Animations */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-text-reveal">
              Our Expert Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-delayed">
              Comprehensive visa and immigration services tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-1 p-8 border border-gray-100 animate-service-card group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div
                  className={`text-white mb-6 p-3 rounded-full bg-gradient-to-r ${service.gradient} w-fit animate-icon-bounce group-hover:animate-spin-once`}
                >
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 animate-slide-in-left">{service.title}</h3>
                <p className="text-gray-600 mb-6 animate-fade-in">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-700 animate-list-item"
                      style={{ animationDelay: `${featureIndex * 100}ms` }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 animate-check-mark" />
                      {feature}
                    </li>
                  ))}
                </ul>
               
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section with Timeline Animation */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-slide-down">
              Simple 4-Step Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-delayed">
              From consultation to visa approval, we make the process seamless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Free Consultation",
                desc: "Discuss your goals and assess eligibility",
                icon: <Users className="w-8 h-8" />,
                color: "from-blue-500 to-blue-600",
              },
              {
                step: "02",
                title: "Document Preparation",
                desc: "We help prepare all required documents",
                icon: <Clock className="w-8 h-8" />,
                color: "from-green-500 to-green-600",
              },
              {
                step: "03",
                title: "Application Filing",
                desc: "Submit your application with expert guidance",
                icon: <Plane className="w-8 h-8" />,
                color: "from-purple-500 to-purple-600",
              },
              {
                step: "04",
                title: "Visa Approval",
                desc: "Celebrate your success and plan your journey",
                icon: <Award className="w-8 h-8" />,
                color: "from-pink-500 to-pink-600",
              },
            ].map((process, index) => (
              <div
                key={index}
                className="text-center animate-process-step"
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <div
                  className={`bg-gradient-to-r ${process.color} rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg text-white animate-step-circle hover:animate-pulse-ring`}
                >
                  {process.icon}
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2 animate-number-appear">{process.step}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 animate-slide-in">{process.title}</h3>
                <p className="text-gray-600 animate-fade-in-up">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with Carousel Animation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-text-glow">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-delayed">
              Hear from our satisfied clients who achieved their dreams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1 animate-testimonial-card group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-6xl mb-4 animate-bounce-gentle group-hover:animate-wave">{testimonial.avatar}</div>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current animate-star-twinkle"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic animate-text-type">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-gray-800 animate-slide-in-left">{testimonial.name}</div>
                  <div className="text-blue-600 animate-slide-in-right">{testimonial.country}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Pulsing Animation */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 animate-gradient-shift">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-text-glow-white">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 animate-fade-in-up">
            Join thousands of successful applicants who trusted us with their visa applications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-cta-buttons">
            
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 animate-button-glow-white">
              Call Now: 8968248709
            </button>
          </div>
        </div>
      </section>

      {/* Footer with Slide Up Animation */}
      <footer className="bg-gray-900 text-white py-12 animate-slide-up-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="animate-fade-in-left">
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="w-8 h-8 text-blue-400 animate-spin-slow" />
                <span className="text-2xl font-bold">GlobalVisa Pro</span>
              </div>
              <p className="text-gray-400">Your trusted partner for global visa and immigration services.</p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors duration-300">Work Visas</li>
                <li className="hover:text-white transition-colors duration-300">Study Visas</li>
                <li className="hover:text-white transition-colors duration-300">Tourist Visas</li>
                <li className="hover:text-white transition-colors duration-300">Immigration</li>
              </ul>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
              <h3 className="text-lg font-semibold mb-4">Countries</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors duration-300">USA</li>
                <li className="hover:text-white transition-colors duration-300">Canada</li>
                <li className="hover:text-white transition-colors duration-300">Australia</li>
                <li className="hover:text-white transition-colors duration-300">UK</li>
              </ul>
            </div>
            <div className="animate-fade-in-right" style={{ animationDelay: "600ms" }}>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors duration-300">+1-800-VISA-PRO</li>
                <li className="hover:text-white transition-colors duration-300">info@globalvisapro.com</li>
                <li className="hover:text-white transition-colors duration-300">24/7 Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 animate-fade-in">
            <p>&copy; 2024 GlobalVisa Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        /* Custom Animations */
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-5deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }
        
        @keyframes slide-down {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fade-in-left {
          from { transform: translateX(-50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fade-in-right {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes zoom-in {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes slide-up-delayed {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fade-in-up-slow {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slide-up-stagger {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes slide-right {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        
        @keyframes fade-in-delayed {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes count-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes number-roll {
          from { transform: rotateX(90deg); }
          to { transform: rotateX(0deg); }
        }
        
        @keyframes fade-in-up {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slide-in-left {
          from { transform: translateX(-30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slide-in-right {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes card-slide-up {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes spin-once {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes tag-appear {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes button-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.8); }
        }
        
        @keyframes text-reveal {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes service-card {
          from { transform: translateY(60px) rotateY(45deg); opacity: 0; }
          to { transform: translateY(0) rotateY(0deg); opacity: 1; }
        }
        
        @keyframes icon-bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-5px) scale(1.1); }
        }
        
        @keyframes check-mark {
          from { transform: scale(0) rotate(0deg); }
          to { transform: scale(1) rotate(360deg); }
        }
        
        @keyframes list-item {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes button-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        
        @keyframes arrow-bounce {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
        
        @keyframes process-step {
          from { transform: translateY(50px) scale(0.8); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        
        @keyframes step-circle {
          from { transform: scale(0) rotate(0deg); }
          to { transform: scale(1) rotate(360deg); }
        }
        
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
        
        @keyframes number-appear {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes slide-in {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
          50% { text-shadow: 0 0 20px rgba(59, 130, 246, 0.8); }
        }
        
        @keyframes testimonial-card {
          from { transform: translateY(40px) rotateX(45deg); opacity: 0; }
          to { transform: translateY(0) rotateX(0deg); opacity: 1; }
        }
        
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(10deg); }
          75% { transform: rotate(-10deg); }
        }
        
        @keyframes star-twinkle {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
        
        @keyframes text-type {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes text-glow-white {
          0%, 100% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.5); }
          50% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.8); }
        }
        
        @keyframes cta-buttons {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes button-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes button-glow-white {
          0%, 100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.5); }
          50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.8); }
        }
        
        @keyframes slide-up-footer {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        
        @keyframes pulse-button {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        /* Animation Classes */
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 8s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-wiggle { animation: wiggle 2s ease-in-out infinite; }
        .animate-slide-down { animation: slide-down 0.8s ease-out; }
        .animate-fade-in-left { animation: fade-in-left 1s ease-out; }
        .animate-fade-in-right { animation: fade-in-right 1s ease-out; }
        .animate-zoom-in { animation: zoom-in 1.2s ease-out; }
        .animate-gradient { 
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-slide-up-delayed { animation: slide-up-delayed 1s ease-out 0.5s both; }
        .animate-fade-in-up-slow { animation: fade-in-up-slow 1s ease-out 0.8s both; }
        .animate-slide-up-stagger { animation: slide-up-stagger 1s ease-out 1s both; }
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        .animate-slide-right { animation: slide-right 1s ease-in-out infinite; }
        .animate-fade-in-delayed { animation: fade-in-delayed 1s ease-out 1.2s both; }
        .animate-count-up { animation: count-up 0.8s ease-out both; }
        .animate-number-roll { animation: number-roll 0.6s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.8s ease-out; }
        .animate-card-slide-up { animation: card-slide-up 0.8s ease-out both; }
        .animate-spin-once { animation: spin-once 0.6s ease-out; }
        .animate-tag-appear { animation: tag-appear 0.5s ease-out both; }
        .animate-button-glow { animation: button-glow 2s ease-in-out infinite; }
        .animate-text-reveal { animation: text-reveal 1s ease-out; }
        .animate-service-card { animation: service-card 1s ease-out both; }
        .animate-icon-bounce { animation: icon-bounce 2s ease-in-out infinite; }
        .animate-check-mark { animation: check-mark 0.5s ease-out; }
        .animate-list-item { animation: list-item 0.6s ease-out both; }
        .animate-button-shake { animation: button-shake 0.5s ease-in-out; }
        .animate-arrow-bounce { animation: arrow-bounce 1s ease-in-out infinite; }
        .animate-process-step { animation: process-step 0.8s ease-out both; }
        .animate-step-circle { animation: step-circle 0.8s ease-out; }
        .animate-pulse-ring:hover { animation: pulse-ring 1s ease-out; }
        .animate-number-appear { animation: number-appear 0.6s ease-out; }
        .animate-slide-in { animation: slide-in 0.6s ease-out; }
        .animate-text-glow { animation: text-glow 2s ease-in-out infinite; }
        .animate-testimonial-card { animation: testimonial-card 1s ease-out both; }
        .animate-wave { animation: wave 1s ease-in-out; }
        .animate-star-twinkle { animation: star-twinkle 1s ease-in-out infinite both; }
        .animate-text-type { animation: text-type 2s ease-out; }
        .animate-gradient-shift { 
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }
        .animate-text-glow-white { animation: text-glow-white 2s ease-in-out infinite; }
        .animate-cta-buttons { animation: cta-buttons 1s ease-out; }
        .animate-button-pulse { animation: button-pulse 2s ease-in-out infinite; }
        .animate-button-glow-white { animation: button-glow-white 2s ease-in-out infinite; }
        .animate-slide-up-footer { animation: slide-up-footer 1s ease-out; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-pulse-button { animation: pulse-button 2s ease-in-out infinite; }
      `}</style>
    </div>
  )
}
