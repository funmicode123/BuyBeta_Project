import React, { useState } from "react";
import { useCart } from "../reusables/CartContext";
import { items, navItems, products } from "../reusables/data.jsx";
import { Footer } from "../components/Footer.jsx";
import { Header } from "../components/Header.jsx";

const AddToCartPage = () => {
     const {
          cartItems,
          addToCart,
          removeFromCart,
          clearCart,
          getCartCount,
          increaseQuantity,
          decreaseQuantity,
     } = useCart();

     const [query, setQuery] = useState("");
     const [filteredResults, setFilteredResults] = useState(products);
     const cartCount = getCartCount();
     const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

     const handleInputChange = (e) => {
          const value = e.target.value;
          setQuery(value);
          const results = products.filter((item) =>
              item.name.toLowerCase().includes(value.toLowerCase())
          );
          setFilteredResults(results);
     };

     return (
         <div className="min-h-screen bg-gray-50">
              <Header />
              <div className="pt-35 px-4 py-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                   <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-4">
                             Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                        </h2>

                        {cartItems.length === 0 ? (
                            <p className="text-gray-500">Your cart is empty.</p>
                        ) : (
                            <div className="space-y-6">
                                 {cartItems.map((item) => (
                                     <div key={item.id} className="bg-white shadow rounded-xl p-4 flex gap-4">
                                          <img
                                              src={item.image}
                                              alt={item.name}
                                              className="w-28 h-28 object-contain rounded"
                                          />
                                          <div className="flex-1">
                                               <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                               <p className="text-sm text-orange-600 font-medium mt-1">Few units left</p>
                                               <img
                                                   src="https://www.jumia.com.ng/assets_he/images/cart/express.svg"
                                                   alt="express"
                                                   className="h-5 mt-1"
                                               />
                                               <div className="flex items-center mt-2 gap-4">
                                                    <div className="text-xl font-bold text-black">
                                                         ₦{(item.price * item.quantity).toLocaleString()}
                                                    </div>
                                                    <div className="line-through text-sm text-gray-400">
                                                         ₦{(item.originalPrice || item.price * 1.3).toLocaleString()}
                                                    </div>
                                                    <div className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded">
                                                         -
                                                         {Math.round(
                                                             ((item.originalPrice || item.price * 1.3) - item.price) /
                                                             (item.originalPrice || item.price * 1.3) *
                                                             100
                                                         )}
                                                         %
                                                    </div>
                                               </div>

                                               <div className="mt-4 flex items-center gap-2">
                                                    <button
                                                        className="w-8 h-8 bg-gray-200 rounded text-xl"
                                                        onClick={() => decreaseQuantity(item.id)}
                                                    >
                                                         -
                                                    </button>
                                                    <span className="w-8 text-center">{item.quantity}</span>
                                                    <button
                                                        className="w-8 h-8 bg-orange-500 text-white rounded text-xl"
                                                        onClick={() => increaseQuantity(item.id)}
                                                    >
                                                         +
                                                    </button>
                                               </div>

                                               <button
                                                   onClick={() => removeFromCart(item.id)}
                                                   className="text-sm text-orange-600 hover:underline mt-4"
                                               >
                                                    🗑 Remove
                                               </button>
                                          </div>
                                     </div>
                                 ))}
                            </div>
                        )}
                   </div>

                   {cartItems.length > 0 && (
                       <div className="w-full lg:w-1/3">
                            <div className="bg-white rounded-xl shadow p-6">
                                 <h3 className="text-lg font-bold mb-4">CART SUMMARY</h3>
                                 <div className="flex justify-between mb-4">
                                      <span className="text-gray-700">Subtotal</span>
                                      <span className="text-lg font-semibold text-black">
                                             ₦{total.toLocaleString()}
                                      </span>
                                 </div>
                                 <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold text-sm">
                                      Checkout (₦{total.toLocaleString()})
                                 </button>
                            </div>
                       </div>
                   )}
              </div>
              <Footer />
         </div>
     );
};

export default AddToCartPage;
