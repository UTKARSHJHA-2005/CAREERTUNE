import React, { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Users, TrendingUp } from "lucide-react";

const heroImages = [
  "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=300&fit=crop"
];

const logos = [
  { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "Apple", url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Meta", url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "Netflix", url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" }
];

const stats = [
  { icon: Users, value: "50K+", label: "Active Users" },
  { icon: TrendingUp, value: "95%", label: "Success Rate" },
  { icon: Sparkles, value: "1M+", label: "Jobs Posted" }
];

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 overflow-hidden" style={{width: '100vw', minWidth: '100vw', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', position: 'relative'}}>
      {/* Background Blur Bubbles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10rem] right-[-10rem] w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-[-10rem] left-[-10rem] w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-10 animate-pulse delay-2000" />
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className={`text-center lg:text-left transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
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

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-base lg:text-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:scale-105">
                  Browse Jobs <ArrowRight className="inline-block ml-2 w-4 h-4" />
                </button>
                <button className="px-6 py-3 bg-white/10 border border-white/30 text-white rounded-xl text-base lg:text-lg font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  Post Job <ArrowRight className="inline-block ml-2 w-4 h-4" />
                </button>
              </div>

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

            {/* Right - Images */}
            <div className="transition-all duration-1000">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl mb-4">
                <img
                  src={heroImages[currentImageIndex]}
                  alt="Hero"
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-1000"
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {heroImages.map((_, idx) => (
                    <button
                      key={idx}
                      aria-label={`Image ${idx + 1}`}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? "bg-white" : "bg-white/40"} transition-all duration-300 hover:scale-125`}
                    />
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
                      onClick={() => setCurrentImageIndex(i + 1)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Strip */}
      <div className="relative z-10 w-full bg-white/5 backdrop-blur border-t border-white/10 py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-white/60 mb-4 lg:mb-6 text-sm lg:text-base">Trusted by top companies</p>
          <div className="w-full overflow-hidden">
            <div className="flex gap-8 lg:gap-12 justify-center items-center flex-wrap lg:flex-nowrap">
              {logos.map((logo, idx) => (
                <img
                  key={idx}
                  src={logo.url}
                  alt={logo.name}
                  loading="lazy"
                  className="h-6 lg:h-8 object-contain filter brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

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
  );
}