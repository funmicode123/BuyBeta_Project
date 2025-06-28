import React, { useState } from "react";
import { Card, CardContent } from "../components/Card.jsx";
import { Input } from "../components/Input.jsx";
import {
     Select,
     SelectTrigger,
     SelectValue,
     SelectContent,
     SelectItem,
} from "../components/Select.jsx";
import { Search, Home, Star, Users } from "lucide-react";
import { categories2 } from "../reusables/data.jsx";
import { Footer } from "../components/Footer.jsx";
import { Link } from "react-router-dom";
import Logo from "../assets/Screenshot_2025-06-24_125315-removebg-preview 2.png";

export const CategoriesPage = () => {
     const [searchTerm, setSearchTerm] = useState("");
     const [sortBy, setSortBy] = useState("popular");
     const [priceRange, setPriceRange] = useState("all");

     let filtered = categories2.filter((cat) =>
         cat.title.toLowerCase().includes(searchTerm.toLowerCase())
     );

     filtered = filtered.filter((cat) => {
          const price = parseFloat(cat.price?.replace(/[^0-9.]/g, "")) || 0;
          if (priceRange === "low") return price < 50000;
          if (priceRange === "mid") return price >= 50000 && price <= 100000;
          if (priceRange === "high") return price > 100000;
          return true;
     });

     if (sortBy === "popular") {
          filtered = filtered.slice().sort((a, b) => b.groups - a.groups);
     } else if (sortBy === "items") {
          filtered = filtered.slice().sort((a, b) => (b.items || 0) - (a.items || 0));
     } else if (sortBy === "rating") {
          filtered = filtered.slice().sort((a, b) => (b.rating || 0) - (a.rating || 0));
     } else if (sortBy === "name") {
          filtered = filtered.slice().sort((a, b) => a.title.localeCompare(b.title));
     }

     return (
         <div className="min-h-screen bg-gradient-to-b from-[#e6f0ff] to-[#d6e6ff] font-sans">
              {/* Header */}
              <div className="bg-[#003399] text-white py-4 px-6 flex items-center justify-between">
                   <img src={Logo} alt="logo" className="h-10 w-auto" />
                   <h1 className="text-lg font-semibold">Fashion Categories</h1>
                   <Link
                       to="/"
                       className="flex items-center gap-2 text-blue-600 bg-white hover:bg-blue-800 hover:text-white px-3 py-2 rounded transition"
                   >
                        <Home size={18} />
                        <span className="font-medium">Back Home</span>
                   </Link>
              </div>

              {/* Filters */}
              <Card className="mb-8 border-blue-200 mt-8 max-w-6xl mx-auto">
                   <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-2/3 mx-auto">
                             <div className="flex items-center gap-3 w-full md:w-auto">
                                  <div className="relative flex-1 min-w-[180px]">
                                       <Search className="absolute left-3 inset-y-0 my-auto h-4 w-4 text-gray-400" />
                                       <Input
                                           placeholder="Search categories..."
                                           value={searchTerm}
                                           onChange={(e) => setSearchTerm(e.target.value)}
                                           className="pl-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
                                       />
                                  </div>
                                  <div className="w-48">
                                       <Select value={sortBy} onValueChange={setSortBy}>
                                            <SelectTrigger>
                                                 <SelectValue placeholder="Sort by" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                 <SelectItem value="popular">Most Popular</SelectItem>
                                                 <SelectItem value="items">Most Items</SelectItem>
                                                 <SelectItem value="rating">Highest Rated</SelectItem>
                                                 <SelectItem value="name">Name A-Z</SelectItem>
                                            </SelectContent>
                                       </Select>
                                  </div>
                                  <div className="w-56">
                                       <Select value={priceRange} onValueChange={setPriceRange}>
                                            <SelectTrigger>
                                                 <SelectValue placeholder="Price Range" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                 <SelectItem value="all">All Prices</SelectItem>
                                                 <SelectItem value="low">Under ₦50,000</SelectItem>
                                                 <SelectItem value="mid">₦50,000 - ₦100,000</SelectItem>
                                                 <SelectItem value="high">Over ₦100,000</SelectItem>
                                            </SelectContent>
                                       </Select>
                                  </div>
                             </div>
                        </div>
                   </CardContent>
              </Card>

              {/* Categories */}
              <div className="max-w-6xl mx-auto px-4 pb-16">
                   <h3 className="text-lg font-semibold text-blue-900 mb-4">
                        {filtered.length} Categories Available
                   </h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((cat) => (
                            <div
                                key={cat.id}
                                className="bg-white rounded-xl shadow-md p-4 transition hover:shadow-lg relative"
                            >
                                 {cat.featured && (
                                     <div className="absolute top-2 right-2 bg-yellow-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                          Featured
                                     </div>
                                 )}

                                 {cat.image && (
                                     <img
                                         src={cat.image}
                                         alt={cat.title}
                                         className="rounded-md h-44 w-full object-cover mb-3"
                                     />
                                 )}

                                 <div className="flex items-center justify-between mb-1">
                                      <h4 className="text-blue-900 font-semibold text-lg">{cat.title}</h4>
                                      {cat.rating && (
                                          <span className="flex items-center gap-1 text-sm font-medium">
                                               <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                               <span className="text-black">{cat.rating}</span>
                                          </span>
                                      )}
                                 </div>

                                 <p className="text-sm text-gray-500 mb-1">{cat.description}</p>

                                 <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                      <div className="flex flex-col items-start">
                                           <span className="font-bold text-lg text-blue-900">{cat.items}</span>
                                           <span className="text-xs text-gray-600">items</span>
                                      </div>
                                      <div className="flex flex-col items-end">
                                           <span className="flex items-center gap-1 font-bold text-sm text-blue-900">
                                                <Users className="h-4 w-4 text-green-500" />
                                                {cat.groups || 0}
                                           </span>
                                           <span className="text-xs text-gray-600">Active groups</span>
                                      </div>
                                 </div>

                                 <div className="text-sm text-gray-800 mb-2">
                                      Price Range:{" "}
                                      <span className="font-semibold text-blue-900">{cat.price}</span>
                                 </div>

                                 {cat.stores && (
                                     <div className="text-sm text-gray-500 mb-2">
                                          Featured Stores:
                                          <div className="mt-1 flex flex-wrap gap-2">
                                               {cat.stores.map((store, i) => (
                                                   <span
                                                       key={i}
                                                       className="bg-blue-200 px-2 py-0.5 text-xs rounded-full text-gray-700"
                                                   >
                                                        {store}
                                                   </span>
                                               ))}
                                          </div>
                                     </div>
                                 )}

                                 <div className="flex gap-2 mt-4">
                                      <Link
                                          to={`/category/${cat.id}/items`}
                                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded text-center"
                                      >
                                           Browse Items
                                      </Link>
                                      <Link
                                          to={`/category/${cat.id}/groups`}
                                          className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs px-4 py-2 rounded text-center"
                                      >
                                           View Groups
                                      </Link>
                                 </div>
                            </div>
                        ))}
                   </div>
              </div>

              <Footer />
         </div>
     );
};