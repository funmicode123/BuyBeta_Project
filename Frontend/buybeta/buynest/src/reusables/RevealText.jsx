"use client";

import { useRef, useMemo, useLayoutEffect } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const defaultGsapVars = {
     chars: {
          x: 100,
          opacity: 0,
          duration: 0.6,      // Faster animation
          ease: "power3.out",
          stagger: 0.015,     // Faster staggering
     },
     words: {
          x: 100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.07,
          y: -50,
          rotation: "random(-40, 40)",
     },
     lines: {
          yPercent: 100,
          opacity: 0,
          duration: 0.5,
          stagger: 0.2,
          ease: "expo.out",
     },
};

const RevealText = ({
                         type = "chars", // or "words" or "lines"
                         gsapVars = {},
                         splitTextVars = {},
                         as: Tag = "div", // allows custom tag like "h1", "p"
                         children,
                         className = "",
                         ...props
                    }) => {
     const wrapperRef = useRef(null);
     const splitInstance = useRef(null);

     const splitType = useMemo(() => {
          return {
               chars: "chars,words,lines",
               words: "words,lines",
               lines: "lines",
          }[type];
     }, [type]);

     useLayoutEffect(() => {
          const el = wrapperRef.current;
          if (!el) return;

          splitInstance.current = new SplitText(el, {
               type: splitType,
               ...splitTextVars,
          });

          gsap.from(splitInstance.current[type], {
               ...defaultGsapVars[type],
               ...gsapVars,
          });

          return () => {
               splitInstance.current?.revert();
          };
     }, [type, gsapVars, splitTextVars]);

     return (
         <Tag ref={wrapperRef} className={className} {...props}>
              {children}
         </Tag>
     );
};

export default RevealText;
