import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGroups } from "../reusables/GroupContext.jsx";
import Logo from "../assets/Screenshot_2025-06-24_125315-removebg-preview 2.png";
import { Home } from "lucide-react";
import { toast } from "react-toastify";
import {Footer} from "../components/Footer.jsx";

export const JoinGroupPage = () => {
     const { groupId } = useParams();
     const { groups, joinGroup } = useGroups();
     const [joined, setJoined] = useState(false);
     const navigate = useNavigate();

     const group = groups.find((g) => String(g.id) === String(groupId));

     if (!group) {
          return (
              <div className="p-6 text-center text-gray-600">
                   Group not found.{" "}
                   <Link to="/stores" className="underline text-blue-600">
                        Back to Stores
                   </Link>
              </div>
          );
     }

     const isFull = group.members >= group.goal || group.status === "closed";

     const handleJoin = () => {
          if (!isFull && !joined) {
               joinGroup(group.id);
               setJoined(true);
               toast.success(`Successfully joined ${group.title}!`);
               // Optional: Redirect after a delay
               setTimeout(() => navigate(`/group/${groupId}`), 1500);
          }
     };

     return (
         <div className="min-h-screen bg-gray-100">
              {/* Header */}
              <div className="bg-[#003399] text-white py-4 px-6 flex items-center justify-between">
                   <img src={Logo} alt="logo" className="h-10 w-auto" />
                   <h1 className="text-lg font-semibold">{group.title}</h1>
                   <Link
                       to="/"
                       className="flex items-center gap-2 text-blue-600 bg-white hover:bg-blue-800 hover:text-white px-3 py-2 rounded transition"
                   >
                        <Home size={18} />
                        <span className="font-medium">Back Home</span>
                   </Link>
              </div>

              {/* Group Info Card */}
              <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-md p-6">
                   <img
                       src={group.image}
                       alt={group.title}
                       className="w-full h-64 object-cover rounded mb-4"
                   />
                   <h2 className="text-2xl font-bold text-blue-900 mb-2">{group.title}</h2>
                   <p className="text-sm text-gray-600 mb-1">📍 {group.location}</p>
                   <p className="text-sm text-gray-600 mb-1">💰 Price: {group.price}</p>
                   <p className="text-sm text-gray-600 mb-4">
                        👥 Members: {group.members} / {group.goal}
                   </p>

                   {isFull ? (
                       <p className="text-red-500 text-center font-medium">
                            This group is closed or full.
                       </p>
                   ) : joined ? (
                       <div className="text-center">
                            <p className="text-green-600 font-medium mb-4">
                                 You have successfully joined this group!
                            </p>
                            <Link
                                to={`/group/${group.id}`}
                                className="text-blue-600 underline hover:text-blue-800"
                            >
                                 View Group Details
                            </Link>
                       </div>
                   ) : (
                       <button
                           onClick={handleJoin}
                           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded transition"
                       >
                            Confirm Join Group
                       </button>
                   )}

                   <Link
                       to="/stores"
                       className="block mt-4 text-center text-blue-700 underline"
                   >
                        ← Back to Stores
                   </Link>
              </div>
              <Footer/>
         </div>
     );
};