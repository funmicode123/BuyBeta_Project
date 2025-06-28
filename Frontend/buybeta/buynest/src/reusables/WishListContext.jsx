import React, { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
     const [wishlistItems, setWishlistItems] = useState([]);

     const addToWishlist = (item) => {
          setWishlistItems((prev) =>
              prev.some((i) => i.id === item.id) ? prev : [...prev, item]
          );
     };

     const removeFromWishlist = (id) => {
          setWishlistItems((prev) => prev.filter((item) => item.id !== id));
     };

     const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);

     return (
         <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}>
              {children}
         </WishlistContext.Provider>
     );
};
