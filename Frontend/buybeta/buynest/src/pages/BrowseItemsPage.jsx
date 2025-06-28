import React from "react";
import { useParams, Link } from "react-router-dom";
import { categories2, items } from "../reusables/data.jsx";
import { Home } from "lucide-react";
import Logo from "../assets/Screenshot_2025-06-24_125315-removebg-preview 2.png";
import {Footer} from "../components/Footer.jsx";

export const BrowseItemsPage = () => {
     const { categoryId } = useParams();
     const category = categories2.find((cat) => String(cat.id) === String(categoryId));
     const categoryItems = items.filter((item) => String(item.categoryId) === String(categoryId));

     if (!category) {
          return (
              <div className="p-6 text-center text-gray-600">
                   Category not found. <Link to="/categories" className="underline text-blue-600">Back to Categories</Link>
              </div>
          );
     }

     return (
         <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 font-sans">
              {/* Header */}
              <div className="bg-[#003399] text-white py-4 px-6 flex items-center justify-between">
                   <img src={Logo} alt="logo" className="h-10 w-auto" />
                   <h1 className="text-lg font-semibold">Browse Items in {category.title}</h1>
                   <Link
                       to="/categories"
                       className="flex items-center gap-2 text-blue-600 bg-white hover:bg-blue-800 hover:text-white px-3 py-2 rounded transition"
                   >
                        <Home size={18} />
                        <span className="font-medium">Back to Categories</span>
                   </Link>
              </div>

              <div className="max-w-6xl mx-auto px-4 py-10">
                   {categoryItems.length === 0 ? (
                       <p className="text-center text-gray-600 mt-8">
                            No items found for this category.
                       </p>
                   ) : (
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categoryItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-xl shadow-md p-4 transition hover:shadow-lg"
                                >
                                     {item.image && (
                                         <img
                                             src={item.image}
                                             alt={item.title}
                                             className="rounded-md h-40 w-full object-cover mb-3"
                                         />
                                     )}
                                     <h4 className="text-blue-900 font-semibold text-lg mb-1">{item.title}</h4>
                                     <p className="text-sm text-gray-500 mb-1">{item.description}</p>
                                     <div className="text-sm text-blue-700 font-bold mb-2">
                                          Price: {item.price}
                                     </div>
                                </div>
                            ))}
                       </div>
                   )}
              </div>
              <Footer/>
         </div>
     );
};