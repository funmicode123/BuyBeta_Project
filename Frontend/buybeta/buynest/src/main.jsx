import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './reusables/CartContext.jsx';
import {WishlistProvider} from "./reusables/WishListContext.jsx";
import {GroupProvider} from "./reusables/GroupContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
         <GroupProvider>
              <WishlistProvider>
                   <CartProvider>
                        <App />
                   </CartProvider>
              </WishlistProvider>
         </GroupProvider>
    </StrictMode>
);
