import React from "react";
import { useParams, Link } from "react-router-dom";
import { stores2 } from "../reusables/data.jsx";
import { Home } from "lucide-react";
import Logo from "../assets/Screenshot_2025-06-24_125315-removebg-preview 2.png";

export const SingleStorePage = () => {
     const { storeId } = useParams();
     const store = stores2.find((s) => s.id === parseInt(storeId));

     if (!store) {
          return (
              <div className="min-h-screen flex items-center justify-center">
                   <p className="text-gray-600 text-lg">Store not found.</p>
              </div>
          );
     }

     return (
         <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 font-sans">
              {/* Header */}
              <div className="bg-[#003399] text-white py-4 px-6 flex items-center justify-between">
                   <img src={Logo} alt="logo" className="h-10 w-auto"/>
                   <h1 className="text-lg font-semibold">{store.title}</h1>
                   <Link
                       to="/stores"
                       className="flex items-center gap-2 text-blue-600 bg-white hover:bg-blue-800 hover:text-white px-3 py-2 rounded transition"
                   >
                        <Home size={18}/>
                        <span className="font-medium">Back to Stores</span>
                   </Link>
              </div>

              {/* Store Details */}
              <div className="max-w-5xl mx-auto py-10 px-4">
                   <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <img
                            src={store.image}
                            alt={store.title}
                            className="w-full h-64 object-cover"
                        />

                        <div className="p-6 space-y-4">
                             <h2 className="text-2xl font-bold text-blue-900">{store.title}</h2>
                             <p className="text-gray-600">{store.location}</p>
                             <p className="text-gray-700">{store.description}</p>

                             <div className="text-sm text-gray-800">
                                  <p>⭐ Rating: <span className="font-semibold">{store.rating}</span></p>
                                  <p>🛍 Items: <span className="font-semibold">{store.items}</span></p>
                                  <p>👥 Active Groups: <span className="font-semibold">{store.groups}</span></p>
                                  <p>💵 Price Range: <span className="font-semibold">{store.price}</span></p>
                             </div>

                             <div className="flex gap-4 pt-4">
                                  <Link
                                      to={`/stores/${store.id}/products`}
                                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm text-center"
                                  >
                                       View Products
                                  </Link>
                                  <Link
                                      to={`/stores/${store.id}/groups`}
                                      className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded text-sm text-center"
                                  >
                                       Join Groups
                                  </Link>
                             </div>
                        </div>
                   </div>
              </div>
         </div>
     );
};
