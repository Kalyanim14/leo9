"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sling as Hamburger } from "hamburger-react";
import gsap from "gsap";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const btnRef = useRef(null);
  const textRef = useRef(null);
  const mobileBtnRef = useRef(null);
  const mobileTextRef = useRef(null);

  useEffect(() => {
    const animateHover = (btn, text) => {
      const handleEnter = () => {
        gsap.to(text, {
          y: -40, // move up out of view
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(text, { y: 40 }); // reset below
            gsap.to(text, {
              y: 0, // move back to center
              duration: 0.3,
              ease: "power2.out",
            });
          },
        });
      };

      btn.addEventListener("mouseenter", handleEnter);
      return () => btn.removeEventListener("mouseenter", handleEnter);
    };

    const cleanupDesktop =
      btnRef.current && textRef.current
        ? animateHover(btnRef.current, textRef.current)
        : null;

    const cleanupMobile =
      mobileBtnRef.current && mobileTextRef.current
        ? animateHover(mobileBtnRef.current, mobileTextRef.current)
        : null;

    return () => {
      if (cleanupDesktop) cleanupDesktop();
      if (cleanupMobile) cleanupMobile();
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-950 shadow-md z-50 px-6 md:px-12 lg:px-20">
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <span className="ml-2 font-bold text-xl text-gray-900 dark:text-white">
            MySite
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-gray-800 dark:text-gray-200">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/services">Services</Link>
          </li>
          <li>
            <button
              ref={btnRef}
              className="relative bg-black text-white px-4 py-2 rounded-md overflow-hidden"
            >
              <span ref={textRef} className="relative block">
                Contact
              </span>
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <Hamburger toggled={isOpen} toggle={setOpen} size={24} />
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center bg-white dark:bg-gray-950 shadow-md py-6 gap-6 text-gray-800 dark:text-gray-200">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/services">Services</Link>
          </li>
          <li>
            <button
              ref={mobileBtnRef}
              className="relative bg-black text-white px-4 py-2 rounded-md overflow-hidden"
            >
              <span ref={mobileTextRef} className="relative block">
                Contact
              </span>
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
