import React from "react";
import { useWishlist } from "../reusables/WishlistContext";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const WishlistPage = () => {
     const { wishlistItems, removeFromWishlist } = useWishlist();

     return (
         <div className="min-h-screen bg-gray-50">
              <Header />

              {/* Adjust padding top to offset fixed header */}
              <main className="pt-40 max-w-7xl mx-auto px-4 py-8">
                   <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

                   {wishlistItems.length === 0 ? (
                       <p className="text-gray-500">Your wishlist is empty.</p>
                   ) : (
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {wishlistItems.map((item) => (
                                <div key={item.id} className="bg-white p-4 rounded-lg shadow">
                                     <img
                                         src={item.image}
                                         alt={item.name}
                                         className="w-full h-48 object-cover rounded mb-4"
                                     />
                                     <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                     <p className="text-sm text-gray-500">{item.label}</p>
                                     <div className="mt-2 flex justify-between items-center">
                                          <span className="text-xl font-bold text-black">
                                               ₦{item.price.toLocaleString()}
                                          </span>
                                          <button
                                              onClick={() => removeFromWishlist(item.id)}
                                              className="text-sm text-red-500 hover:underline"
                                          >
                                               Remove
                                          </button>
                                     </div>
                                     <Link
                                         to={`/product/${item.id}`}
                                         className="block text-blue-600 hover:underline text-sm mt-3"
                                     >
                                          View Product →
                                     </Link>
                                </div>
                            ))}
                       </div>
                   )}
              </main>

              <Footer />
         </div>
     );
};

export default WishlistPage;
