// This is the Hero component which is for the landing page.
import { useEffect, useState } from "react";
import { SignedIn } from "@clerk/clerk-react"; // Clerk
import { ArrowRight, Sparkles, Users, TrendingUp } from "lucide-react"; // Icons
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'; // Icons
import Team from "./Team"; // Team Component
import AOS from 'aos'; // AOS
import 'aos/dist/aos.css';

// Images
const heroImages = [
  "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=300&fit=crop"
];

// Logos of Company
const logos = [
  { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/500px-Microsoft_logo_%282012%29.svg.png" },
  { name: "Apple", url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Meta", url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "Netflix", url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { name: "Tesla", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/1200px-Tesla_logo.png" },
  { name: "Infosys", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/600px-Infosys_logo.svg.png" },
  { name: "Tata", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/677px-Tata_logo.svg.png?20190613192255" },
  { name: "Barista", url: "https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Barista_%28company%29.svg/450px-Barista_%28company%29.svg.png?20240817014613" },
  { name: "Adobe", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Adobe_Corporate_logo.svg/768px-Adobe_Corporate_logo.svg.png" }
];

// Stars(rating)
function renderStars(count = 5, rating = 5) {
  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      className={`w-5 h-5 transition-all duration-300 ${index < rating
        ? 'text-yellow-400 fill-yellow-400 drop-shadow-sm'
        : 'text-gray-300'
        }`}
    />
  ));
}

// Testimonials- id,rating,text,name,role,company,image,gradient
const testimonials = [
  {
    id: 1,
    rating: 5,
    text: "What really stood out was the personalized career advice. It helped me improve my resume and prepare for interviews. The platform's AI-driven matching system is incredible!",
    name: "Leslie Alexander",
    role: "Senior React Developer",
    company: "TechFlow Solutions",
    image: "https://www.auraui.com/memeimage/man2.jpg",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    rating: 5,
    text: "We filled a key role within days using this platform. The quality of applicants was impressive, and the dashboard made managing candidates effortless. Game-changer for our HR team!",
    name: "Jacob Jones",
    role: "Head of Digital Marketing",
    company: "Growth Dynamics",
    image: "https://www.auraui.com/memeimage/man1.jpg",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    rating: 5,
    text: "This platform helped me land my dream job in less than two weeks. The application process was seamless, and I loved how it matched me with roles that perfectly fit my experience and aspirations.",
    name: "Chris Johnson",
    role: "Senior Product Manager",
    company: "Innovation Labs",
    image: "https://www.auraui.com/memeimage/boy1.jpeg",
    gradient: "from-green-500 to-emerald-500"
  }
];

// Acheievements
const stats = [
  { icon: Users, value: "50K+", label: "Active Users" },
  { icon: TrendingUp, value: "95%", label: "Success Rate" },
  { icon: Sparkles, value: "1M+", label: "Jobs Posted" }
];

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // AOS initialization
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  /// This is for mobile view in which arrow function is there in which next and previous arrows are there. 
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isAnimating]);
  const nextTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };
  const prevTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // This is for movement of images.
  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 overflow-hidden"
        style={{ width: '100vw', minWidth: '100vw', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', position: 'relative' }}>
        {/* Background Blur Bubbles */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10rem] right-[-10rem] w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-[-10rem] left-[-10rem] w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-10 animate-pulse delay-2000" />
        </div>
        <div className="relative z-10 w-full px-0 py-16 sm:py-24 lg:py-32">
          <div className="w-full">
            <div data-aos="fade-left" className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Content */}
              <div className={`text-center ml-5 lg:text-left transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm mb-6">
                  <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                  #1 Career Platform
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                  Transform your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-pulse">
                    Journey
                  </span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-8 max-w-lg mx-auto lg:mx-0">
                  The only way to do great work is to{" "}
                  <span className="text-cyan-300 font-medium">love what you do</span>
                </p>
                <SignedIn>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                    <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-base lg:text-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:scale-105">
                      Browse Jobs <ArrowRight className="inline-block ml-2 w-4 h-4" />
                    </button>
                    <button className="px-6 py-3 bg-white/10 border border-white/30 text-white rounded-xl text-base lg:text-lg font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105">
                      Post Job <ArrowRight className="inline-block ml-2 w-4 h-4" />
                    </button>
                  </div>
                </SignedIn>
                <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto lg:mx-0">
                  {stats.map((s, i) => (
                    <div key={i} className="text-center lg:text-left">
                      <div className="flex justify-center lg:justify-start mb-2">
                        <s.icon className="text-cyan-400 w-5 h-5 lg:w-6 lg:h-6" />
                      </div>
                      <div className="text-lg lg:text-2xl font-bold text-white">{s.value}</div>
                      <div className="text-xs lg:text-sm text-white/60">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Images */}
              <div className="transition-all mr-6 duration-1000">
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl mb-4">
                  <img
                    src={heroImages[currentImageIndex]}
                    alt="Hero"
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-1000" />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {heroImages.map((_, idx) => (
                      <button
                        key={idx}
                        aria-label={`Image ${idx + 1}`}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? "bg-white" : "bg-white/40"} transition-all duration-300 hover:scale-125`} />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  {heroImages.slice(1, 4).map((img, i) => (
                    <div key={i} className="aspect-square overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                      <img
                        src={img}
                        alt={`Thumbnail ${i}`}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onClick={() => setCurrentImageIndex(i + 1)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Logo Strip */}
        <div className="relative z-10 w-full bg-white/5 backdrop-blur border-t border-white/10 py-6 lg:py-8">
          <div data-aos="fade-right" className="w-full px-4 sm:px-6 lg:px-8">
            <p className="text-center text-white/60 mb-4 lg:mb-6 text-sm lg:text-base">Trusted by top companies</p>
            <div className="w-full overflow-hidden">
              <div className="flex gap-8 lg:gap-12 justify-center items-center flex-wrap lg:flex-nowrap">
                {logos.map((logo, idx) => (
                  <img
                    key={idx}
                    src={logo.url}
                    alt={logo.name}
                    loading="lazy"
                    className="h-6 lg:h-8 object-contain filter brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Scrolling Animation */}
        <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
      </section>
      {/* Team Component*/}
      <Team />
      <section className="py-20 w-full bg-gradient-to-br from-blue-800 via-blue-900 to-slate-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>
        <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Header Section Of the Testimonial */}
          <div data-aos="flip-up" className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gray-800/90 backdrop-blur-sm rounded-full border border-gray-700/50 mb-6">
              <span className="text-sm font-medium text-white">
                ⭐ Trusted by 100+ professionals
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-pink-500 mb-6 leading-tight">
              What Our
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"> Happy Clients </span>
              Say
            </h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Real stories from real people who transformed their careers with us
            </p>
          </div>
          {/* Main Testimonial Showcase */}
          <div className="relative">
            {/* Rainbow gradient background */}
            <div className="absolute -inset-x-4 inset-y-8 md:-inset-x-8 md:-inset-y-12">
              <div className="w-full h-full max-w-6xl mx-auto rounded-3xl opacity-20 blur-2xl"
                style={{
                  background: "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
                }}>
              </div>
            </div>
            {/* Desktop Grid Layout */}
            <div data-aos="flip-down" className="hidden lg:block">
              <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`group relative transform transition-all duration-700 hover:scale-105 ${index === 1 ? 'lg:scale-110 lg:-translate-y-4' : ''}`}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-200">
                      {/* Gradient top bar */}
                      <div className={`h-1 bg-gradient-to-r ${testimonial.gradient}`}></div>

                      <div className="p-8">
                        {/* Quote icon */}
                        <div className="mb-6">
                          <Quote className="w-8 h-8 text-gray-400 opacity-60" />
                        </div>
                        {/* Stars */}
                        <div className="flex items-center gap-1 mb-6">
                          {renderStars(5, testimonial.rating)}
                        </div>
                        {/* Testimonial text */}
                        <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 font-medium">
                          "{testimonial.text}"
                        </blockquote>
                        {/* Author info */}
                        <div className="flex items-center">
                          <div className="relative">
                            <img
                              className="w-14 h-14 rounded-full object-cover ring-4 ring-white shadow-lg"
                              src={testimonial.image}
                              alt={testimonial.name} />
                            <div className={`absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r ${testimonial.gradient} rounded-full border-2 border-white`}></div>
                          </div>
                          <div className="ml-4">
                            <p className="font-bold text-gray-900 text-lg">{testimonial.name}</p>
                            <p className="text-gray-600 font-medium">{testimonial.role}</p>
                            <p className="text-gray-500 text-sm">{testimonial.company}</p>
                          </div>
                        </div>
                      </div>
                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Mobile Carousel */}
            <div className="lg:hidden">
              <div data-aos="flip-up" className="relative max-w-sm mx-auto">
                <div className={`transition-transform duration-500 ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-200">
                    <div className={`h-1 bg-gradient-to-r ${testimonials[currentIndex].gradient}`}></div>
                    <div className="p-8">
                      <div className="mb-6">
                        <Quote className="w-8 h-8 text-gray-400 opacity-60" />
                      </div>
                      <div className="flex items-center gap-1 mb-6">
                        {renderStars(5, testimonials[currentIndex].rating)}
                      </div>
                      <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 font-medium">
                        "{testimonials[currentIndex].text}"
                      </blockquote>
                      <div className="flex items-center">
                        <div className="relative">
                          <img
                            className="w-14 h-14 rounded-full object-cover ring-4 ring-white shadow-lg"
                            src={testimonials[currentIndex].image}
                            alt={testimonials[currentIndex].name} />
                          <div className={`absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r ${testimonials[currentIndex].gradient} rounded-full border-2 border-white`}></div>
                        </div>
                        <div className="ml-4">
                          <p className="font-bold text-gray-900 text-lg">{testimonials[currentIndex].name}</p>
                          <p className="text-gray-600 font-medium">{testimonials[currentIndex].role}</p>
                          <p className="text-gray-500 text-sm">{testimonials[currentIndex].company}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Navigation buttons */}
                <button onClick={prevTestimonial}
                  className="absolute left-4 top-1/2 -translate-y-1/2 -translate-x-full w-12 h-12 bg-gray-800/90 backdrop-blur-sm rounded-full border border-gray-700/50 flex items-center justify-center text-white hover:bg-gray-700/90 transition-all duration-300 hover:scale-110">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={nextTestimonial}
                className="absolute right-4 top-1/2 -translate-y-1/2 translate-x-full w-12 h-12 bg-gray-800/90 backdrop-blur-sm rounded-full border border-gray-700/50 flex items-center justify-center text-white hover:bg-gray-700/90 transition-all duration-300 hover:scale-110">
                  <ChevronRight className="w-6 h-6" />
                </button>
                {/* Dots indicator */}
                <div className="flex justify-center mt-8 gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                        ? 'bg-gray-800 scale-125'
                        : 'bg-gray-400 hover:bg-gray-600'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
