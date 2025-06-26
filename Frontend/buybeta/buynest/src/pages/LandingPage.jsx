import React, { useState } from "react";
import BackgroundImage from "../assets/backgroundImage.png";
import {faqItems, featureList, menuSections, testimonials} from "../reusables/data.js";
import Logo1 from "../assets/logo1.png";
import Logo2 from "../assets/logo2.png";
import Logo3 from "../assets/logo3.png";
import RevealText from "../reusables/RevealText.jsx";
import RevealOnScroll from "../reusables/RevealOnScroll.jsx";
import Logo from "../assets/Logo.png"
import {Link} from "react-router-dom";
const LandingPage = () => {
     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
     const originalLogos = [Logo1, Logo2, Logo3,Logo1, Logo2, Logo3,Logo1, Logo2, Logo3,];

     const shuffledLogos = [...originalLogos].sort(() => Math.random() - 0.5);
     const [activeIndex, setActiveIndex] = useState(null);

     const toggleFAQ = (index) => {
          setActiveIndex(activeIndex === index ? null : index);
     };

     return (
         <div>
              <nav
                  className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-3 bg-white shadow-sm z-50">
                   <div className="text-xl font-bold text-blue-600">
                        <img src={Logo} alt="logo" className="h-8 w-auto"/>
                   </div>
                   <div className="hidden md:flex items-center gap-2">
                        <Link to="/Sign up">
                             <button
                                 className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full text-sm">
                                  Sign Up
                             </button>
                        </Link>
                   </div>

                   <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-700 focus:outline-none"
                        >
                             <svg
                                 className="h-6 w-6"
                                 fill="none"
                                 stroke="currentColor"
                                 viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg"
                             >
                                  {mobileMenuOpen ? (
                                      <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M6 18L18 6M6 6l12 12"
                                      />
                                  ) : (
                                      <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M4 6h16M4 12h16M4 18h16"
                                      />
                                  )}
                             </svg>
                        </button>
                   </div>
              </nav>

              {mobileMenuOpen && (
                  <div className="md:hidden fixed top-14 left-0 w-full bg-white shadow-md z-40 p-4 space-y-3">
                       <Link to="/Sign up">
                       <button
                           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md text-sm">
                            Sign Up
                       </button>
                       </Link>
                  </div>
              )}

              <section className="relative w-full h-[90vh]">
                   <img
                       src={BackgroundImage}
                       alt="Group Buying"
                       className="w-full h-full object-cover"
                   />


                   <div className="absolute inset-0 bg-gray-900 opacity-60 flex items-center justify-center pt-20 px-6">

                   </div>

                   <div className="absolute inset-0 flex items-center justify-center pt-20 px-6">
                        <RevealText className="text-white text-center max-w-5xl">
                             <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide leading-tight drop-shadow-lg">
                                  Group up, unite to <span className="text-blue-400">pay less</span>,
                                  <span className="text-blue-500"> win <span className="text-white">MORE</span> together!</span>
                             </h1>

                             <button
                                 className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-full shadow-md"
                             >
                                  Shop now!
                             </button>
                        </RevealText>
                   </div>

              </section>
              <RevealOnScroll>
                   <section className="py-16 px-6 md:px-12 bg-white">
                        <div
                            className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                             {featureList.map((feature, index) => (
                                 <div key={index} className="flex flex-col items-center md:items-start">
                                      <img src={feature.icon} alt={feature.title} className="w-14 h-14 mb-5"/>
                                      <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                                      <p className="text-base md:text-lg text-gray-500">{feature.description}</p>
                                 </div>
                             ))}
                        </div>
                   </section>
              </RevealOnScroll>

              <section className="bg-white py-10">
                   <div className="overflow-hidden">
                        <div className="w-full whitespace-nowrap">
                             <div className="inline-flex animate-scroll gap-10">
                                  {[...shuffledLogos, ...shuffledLogos].map((logo, i) => (
                                      <img
                                          key={i}
                                          src={logo}
                                          alt={`Logo ${i}`}
                                          className="h-24 w-auto inline-block transition-transform duration-500 hover:scale-110"
                                      />
                                  ))}
                             </div>
                        </div>
                   </div>
              </section>
              <RevealOnScroll>
                   <section className="bg-gray-50 py-12 px-4">
                        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                             {testimonials.map((user, index) => (
                                 <div
                                     key={index}
                                     className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
                                 >
                                      <div className="flex items-center mb-4">
                                           <img
                                               src={user.image}
                                               alt={user.name}
                                               className="w-14 h-14 rounded-full mr-4"
                                           />
                                           <div>
                                                <h4 className="text-lg font-semibold">{user.name}</h4>
                                                <p className="text-sm text-gray-500">{user.role}</p>
                                           </div>
                                      </div>
                                      <p className="text-gray-700 italic">“{user.comment}”</p>
                                 </div>
                             ))}
                        </div>
                   </section>
              </RevealOnScroll>

              <RevealOnScroll>
                   <section className="bg-gray-800">
                        <div className="max-w-3xl mx-auto p-8 font-sans text-white">
                             <h1 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h1>

                             {faqItems.map((item, index) => (
                                 <div key={index} className="mb-4 rounded-lg overflow-hidden shadow-sm">
                                      <div
                                          className={`p-4 bg-gray-100 cursor-pointer flex justify-between items-center font-semibold text-lg text-gray-800 hover:bg-gray-200 transition-colors ${
                                              activeIndex === index ? "bg-gray-200" : ""
                                          }`}
                                          onClick={() => toggleFAQ(index)}
                                      >
                                           {item.question}
                                           <span className="ml-4 text-sm">{activeIndex === index ? "▼" : "▶"}</span>
                                      </div>

                                      {activeIndex === index && item.answer && (
                                          <div className="p-4 bg-white border-t border-gray-200 text-gray-700">
                                               <p>{item.answer}</p>
                                          </div>
                                      )}
                                 </div>
                             ))}
                        </div>
                   </section>
              </RevealOnScroll>
              <section className="bg-white p-8 font-sans">
                   <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between gap-8">
                             {menuSections.map((section, index) => (
                                 <RevealOnScroll key={index}>
                                      <section className="w-full md:w-1/3">
                                           <div className="space-y-4">
                                                <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                                                <ul className="space-y-2">
                                                     {section.items.map((item, itemIndex) => (
                                                         <li key={itemIndex}>
                                                              <Link
                                                                  to={item.path}
                                                                  className="text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap"
                                                              >
                                                                   {item.label}
                                                              </Link>
                                                         </li>
                                                     ))}
                                                </ul>
                                           </div>
                                      </section>
                                 </RevealOnScroll>
                             ))}
                        </div>
                   </div>
              </section>


         </div>
     );
};

export default LandingPage;
