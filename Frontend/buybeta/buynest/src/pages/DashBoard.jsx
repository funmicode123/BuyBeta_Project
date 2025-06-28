import React, { useState } from "react";
import { useCart } from "../reusables/CartContext.jsx";

import {
     products,
} from "../reusables/data.jsx";
import {
     Star,
     ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { TiltCard } from "../reusables/TiltCard.jsx";
import {Footer} from "../components/Footer.jsx";
import {Header} from "../components/Header.jsx";

const DashBoard = () => {
     const { addToCart, getCartCount } = useCart();
     const [filteredResults, setFilteredResults] = useState(products);
     const cartCount = getCartCount();

     return (
         <div>
              <Header/>
              <main style={{ zIndex: "10" }} className="pt-30">
                   <div>
                        <h2 className="mt-6 text-2xl sm:text-3xl md:text-4xl font-400 text-center mb-2 font-sans tracking-wide">
                             Our Collections
                        </h2>
                        <hr className="border-t-2 w-80 mx-auto mb-4" />
                   </div>

                   <div className="max-w-7xl mx-auto px-4 py-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                             {filteredResults.length > 0 ? (
                                 filteredResults.map((product) => (
                                     <TiltCard key={product.id}>
                                          <Link to={`/product/${product.id}`} className="block">
                                               <div className="relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
                                                    <div className="relative">
                                                         <img
                                                             src={product.image}
                                                             alt={product.name}
                                                             className="w-full h-56 object-cover rounded-t-lg"
                                                         />
                                                    </div>
                                                    <div className="p-3 pb-5">
                                                         <div className="flex justify-between items-center mb-2 space-x-2">
                                                              <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full">
                                                                   One unit, get 0% off
                                                              </span>
                                                              <span className="bg-green-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                                                                   {product.label}
                                                              </span>
                                                         </div>
                                                         <h3 className="text-sm font-semibold text-gray-800">
                                                              {product.name}
                                                         </h3>
                                                         <p className="text-sm text-gray-700">
                                                              ₦{product.price.toLocaleString()}
                                                         </p>
                                                         <div className="flex items-center mt-1 space-x-0.5">
                                                              {Array.from({ length: 5 }).map((_, i) => (
                                                                  <Star
                                                                      key={i}
                                                                      size={14}
                                                                      fill={i < product.rating ? "currentColor" : "none"}
                                                                      className={i < product.rating ? "text-yellow-400" : "text-gray-300"}
                                                                      strokeWidth={1.5}
                                                                  />
                                                              ))}
                                                         </div>
                                                    </div>
                                               </div>
                                          </Link>
                                          <button
                                              onClick={() => addToCart(product)}
                                              className="absolute bottom-3 right-3 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
                                          >
                                               <ShoppingCart size={16} />
                                          </button>
                                     </TiltCard>
                                 ))
                             ) : (
                                 <p className="text-center text-gray-500 col-span-full">
                                      No products found.
                                 </p>
                             )}
                        </div>
                   </div>
              </main>
              <Footer/>
         </div>
     );
};

export default DashBoard;
