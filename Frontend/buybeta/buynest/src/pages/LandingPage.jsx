import React, { useState } from "react";
import { categories, features, stores } from "../reusables/data.jsx";
import { Users, Globe } from "lucide-react";
import RevealText from "../reusables/RevealText.jsx";
import RevealOnScroll from "../reusables/RevealOnScroll.jsx";
import { Link } from "react-router-dom";
import BuyBeta from "../assets/Screenshot_2025-06-24_125315-removebg-preview 2.png"
import {Footer} from "../components/Footer.jsx";

const LandingPage = () => {
     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

     return (
         <div className="min-h-screen flex flex-col">
              <nav className="fixed top-0 left-0 w-full bg-blue-900 shadow-sm z-50">
                   <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-3">
                        {/* Left: Logo */}
                        <img src={BuyBeta} alt="logo" className="h-11 w-auto"/>

                        {/* Center: Navigation Links */}
                        <div className="hidden md:flex flex-1 justify-center gap-9">
                             <a href="/categories"
                                className="text-white hover:underline text-sm font-medium">Categories</a>
                             <a href="/stores" className="text-white hover:underline text-sm font-medium">Stores</a>
                             <a href="/group" className="text-white hover:underline text-sm font-medium">Group by</a>
                             <a href="/order" className="text-white hover:underline text-sm font-medium">Track orders</a>

                        </div>

                        {/* Right: Auth Buttons */}
                        <div className="hidden md:flex items-center gap-2">
                             <Link to="/Sign in">
                                  <button
                                      className="bg-blue-500 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-full text-sm shadow-md">
                                       Sign in
                                  </button>
                             </Link>
                             <Link to="/Sign up">
                                  <button
                                      className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-full text-sm shadow-md">
                                       Join now
                                  </button>
                             </Link>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="md:hidden">
                             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                     className="text-white focus:outline-none">
                                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       {mobileMenuOpen ? (
                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                 d="M6 18L18 6M6 6l12 12"/>
                                       ) : (
                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                 d="M4 6h16M4 12h16M4 18h16"/>
                                       )}
                                  </svg>
                             </button>
                        </div>
                   </div>
              </nav>


              {/* HERO SECTION */}
              <section className="relative w-full h-[90vh] bg-gradient-to-b from-[#0F172A] via-[#1E3A8A] to-[#3B82F6]">
                   <div className="absolute inset-0 bg-black opacity-30"></div>
                   <div
                       className="absolute inset-0 flex items-center justify-center pt-20 px-6 text-white text-center max-w-5xl mx-auto">
                        <RevealText>
                             <h1 className="text-4xl md:text-5xl font-semibold leading-tight drop-shadow-lg">
                                  Group Up, Pay Less – <br/>
                                  Discover Authentic African Fashion Together
                             </h1>
                             <h2 className="mt-4 font-bold">
                                  Join forces with fashion lovers worldwide to access premium African fabrics and
                                  designs. Pool funds, share shipping, and celebrate heritage together with BuyBeta.
                             </h2>
                             <div className="mt-6 flex flex-wrap justify-center gap-4">
                                  <button
                                      className="w-44 h-12 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold rounded-md shadow-md">
                                       <Users className="w-5 h-5 mr-2"/> Join Group
                                  </button>
                                  <button
                                      className="w-44 h-12 flex items-center justify-center bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 text-base font-semibold rounded-md shadow-md">
                                       <Globe className="w-5 h-5 mr-2"/> Explore Stores
                                  </button>
                             </div>
                        </RevealText>
                   </div>
              </section>

              {/* WHY CHOOSE */}
              <RevealOnScroll>
                   <section
                            className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
                        <div className="max-w-7xl mx-auto">
                             <h1 className="text-3xl md:text-5xl font-weight-400 text-center text-blue-950 mb-12">
                                  Why Choose BuyBeta
                             </h1>
                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                  {features.map((feature, index) => (
                                      <div key={index}
                                           className="bg-white min-h-[240px] px-6 py-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl active:scale-95">
                                           <div
                                               className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-blue-100 text-blue-500">
                                                {feature.icon}
                                           </div>
                                           <h3 className="text-lg font-medium text-gray-700 mb-2">{feature.title}</h3>
                                           <p className="text-gray-600 text-sm">{feature.description}</p>
                                      </div>
                                  ))}
                             </div>
                        </div>
                   </section>
              </RevealOnScroll>

              {/* CATEGORY CARDS */}
              <RevealOnScroll>
                   <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#e6f0ff] to-[#d6e6ff]">
                        <div className="max-w-7xl mx-auto">
                             <h2 className="text-3xl md:text-4xl font-semibold text-center text-blue-950 mb-10">
                                  Shop by Category
                             </h2>
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  {categories.map((category, index) => (
                                      <div
                                          key={index}
                                          className="bg-white px-4 py-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center text-center transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95"
                                      >
                                           <img
                                               src={category.image}
                                               alt={category.title}
                                               className="h-40 w-full object-cover rounded-md mb-4"
                                           />
                                           <h3 className="text-base font-semibold text-gray-800 mb-2">
                                                {category.title}
                                           </h3>
                                           <p className="text-sm text-gray-600 mb-4">
                                                {category.items} items available
                                           </p>
                                           <button
                                               className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition"
                                           >
                                                Explore
                                           </button>
                                      </div>
                                  ))}
                             </div>
                        </div>
                   </section>
              </RevealOnScroll>

              {/* FEATURED STORES */}
              <RevealOnScroll>
                   <section className="py-12 bg-white text-center">
                        <h2 className="text-2xl md:text-3xl font-semibold text-blue-900 mb-10">
                             Featured Global Stores
                        </h2>
                        <div className="flex flex-wrap justify-center gap-6 px-4">
                             {stores.map((store) => (
                                 <div key={store.name}
                                      className="bg-white rounded-lg shadow-md w-full max-w-[230px] text-left p-4">
                                      <h3 className="text-blue-900 text-base font-semibold">{store.name}</h3>
                                      <p className="text-sm text-black mb-3">{store.location}</p>
                                      <div className="flex items-center justify-between mb-3">
                                           <div className="flex items-center gap-1 text-sm font-medium text-yellow-700">
                                                <span className="text-amber-500">⭐</span>
                                                <span>{store.rating}</span>
                                           </div>
                                           <span className="text-xs text-gray-600">{store.items} items</span>
                                      </div>
                                      <button
                                          className="bg-blue-600 w-full text-white text-sm py-2 rounded-md hover:bg-blue-700 transition">
                                           Visit Store
                                      </button>
                                 </div>
                             ))}
                        </div>
                   </section>
              </RevealOnScroll>

              <Footer/>
         </div>
     );
};

export default LandingPage;
