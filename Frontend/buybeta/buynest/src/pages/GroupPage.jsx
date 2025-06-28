import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Users } from "lucide-react";
import { Card, CardContent } from "../components/Card.jsx";
import { Input } from "../components/Input.jsx";
import { sampleGroups } from "../reusables/data.jsx";
import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
} from "../components/Select.jsx";
import Logo from "../assets/Screenshot_2025-06-24_125315-removebg-preview 2.png";
import { JoinGroupButton } from "../reusables/JoinGroupButton.jsx";
import {Footer} from "../components/Footer.jsx";

export const GroupPage = () => {
     const [searchTerm, setSearchTerm] = useState("");
     const [statusFilter, setStatusFilter] = useState("all");

     const filteredGroups = sampleGroups.filter((group) => {
          const matchesSearch = group.title.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesStatus = statusFilter === "all" || group.status === statusFilter;
          return matchesSearch && matchesStatus;
     });

     return (
         <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 font-sans">
              {/* Header */}
              <div className="bg-[#003399] text-white py-4 px-6 flex items-center justify-between">
                   <img src={Logo} alt="logo" className="h-10 w-auto" />
                   <h1 className="text-lg font-semibold">Active Group Offers</h1>
                   <Link
                       to="/"
                       className="flex items-center gap-2 text-blue-600 bg-white hover:bg-blue-800 hover:text-white px-3 py-2 rounded transition"
                   >
                        <Home size={18} />
                        <span className="font-medium">Back Home</span>
                   </Link>
              </div>

              {/* Filters */}
              <Card className="my-8 border-blue-200 max-w-5xl mx-auto">
                   <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                             <Input
                                 placeholder="Search groups..."
                                 value={searchTerm}
                                 onChange={(e) => setSearchTerm(e.target.value)}
                                 className="w-full md:w-2/3"
                             />
                             <Select value={statusFilter} onValueChange={setStatusFilter}>
                                  <SelectTrigger className="flex justify-between w-full md:w-64">
                                       <span>
                                            {{
                                                 all: "All Statuses",
                                                 active: "Active",
                                                 "almost full": "Almost Full",
                                                 closed: "Closed",
                                            }[statusFilter]}
                                       </span>
                                  </SelectTrigger>
                                  <SelectContent>
                                       <SelectItem value="all">All Statuses</SelectItem>
                                       <SelectItem value="active">Active</SelectItem>
                                       <SelectItem value="almost full">Almost Full</SelectItem>
                                       <SelectItem value="closed">Closed</SelectItem>
                                  </SelectContent>
                             </Select>
                        </div>
                   </CardContent>
              </Card>

              {/* Group List */}
              <div className="max-w-6xl mx-auto px-4 pb-16">
                   <h3 className="text-lg font-semibold text-blue-900 mb-4">
                        {filteredGroups.length} Group Offer{filteredGroups.length !== 1 && "s"} Found
                   </h3>

                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredGroups.map((group) => {
                             const progress = Math.min((group.members / group.goal) * 100, 100);

                             return (
                                 <div
                                     key={group.id}
                                     className="bg-white rounded-xl shadow-md p-4 transition hover:shadow-lg"
                                 >
                                      <img
                                          src={group.image}
                                          alt={group.title}
                                          className="rounded-md h-40 w-full object-cover mb-3"
                                      />
                                      <h4 className="text-blue-900 font-semibold text-lg">{group.title}</h4>
                                      <p className="text-sm text-gray-500">{group.store}</p>
                                      <p className="text-sm text-gray-500">{group.location}</p>

                                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                           <Users className="h-4 w-4 text-green-500" />
                                           {group.members} / {group.goal} members
                                      </div>

                                      <div className="w-full h-2 bg-gray-200 rounded-full my-2">
                                           <div
                                               className="h-2 bg-blue-600 rounded-full"
                                               style={{ width: `${progress}%` }}
                                           />
                                      </div>

                                      <p className="text-sm text-gray-800 mb-2">
                                           Price: <span className="font-semibold">{group.price}</span>
                                      </p>

                                      <div className="flex gap-2">
                                           <JoinGroupButton group={group} />
                                           {group.storeId && (
                                               <Link
                                                   to={`/store/${group.storeId}`}
                                                   className="border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs px-4 py-2 rounded w-full text-center"
                                               >
                                                    View Store
                                               </Link>
                                           )}
                                      </div>
                                 </div>
                             );
                        })}
                   </div>
              </div>
              <Footer/>
         </div>
     );
};