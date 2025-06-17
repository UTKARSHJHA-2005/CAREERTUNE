import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const members = [
  {
    name: "Kekky Cooper",
    role: "Marketing Specialist",
    image: "https://www.haggar.com/dw/image/v2/BBND_PRD/on/demandware.static/-/Sites-master-catalog-haggar/default/dw3556a576/images/hi-res/HC90897_251.jpg?sw=446&sh=641&sm=cut",
  },
  {
    name: "Annette Black",
    role: "Marketing Manager",
    image: "https://images.pexels.com/photos/32542461/pexels-photo-32542461.jpeg",
  },
  {
    name: "Darrell Steward",
    role: "Director of Marketing",
    image: "https://img.freepik.com/free-photo/plus-size-man-lifestyle_23-2151662670.jpg",
  },
  {
    name: "Marvin McKinney",
    role: "CFO",
    image: "https://images.pexels.com/photos/61120/pexels-photo-61120.jpeg",
  },
];

const Team = () => {
  // AOS initialization
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <section className="relative py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 sm:py-20 lg:py-24 xl:py-28 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>
      {/* Heading of the Testimonial */}
      <div data-aos="flip-left" className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Our Exclusive
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">
              Advisors
            </span>
          </h2>
          <p className="mt-6 text-lg font-normal leading-8 text-blue-100 lg:text-xl lg:mt-8 lg:leading-9">
            We have great experienced advisors who have experienced a great battle in life.
          </p>
          <div className="mt-8 w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-300 mx-auto rounded-full"></div>
        </div>
      </div>
      {/* Adivisors */}
      <div data-aos="flip-right" className="relative grid px-6 mx-auto max-w-7xl grid-cols-1 gap-8 pt-12 mt-12 sm:mt-16 lg:mt-20 lg:grid-cols-2 xl:grid-cols-4">
        {members.map((member, index) => (
          <div key={index} className={`group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-blue-500/25 ${index % 2 === 0 ? "hover:-rotate-1" : "hover:rotate-1"}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-t-3xl">
                <img className="object-cover w-full h-full transition-all duration-700 group-hover:scale-110 group-hover:rotate-2" src={member.image}
                  alt={member.name} width={320} height={400} />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent"></div>
              </div>
              <div className="relative p-6 bg-gradient-to-br from-blue-800/50 to-indigo-900/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-blue-200 group-hover:text-white transition-colors duration-300">
                    {member.role}
                  </p>
                  <div className="mt-3 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-300 group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;