import React from "react";
import { useParams, Link } from "react-router-dom";
import { stores2, sampleGroups } from "../reusables/data";
import { Home, Users } from "lucide-react";
import Logo from "../assets/Screenshot_2025-06-24_125315-removebg-preview 2.png";

export const StoreGroupListPage = () => {
     const { storeId } = useParams();
     const store = stores2.find((s) => s.id === parseInt(storeId));
     const groups = sampleGroups.filter((g) => g.storeId === parseInt(storeId));

     if (!store) {
          return <div className="p-6 text-center text-gray-600">Store not found.</div>;
     }

     return (
         <div className="min-h-screen bg-blue-50">
              {/* Header */}
              <div className="bg-[#003399] text-white py-4 px-6 flex items-center justify-between">
                   <img src={Logo} alt="logo" className="h-10 w-auto" />
                   <h1 className="text-lg font-semibold">Join Groups at {store.title}</h1>
                   <Link
                       to={`/store/${store.id}`}
                       className="flex items-center gap-1 text-blue-600 bg-white hover:bg-blue-800 hover:text-white px-3 py-2 rounded transition text-sm"
                   >
                        <Home size={16} />
                        Back to Store
                   </Link>
              </div>

              <div className="max-w-5xl mx-auto p-6">
                   {groups.length === 0 ? (
                       <p className="text-center text-gray-600 mt-8">
                            No active group deals available for this store yet.
                       </p>
                   ) : (
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {groups.map((group) => {
                                 const progress = Math.min((group.members / group.goal) * 100, 100);
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
                                          ) : (
                                              <Link
                                                  to={`/join-group/${group.id}`}
                                                  className="block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
                                              >
                                                   Join Group
                                              </Link>
                                          )}
                                     </div>
                                 );
                            })}
                       </div>
                   )}
              </div>
         </div>
     );
};
