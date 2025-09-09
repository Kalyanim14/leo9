// Hero.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import i1 from "../assets/i1.png";
import i2 from "../assets/i2.png";
import i3 from "../assets/i3.png";
import i4 from "../assets/i4.png";
import i5 from "../assets/i5.png";
import i6 from "../assets/i6.png";
import i7 from "../assets/i7.png";
import i8 from "../assets/i8.png";
import i9 from "../assets/i9.png";
import i10 from "../assets/i10.png";
import i11 from "../assets/i11.png";
import i12 from "../assets/i12.png";

const Hero = ({ isDarkMode }) => {
  const dotsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // Animate dots into lion face pattern
    tl.to(dotsRef.current, {
      duration: 1,
      scale: 0.5,
      stagger: 0.05,
      ease: "power2.inOut",
    });

    tl.to(dotsRef.current, {
      duration: 1.5,
      scale: 1.2,
      x: (i) => Math.cos((i / 8) * Math.PI * 2) * 150,
      y: (i) => Math.sin((i / 8) * Math.PI * 2) * 150,
      ease: "elastic.out(1, 0.3)",
      stagger: 0.05,
    });

    tl.to(dotsRef.current, {
      duration: 1,
      scale: 1,
      x: 0,
      y: 0,
      stagger: 0.05,
    });

    return () => tl.kill();
  }, []);

  const images = [i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12]; 

  return (
    <div className={`transition-colors duration-500 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <section className="w-full h-5/6 flex flex-col lg:flex-row items-center justify-center px-6 lg:px-7 py-7">
        {/* Left Half - Lion Animation */}
        <div className="flex-1 flex justify-center items-center relative w-full h-[300px] lg:h-[400px]">
          <svg width="250" height="250" className="absolute">
            {Array.from({ length: 9 }).map((_, i) => (
              <circle
                key={i}
                ref={(el) => (dotsRef.current[i] = el)}
                cx="175"
                cy="175"
                r="8"
                fill={i === 0 ? (isDarkMode ? "white" : "black") : ["#ec4899", "#3b82f6", "#8b5cf6"][i % 3]}
                className="transition-colors duration-500"
              />
            ))}
          </svg>
        </div>

        {/* Right Half - Text */}
        <div className="flex-1 text-center lg:text-left mt-10 lg:mt-0">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Design <br /> Transform <br /> Accelerate
          </h2>
          <h1 className={`text-xl md:text-2xl lg:text-3xl mt-4 font-semibold transition-colors duration-500 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Redefining user experiences through Behavioural Science & AI
          </h1>
          
          {/* CTA Buttons */}
          
        </div>
      </section>
      
      <section className="w-full px-6 lg:px-16 py-12">
  <div className="flex flex-col lg:flex-row items-center">
    {/* Left Section - Text (1/4 of page) */}
    <div className="w-full lg:w-1/4 mb-8 lg:mb-0 lg:pr-8">
      <p className={`text-lg md:text-xl font-medium transition-colors duration-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Your trusted UI/UX design agency.
      </p>
    </div>

    {/* Right Section - Carousel (3/4 of page) */}
    <div className="w-full lg:w-3/4 overflow-hidden flex">
      {/* Vertical line */}
      <div className={`w-[6px] transition-colors duration-500 ${isDarkMode ? 'bg-white' : 'bg-black'} mr-6`}></div>

      <motion.div
        className="flex space-x-6"
        initial={{ x: 0 }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
      >
        {images.concat(images).map((src, i) => (
          <img
            key={i}
            src={src}
            alt="carousel"
            className="w-20 h-20 object-cover rounded-xl shadow-md"
          />
        ))}
      </motion.div>
    </div>
  </div>
</section>
    </div>
  );
};

export default Hero;