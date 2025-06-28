import React from "react";
import { useParams, Link } from "react-router-dom";
import { stores2 } from "../reusables/data.jsx";
import { useGroups } from "../reusables/GroupContext.jsx";
import { Home, Users } from "lucide-react";
import Logo from "../assets/Screenshot_2025-06-24_125315-removebg-preview 2.png";

export const StoreDetailsPage = () => {
     const { storeId } = useParams();
     const store = stores2.find((s) => String(s.id) === storeId);
     const { groups, joinGroup } = useGroups();

     const relatedGroups = groups.filter((g) => String(g.storeId) === storeId);

     if (!store) {
          return (
              <div className="min-h-screen flex items-center justify-center">
                   <p className="text-gray-600">Store not found.</p>
              </div>
          );
     }

     const handleJoin = (id, members, goal, status) => {
          if (members < goal && status !== "closed") {
               joinGroup(id);
          }
     };

     return (
         <div className="min-h-screen bg-blue-50 p-6">
              {/* Header */}
              <div className="bg-[#003399] text-white py-4 px-6 flex items-center justify-between">
                   <img src={Logo} alt="logo" className="h-10 w-auto"/>
                   <h1 className="text-2xl font-bold text-blue-900">{store.title}</h1>
                   <Link
                       to="/stores"
                       className="flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-700 hover:text-white px-4 py-2 rounded shadow"
                   >
                        <Home size={18}/>
                        Back to Stores
                   </Link>
              </div>

              {/* Store Info */}
              <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                   <img
                       src={store.image}
                       alt={store.title}
                       className="w-full h-64 object-cover rounded-md mb-4"
                   />
                   <p className="text-gray-700 mb-2">{store.description}</p>
                   <p className="text-sm text-gray-600">Location: {store.location}</p>
                   <p className="text-sm text-gray-600">Rating: ⭐ {store.rating}</p>
                   <p className="text-sm text-gray-600">Items: {store.items}</p>
                   <p className="text-sm font-semibold text-blue-900 mt-2">Price Range: {store.price}</p>
              </div>

              {/* Group Offers */}
              <h2 className="text-xl font-semibold text-blue-900 mb-4">Group Offers from {store.title}</h2>
              {relatedGroups.length === 0 ? (
                  <p className="text-gray-600">No group deals available for this store yet.</p>
              ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                       {relatedGroups.map((group) => {
                            const progress = Math.min((group.members / group.goal) * 100, 100);
                            const isClosed = group.status === "closed" || group.members >= group.goal;

                            return (
                                <div key={group.id} className="bg-white p-4 rounded-lg shadow-md">
                                     <img
                                         src={group.image}
                                         alt={group.title}
                                         className="rounded-md h-40 w-full object-cover mb-3"
                                     />
                                     <h4 className="text-blue-900 font-semibold text-lg">{group.title}</h4>
                                     <p className="text-sm text-gray-500">{group.location}</p>
                                     <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                          <Users className="h-4 w-4 text-green-500"/>
                                          {group.members} / {group.goal} members
                                     </div>
                                     <div className="w-full h-2 bg-gray-200 rounded-full my-2">
                                          <div
                                              className="h-2 bg-blue-600 rounded-full"
                                              style={{width: `${progress}%`}}
                                          ></div>
                                     </div>
                                     <p className="text-sm text-gray-800 mb-2">
                                          Price: <span className="font-semibold">{group.price}</span>
                                     </p>

                                     {isClosed ? (
                                         <button
                                             className="text-xs px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed w-full"
                                             disabled
                                         >
                                              Closed
                                         </button>
                                     ) : (
                                         <div className="flex flex-col gap-2">
                                              <button
                                                  onClick={() =>
                                                      handleJoin(
                                                          group.id,
                                                          group.members,
                                                          group.goal,
                                                          group.status
                                                      )
                                                  }
                                                  className="text-xs px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded w-full text-center"
                                              >
                                                   Join Group
                                              </button>
                                              <Link
                                                  to={`/join-group/${group.id}`}
                                                  className="text-center text-blue-700 text-xs underline"
                                              >
                                                   View Details
                                              </Link>
                                         </div>
                                     )}
                                </div>
                            );
                       })}
                  </div>
              )}
         </div>
     );
};
