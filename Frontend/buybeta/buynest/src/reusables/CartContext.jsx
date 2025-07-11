import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
     const [cartItems, setCartItems] = useState([]);

     const addToCart = (product) => {
          setCartItems((prevItems) => {
               const existingItem = prevItems.find((item) => item.id === product.id);
               if (existingItem) {
                    return prevItems.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
               } else {
                    return [...prevItems, { ...product, quantity: 1 }];
               }
          });
     };

     const removeFromCart = (id) => {
          setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
     };

     const clearCart = () => setCartItems([]);

     const increaseQuantity = (id) => {
          setCartItems((prevItems) =>
              prevItems.map((item) =>
                  item.id === id ? { ...item, quantity: item.quantity + 1 } : item
              )
          );
     };

     const decreaseQuantity = (id) => {
          setCartItems((prevItems) =>
              prevItems.map((item) =>
                  item.id === id
                      ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                      : item
              )
          );
     };

     const getCartCount = () =>
         cartItems.reduce((count, item) => count + item.quantity, 0);

     return (
         <CartContext.Provider
             value={{
                  cartItems,
                  addToCart,
                  removeFromCart,
                  clearCart,
                  getCartCount,
                  increaseQuantity,
                  decreaseQuantity,
             }}
         >
              {children}
         </CartContext.Provider>
     );
};

export const useCart = () => useContext(CartContext);
