import React, { createContext, useContext, useState } from "react";
import { sampleGroups as initialGroups } from "../reusables/data";

const GroupContext = createContext();

export const useGroups = () => useContext(GroupContext);

export const GroupProvider = ({ children }) => {
     const [groups, setGroups] = useState(initialGroups);

     const joinGroup = (groupId) => {
          setGroups((prev) =>
              prev.map((group) =>
                  group.id === groupId && group.members < group.goal
                      ? { ...group, members: group.members + 1 }
                      : group
              )
          );
     };

     return (
         <GroupContext.Provider value={{ groups, joinGroup }}>
              {children}
         </GroupContext.Provider>
     );
};
