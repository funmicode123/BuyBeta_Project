import React from "react";
import { useParams, Link } from "react-router-dom";
import { stores2, products } from "../reusables/data";
import Logo from "../assets/Screenshot_2025-06-24_125315-removebg-preview 2.png";

export const StoreProductsPage = () => {
     const { storeId } = useParams();
     const store = stores2.find((s) => s.id === parseInt(storeId));
     const filteredProducts = products.filter((p) => p.storeId === parseInt(storeId));

     if (!store) {
          return <div className="p-6 text-center text-gray-600">Store not found.</div>;
     }

     return (
         <div className="min-h-screen bg-blue-50 p-6">
              <div className="max-w-5xl mx-auto">
                   <div className="bg-[#003399] text-white py-4 px-6 flex items-center justify-between">
                        <img src={Logo} alt="logo" className="h-10 w-auto"/>
                        <h1 className="text-2xl font-bold text-blue-800">
                             Products from {store.title}
                        </h1>
                        <Link
                            to={`/store/${store.id}`}
                            className="text-blue-600 underline hover:text-blue-800 text-sm"
                        >
                             ← Back to Store
                        </Link>
                   </div>

                   {/* Product List */}
                   {filteredProducts.length === 0 ? (
                       <p className="text-gray-600 text-center">
                            No products available for this store yet.
                       </p>
                   ) : (
                       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
                                >
                                     <img
                                         src={product.image}
                                         alt={product.name}
                                         className="w-full h-40 object-cover mb-3 rounded"
                                         onError={(e) => {
                                              e.target.onerror = null;
                                              e.target.src = "/fallback.jpg"; // optional fallback
                                         }}
                                     />
                                     <h2 className="text-lg font-semibold text-gray-900 mb-1">
                                          {product.name}
                                     </h2>
                                     <p className="text-sm text-blue-800 font-medium mb-1">
                                          ₦{product.price.toLocaleString()}
                                     </p>
                                     <p className="text-sm text-gray-500 mb-2">⭐ {product.rating}</p>

                                     <Link
                                         to={`/product/${product.id}`}
                                         className="inline-block w-full text-center text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
                                     >
                                          View Details
                                     </Link>
                                </div>
                            ))}
                       </div>
                   )}
              </div>
         </div>
     );
};
