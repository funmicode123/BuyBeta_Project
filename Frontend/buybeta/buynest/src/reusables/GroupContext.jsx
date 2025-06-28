import React, { createContext, useContext, useState } from "react";
import { sampleGroups as initialGroups } from "../reusables/data.jsx";

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
     const [groups, setGroups] = useState(initialGroups);
     const [joinedGroups, setJoinedGroups] = useState([]);

     const joinGroup = (groupId) => {
          setGroups((prev) =>
              prev.map((group) =>
                  group.id === groupId && group.members < group.goal && group.status !== "closed"
                      ? {
                           ...group,
                           members: group.members + 1,
                           status: group.members + 1 >= group.goal ? "closed" : group.status
                      }
                      : group
              )
          );
          setJoinedGroups((prev) =>
              prev.includes(groupId) ? prev : [...prev, groupId]
          );
     };

     return (
         <GroupContext.Provider value={{ groups, joinGroup, joinedGroups }}>
              {children}
         </GroupContext.Provider>
     );
};

export const useGroups = () => useContext(GroupContext);