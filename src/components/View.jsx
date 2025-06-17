import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

// Creating stars with animation
function renderStars(count = 5, rating = 5) {
    return Array.from({ length: 5 }, (_, index) => (
        <Star
            key={index}
            className={`w-5 h-5 transition-all duration-300 ${
                index < rating 
                    ? 'text-yellow-400 fill-yellow-400 drop-shadow-sm' 
                    : 'text-gray-300'
            }`}
        />
    ));
}

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

function View() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

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

    return (
        <section className="py-20 w-full bg-gray-50 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-200/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-gray-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-gray-800/90 backdrop-blur-sm rounded-full border border-gray-700/50 mb-6">
                        <span className="text-sm font-medium text-white">
                            ⭐ Trusted by 100+ professionals
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        What Our
                        <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"> Happy Clients </span>
                        Say
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
                    <div className="hidden lg:block">
                        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {testimonials.map((testimonial, index) => (
                                <div 
                                    key={testimonial.id}
                                    className={`group relative transform transition-all duration-700 hover:scale-105 ${
                                        index === 1 ? 'lg:scale-110 lg:-translate-y-4' : ''
                                    }`}
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
                                                        alt={testimonial.name}
                                                    />
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
                        <div className="relative max-w-sm mx-auto">
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
                                                    alt={testimonials[currentIndex].name}
                                                />
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
                            <button
                                onClick={prevTestimonial}
                                className="absolute left-4 top-1/2 -translate-y-1/2 -translate-x-full w-12 h-12 bg-gray-800/90 backdrop-blur-sm rounded-full border border-gray-700/50 flex items-center justify-center text-white hover:bg-gray-700/90 transition-all duration-300 hover:scale-110"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={nextTestimonial}
                                className="absolute right-4 top-1/2 -translate-y-1/2 translate-x-full w-12 h-12 bg-gray-800/90 backdrop-blur-sm rounded-full border border-gray-700/50 flex items-center justify-center text-white hover:bg-gray-700/90 transition-all duration-300 hover:scale-110"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>

                            {/* Dots indicator */}
                            <div className="flex justify-center mt-8 gap-2">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            index === currentIndex 
                                                ? 'bg-gray-800 scale-125' 
                                                : 'bg-gray-400 hover:bg-gray-600'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default View;