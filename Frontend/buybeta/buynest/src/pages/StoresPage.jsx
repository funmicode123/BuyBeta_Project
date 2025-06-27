import React, { useState } from "react";
import Logo from "../assets/Screenshot_2025-06-24_125315-removebg-preview 2.png";
import { Link } from "react-router-dom";
import { Home, Search, Filter } from "lucide-react";
import { Card, CardContent } from "../components/Card.jsx";
import { Input } from "../components/Input.jsx";
import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
} from "../components/Select.jsx";
import { stores2 } from "../reusables/data.jsx";

export const StoresPage = () => {
     const [searchTerm, setSearchTerm] = useState("");
     const [sortBy, setSortBy] = useState("popular");
     const [priceRange, setPriceRange] = useState("all");

     let filtered = stores2.filter((store) =>
         store.title.toLowerCase().includes(searchTerm.toLowerCase())
     );

     filtered = filtered.filter((store) => {
          const price = parseFloat(store.price?.replace(/[^0-9.]/g, "")) || 0;
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
                   <h1 className="text-lg font-semibold">Global Store Directory</h1>
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
                        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full justify-center">
                             <div className="relative w-full md:w-1/2">
                                  <Search className="absolute left-3 inset-y-0 my-auto h-4 w-4 text-gray-400" />
                                  <Input
                                      placeholder="Search stores..."
                                      value={searchTerm}
                                      onChange={(e) => setSearchTerm(e.target.value)}
                                      className="pl-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
                                  />
                             </div>

                             <div className="w-full md:w-48">
                                  <Select value={sortBy} onValueChange={setSortBy}>
                                       <SelectTrigger className="flex items-center justify-between">
                                            <span className="truncate">
                                                 {{
                                                      popular: "Most Popular",
                                                      items: "Most Items",
                                                      rating: "Highest Rated",
                                                      name: "Name A-Z",
                                                 }[sortBy]}
                                            </span>
                                            <Filter className="ml-2 h-4 w-4 text-blue-600" />
                                       </SelectTrigger>
                                       <SelectContent>
                                            <SelectItem value="popular">Most Popular</SelectItem>
                                            <SelectItem value="items">Most Items</SelectItem>
                                            <SelectItem value="rating">Highest Rated</SelectItem>
                                            <SelectItem value="name">Name A-Z</SelectItem>
                                       </SelectContent>
                                  </Select>
                             </div>

                             <div className="w-full md:w-56">
                                  <Select value={priceRange} onValueChange={setPriceRange}>
                                       <SelectTrigger className="flex items-center justify-between">
                                            <span className="truncate">
                                                 {{
                                                      all: "All Prices",
                                                      low: "Under ₦50,000",
                                                      mid: "₦50,000 - ₦100,000",
                                                      high: "Over ₦100,000",
                                                 }[priceRange]}
                                            </span>
                                            <Filter className="ml-2 h-4 w-4 text-blue-600" />
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
                   </CardContent>
              </Card>

              {/* Store Results */}
              <div className="max-w-6xl mx-auto px-4 pb-16">
                   <h3 className="text-lg font-semibold text-blue-900 mb-4">
                        {filtered.length} Stores Found
                   </h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((store, i) => (
                            <div
                                key={store.id || i}
                                className="bg-white rounded-xl shadow-md p-4 transition hover:shadow-lg"
                            >
                                 <img
                                     src={store.image}
                                     alt={store.title}
                                     className="rounded-md h-44 w-full object-cover mb-3"
                                 />
                                 <h4 className="text-blue-900 font-semibold text-lg">{store.title}</h4>
                                 <p className="text-sm text-gray-500 mb-1">{store.location}</p>
                                 <div className="text-yellow-500 text-sm mb-1">
                                      ⭐ {store.rating} ({store.items} items)
                                 </div>
                                 <p className="text-sm text-gray-700 mb-1">{store.description}</p>
                                 <p className="text-sm text-gray-800 mb-2">
                                      Price: <span className="font-semibold">{store.price}</span>
                                 </p>
                                 <div className="flex gap-2">
                                      <Link to={`/store/${store.id}`}>
                                           <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded">
                                                Visit Store
                                           </button>
                                      </Link>
                                      <Link to={`/group?storeId=${store.id}`}>
                                           <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs px-4 py-2 rounded">
                                                View Groups
                                           </button>
                                      </Link>
                                 </div>
                            </div>
                        ))}
                   </div>
              </div>
         </div>
     );
};
