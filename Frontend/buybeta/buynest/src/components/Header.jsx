import React, { useState } from 'react';
import { items, navItems, products } from "../reusables/data.jsx";
import { ChevronDown, Heart, Search, ShoppingBag, User } from "lucide-react";
import Logo from "../assets/Screenshot_2025-06-24_125315-removebg-preview 2.png";
import { Link } from "react-router-dom";
import { useCart } from "../reusables/CartContext.jsx";
import { useWishlist } from "../reusables/WishlistContext.jsx";

export const Header = () => {
     const [query, setQuery] = useState("");
     const [filteredResults, setFilteredResults] = useState([]);
     const { getCartCount } = useCart();
     const { wishlistItems } = useWishlist();

     const cartCount = getCartCount();
     const wishlistCount = wishlistItems.length;

     const handleInputChange = (e) => {
          const value = e.target.value;
          setQuery(value);
          if (value.trim() === "") {
               setFilteredResults([]);
               return;
          }
          const results = products.filter((item) =>
              item.name.toLowerCase().includes(value.toLowerCase())
          );
          setFilteredResults(results);
     };

     return (
         <div style={{ zIndex: "1000" }} className="fixed w-full">
              {/* Scrolling text */}
              <div className="bg-[#E0ECFF] py-2 fixed w-full top-0 z-[1001] border-b border-blue-200">
                   <div className="overflow-hidden whitespace-nowrap">
                        <div className="scroll-loop">
                             {[...items, ...items].map((text, index) => (
                                 <span
                                     key={index}
                                     className="relative before:content-['•'] before:mr-1 mx-4 text-sm text-blue-900 cursor-pointer hover:underline hover:text-blue-700"
                                 >
                                      {text}
                                 </span>
                             ))}
                        </div>
                   </div>
              </div>

              {/* Main header */}
              <header className="w-full fixed top-8 z-[1000] shadow-sm border-b border-gray-200 bg-blue-800">
                   <div className="flex items-center justify-between px-4 py-2 relative">
                        {/* Logo in dark background for visibility */}
                        <div className="">
                             <img src={Logo} alt="logo" className="h-10 w-auto" />
                        </div>

                        {/* Search Bar */}
                        <div className="relative flex items-center bg-gray-100 border border-blue-200 rounded-full px-3 py-1 w-96 focus-within:ring-2 focus-within:ring-blue-500">
                             <Search className="w-5 h-5 text-blue-600" />
                             <input
                                 type="text"
                                 value={query}
                                 onChange={handleInputChange}
                                 placeholder="type to search..."
                                 className="bg-transparent ml-2 text-sm outline-none w-full placeholder-gray-500"
                             />
                             {query.length > 0 && (
                                 <div className="absolute top-10 left-0 w-full bg-white border rounded shadow-md z-50 max-h-60 overflow-y-auto">
                                      {filteredResults.length > 0 ? (
                                          filteredResults.map((item) => (
                                              <Link
                                                  to={`/product/${item.id}`}
                                                  key={item.id}
                                                  onClick={() => setQuery("")}
                                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                                              >
                                                   {item.name}
                                              </Link>
                                          ))
                                      ) : (
                                          <div className="px-4 py-2 text-sm text-gray-500">
                                               No results found.
                                          </div>
                                      )}
                                 </div>
                             )}
                        </div>

                        {/* Icons */}
                        <div className="flex items-center gap-4">
                             <User className="w-5 h-5 cursor-pointer text-blue-100" />
                             <Link to="/wish">
                                  <div className="relative">
                                       <Heart className="w-5 h-5 cursor-pointer text-pink-500" />
                                       {wishlistCount > 0 && (
                                           <span className="absolute -top-1 -right-2 bg-pink-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                                                {wishlistCount}
                                           </span>
                                       )}
                                  </div>
                             </Link>
                             <Link to="/addToCart">
                                  <div className="relative">
                                       <ShoppingBag className="w-5 h-5 cursor-pointer text-white" />
                                       {cartCount > 0 && (
                                           <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                                                {cartCount}
                                           </span>
                                       )}
                                  </div>
                             </Link>
                        </div>
                   </div>

                   {/* Navigation Menu */}
                   <nav className="flex justify-center gap-5 text-sm py-2 bg-white">
                        {navItems.map((item) => (
                            <div key={item.title} className="relative group">
                                 <button className="flex items-center gap-1 font-medium text-gray-800 hover:text-blue-600">
                                      {item.title}
                                      <ChevronDown className="w-4 h-4" />
                                 </button>
                                 <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-white border border-gray-200 rounded shadow-md z-10 min-w-[180px]">
                                      {item.dropdown.map((link) => (
                                          <a
                                              key={link.label}
                                              href={link.href}
                                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
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
     );
};
