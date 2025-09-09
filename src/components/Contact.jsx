import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ContactButton() {
  const btnRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    const text = textRef.current;

    btn.addEventListener("mouseenter", () => {
      gsap.to(text, {
        y: -40, // move up
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          // reset below and bring back up
          gsap.set(text, { y: 40 });
          gsap.to(text, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        },
      });
    });
  }, []);

  return (
    <li>
      <button
        ref={btnRef}
        className="relative bg-black text-white px-4 py-2 rounded-md overflow-hidden"
      >
        <span ref={textRef} className="block">
          Contact
        </span>
      </button>
    </li>
  );
}
