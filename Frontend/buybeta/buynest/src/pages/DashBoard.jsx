import React, { useState } from "react";
import {
     items,
     menuSections,
     navItems,
     products,
} from "../reusables/data.js";
import {
     Search,
     User,
     Heart,
     ShoppingBag,
     ChevronDown,
     Star,
     ShoppingCart,
} from "lucide-react";
import Logo from "../assets/Logo.png";
import RevealOnScroll from "../reusables/RevealOnScroll.jsx";
import { Link } from "react-router-dom";
import { TiltCard } from "../reusables/TiltCard.jsx";

const DashBoard = () => {
     const [query, setQuery] = useState("");
     const [filteredResults, setFilteredResults] = useState(products);
     const [cartCount, setCartCount] = useState(2);

     const handleInputChange = (e) => {
          const value = e.target.value;
          setQuery(value);
          const results = products.filter((item) =>
              item.name.toLowerCase().includes(value.toLowerCase())
          );
          setFilteredResults(results);
     };

     return (
         <div>
              <div style={{ zIndex: "1000" }} className="fixed w-full">
                   <div className="bg-blue-200 py-2 overflow-hidden">
                        <h2 className="mb-1 text-sm sm:text-base md:text-lg text-center flex flex-wrap justify-center items-center gap-1 font-medium">
                             HOW WE SOURCE YOUR FAVE SMALL BUSINESS -
                             <span className="underline cursor-pointer text-orange-300 hover:text-blue-800 ml-1">
              CLICK HERE
            </span>
                        </h2>
                        <hr className="w-full border-t mb-2 sm:mb-3" />
                        <div className="overflow-hidden whitespace-nowrap">
                             <div className="scroll-loop">
                                  {[...items, ...items].map((text, index) => (
                                      <span
                                          key={index}
                                          className="relative before:content-['•'] before:mr-1 sm:before:mr-2 before:text-gray-800 mx-4 sm:mx-6 md:mx-10 text-xs sm:text-sm md:text-base font-medium text-gray-800 cursor-pointer hover:underline hover:text-blue-800"
                                      >
                                        {text}
                                      </span>
                                  ))}
                             </div>
                        </div>
                        <hr className="w-full border-t mt-2 sm:mt-3" />
                   </div>

                   <header className="w-full fixed border-b border-gray-200 bg-white">
                        <div className="flex items-center justify-between px-4 sm:px-8 py-2">
                             <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 w-48 sm:w-64">
                                  <Search className="w-4 h-4 text-gray-500" />
                                  <input
                                      type="text"
                                      value={query}
                                      onChange={handleInputChange}
                                      placeholder="type to search..."
                                      className="bg-transparent ml-2 text-sm outline-none w-full placeholder-gray-500"
                                  />
                             </div>

                             <div className="text-2xl sm:text-3xl font-semibold tracking-tight flex items-center">
                                  <img src={Logo} alt="logo" className="h-9 w-auto align-middle" />
                             </div>

                             <div className="flex items-center gap-4 sm:gap-6">
                                  <User className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
                                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
                                  <div className="relative">
                                       <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
                                       {cartCount > 0 && (
                                           <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                                                  {cartCount}
                                           </span>
                                       )}
                                  </div>
                             </div>
                        </div>

                        <nav className="flex justify-center gap-4 sm:gap-6 text-sm sm:text-base py-2">
                             {navItems.map((item) => (
                                 <div key={item.title} className="relative group">
                                      <button className="flex items-center gap-1 font-medium text-gray-800 hover:text-blue-600 focus:outline-none">
                                           {item.title}
                                           <ChevronDown className="w-4 h-4" />
                                      </button>
                                      <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-white border border-gray-200 rounded shadow-md z-10 min-w-[180px]">
                                           {item.dropdown.map((link) => (
                                               <a
                                                   key={link.label}
                                                   href={link.href}
                                                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                                               >
                                                    {link.label}
                                               </a>
                                           ))}
                                      </div>
                                 </div>
                             ))}
                        </nav>
                   </header>
              </div>

              <main style={{ zIndex: "10" }} className="pt-50">
                   <div>
                        <h2 className="mt-6 text-2xl sm:text-3xl md:text-4xl font-400 text-center mb-2 font-sans tracking-wide">
                             Our Collections
                        </h2>
                        <hr className="border-t-2 w-80 mx-auto mb-4" />
                   </div>

                   <div className="max-w-7xl mx-auto px-4 py-6">
                        <div className="max-w-7xl mx-auto px-4 py-8">
                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                  {filteredResults.length > 0 ? (
                                      filteredResults.map((product) => (
                                          <TiltCard key={product.id}>
                                               <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
                                                    <div className="relative">
                                                         <img
                                                             src={product.image}
                                                             alt={product.name}
                                                             className="w-full h-56 object-cover rounded-t-lg"
                                                         />
                                                    </div>
                                                    <div className="p-3 pb-5">
                                                         <div className="flex justify-between items-center mb-2 space-x-2">
                                                              <button className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full">
                                                                   One unit, get 0% off
                                                              </button>
                                                              <button className="bg-green-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                                                                   {product.label}
                                                              </button>
                                                         </div>
                                                         <h3 className="text-sm font-semibold text-gray-800">
                                                              {product.name}
                                                         </h3>
                                                         <p className="text-sm text-gray-700">{product.price}</p>
                                                         <div className="flex items-center mt-1 space-x-0.5 text-yellow-400">
                                                              {Array.from({ length: product.rating }).map((_, i) => (
                                                                  <Star key={i} size={14} fill="currentColor" />
                                                              ))}
                                                         </div>
                                                    </div>
                                                    <button className="absolute bottom-3 right-3 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full">
                                                         <ShoppingCart size={16} />
                                                    </button>
                                               </div>
                                          </TiltCard>
                                      ))
                                  ) : (
                                      <p className="text-center text-gray-500 col-span-full">No products found.</p>
                                  )}
                             </div>
                        </div>
                   </div>
              </main>

              <section className="bg-white p-8 font-sans">
                   <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between gap-8">
                             {menuSections.map((section, index) => (
                                 <RevealOnScroll key={index}>
                                      <section className="w-full md:w-1/3">
                                           <div className="space-y-4">
                                                <h2 className="text-xl font-bold text-gray-900">
                                                     {section.title}
                                                </h2>
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

export default DashBoard;
