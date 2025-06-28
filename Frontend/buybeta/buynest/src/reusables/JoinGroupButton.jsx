import React, { useState } from "react";
import { useGroups } from "./GroupContext.jsx";
import { CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

export const JoinGroupButton = ({ group }) => {
     const { joinGroup, joinedGroups } = useGroups();
     const [loading, setLoading] = useState(false);

     const isClosed = group.status === "closed";
     const isJoined = joinedGroups.includes(group.id);

     const handleJoin = () => {
          if (!isClosed && !isJoined) {
               setLoading(true);
               joinGroup(group.id);
               toast.success(`Joined ${group.title}!`);
               setTimeout(() => setLoading(false), 800);
          }
     };

     if (isClosed) {
          return (
              <button
                  className="text-xs px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed w-full"
                  disabled
              >
                   Closed
              </button>
          );
     }
     if (isJoined) {
          return (
              <button
                  className="text-xs px-4 py-2 bg-green-600 text-white rounded w-full flex items-center justify-center gap-1"
                  disabled
              >
                   <CheckCircle size={14} />
                   Joined
              </button>
          );
     }
     return (
         <button
             onClick={handleJoin}
             className="text-xs px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded w-full text-center"
             disabled={loading}
         >
              {loading ? "Joining..." : "Join Group"}
         </button>
     );
};