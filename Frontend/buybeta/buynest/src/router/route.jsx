import { createBrowserRouter } from "react-router-dom";
import '../index.css'
import LandingPage from "../pages/LandingPage.jsx";
import SignUpPage from "../pages/Sign Up.jsx";
import DashBoard from "../pages/DashBoard.jsx";
import AddToCartPage from "../pages/AddToCartPage.jsx";


const route = createBrowserRouter([
     {
          path: '/',
          element: <LandingPage />
     },
     {
          path: '/Sign up',
          element: <SignUpPage/>
     },
     {
          path: '/dashBoard',
          element: <DashBoard/>
     },
     {
          path: '/addToCart',
          element: <AddToCartPage/>
     },
]);

export default route;