"use client";

import { useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const defaultGsapVars = {
     chars: {
          x: 150,
          opacity: 0,
          duration: 0.7,
          ease: "power3",
          stagger: 0.05,
     },
     words: {
          x: 150,
          opacity: 0,
          ease: "power3",
          duration: 1,
          stagger: 0.2,
          y: -100,
          rotation: "random(-80, 80)",
     },
     lines: {
          duration: 1,
          yPercent: 100,
          opacity: 0,
          stagger: 0.4,
          ease: "expo.out",
     },
};

const RevealText = ({
                         type = "chars",
                         gsapVars = {},
                         splitTextVars = {},
                         ...props
                    }) => {
     const wrapperRef = useRef(null);

     const splitType = useMemo(() => {
          return {
               chars: "chars,words,lines",
               words: "words,lines",
               lines: "lines",
          }[type];
     }, [type]);

     useGSAP(() => {
          const element = wrapperRef.current;
          if (!element) return;

          const splitText = SplitText.create(element, {
               type: splitType,
               ...splitTextVars,
          });

          gsap.from(splitText[type], {
               ...defaultGsapVars[type],
               ...gsapVars,
          });
     }, [type, gsapVars, splitTextVars]);

     return <div ref={wrapperRef} {...props} />;
};

export default RevealText;
