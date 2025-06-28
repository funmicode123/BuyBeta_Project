import React from "react";
import { useParams, Link } from "react-router-dom";
import { sampleGroups, categories2 } from "../reusables/data";
import { Home, Users, CheckCircle } from "lucide-react";
import Logo from "../assets/Screenshot_2025-06-24_125315-removebg-preview 2.png";
import { useGroups } from "../reusables/GroupContext.jsx";
import { toast } from "react-toastify";
import {Footer} from "../components/Footer.jsx";

export const CategoryGroupsPage = () => {
     const { categoryId } = useParams();
     const category = categories2.find((cat) => String(cat.id) === categoryId);
     const groups = sampleGroups.filter((g) => String(g.categoryId) === categoryId);
     const { joinGroup, joinedGroups } = useGroups();

     if (!category) {
          return (
              <div className="p-6 text-center text-gray-600">
                   Category not found. <Link to="/" className="underline text-blue-600">Back to Home</Link>
              </div>
          );
     }

     const handleJoin = (group) => {
          if (group.status !== "closed" && !joinedGroups.includes(group.id)) {
               joinGroup(group.id);
               toast.success(`Joined ${group.title}!`);
          }
     };

     return (
         <div className="min-h-screen bg-blue-50 p-6">
              {/* Header */}
              <div className="bg-[#003399] text-white py-4 px-6 flex items-center justify-between">
                   <img src={Logo} alt="logo" className="h-10 w-auto" />
                   <h1 className="text-lg font-semibold">
                        Groups in {category.title}
                   </h1>
                   <Link
                       to="/"
                       className="flex items-center gap-2 text-blue-600 bg-white hover:bg-blue-800 hover:text-white px-3 py-2 rounded transition"
                   >
                        <Home size={18} />
                        <span className="font-medium">Back Home</span>
                   </Link>
              </div>

              {/* Group Listings */}
              <div className="max-w-6xl mx-auto mt-8">
                   {groups.length === 0 ? (
                       <p className="text-center text-gray-600">
                            No groups found for this category.
                       </p>
                   ) : (
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {groups.map((group) => {
                                 const progress = Math.min((group.members / group.goal) * 100, 100);
                                 const isJoined = joinedGroups.includes(group.id);
                                 return (
                                     <div
                                         key={group.id}
                                         className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
                                     >
                                          <img
                                              src={group.image}
                                              alt={group.title}
                                              className="h-40 w-full object-cover rounded mb-3"
                                          />
                                          <h2 className="text-lg font-semibold text-blue-900 mb-1">
                                               {group.title}
                                          </h2>
                                          <p className="text-gray-600 text-sm mb-1">
                                               Location: {group.location}
                                          </p>
                                          <div className="flex items-center text-sm text-gray-600 mb-1 gap-2">
                                               <Users className="h-4 w-4 text-green-500" />
                                               {group.members} / {group.goal} members
                                          </div>
                                          <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                                               <div
                                                   className="h-2 bg-blue-600 rounded-full"
                                                   style={{ width: `${progress}%` }}
                                               ></div>
                                          </div>
                                          <p className="text-sm font-medium text-blue-700 mb-3">
                                               Price: {group.price}
                                          </p>
                                          {group.status === "closed" ? (
                                              <button
                                                  className="w-full py-2 text-sm bg-gray-300 text-gray-500 rounded cursor-not-allowed"
                                                  disabled
                                              >
                                                   Closed
                                              </button>
                                          ) : isJoined ? (
                                              <button
                                                  className="w-full py-2 text-sm bg-green-600 text-white rounded flex items-center justify-center gap-1"
                                                  disabled
                                              >
                                                   <CheckCircle size={14} />
                                                   Joined
                                              </button>
                                          ) : (
                                              <button
                                                  onClick={() => handleJoin(group)}
                                                  className="block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
                                              >
                                                   Join Group
                                              </button>
                                          )}
                                     </div>
                                 );
                            })}
                       </div>
                   )}
              </div>
              <Footer/>
         </div>
     );
};