import { createBrowserRouter } from "react-router-dom";
import '../index.css'
import LandingPage from "../pages/LandingPage.jsx";
import SignUpPage from "../pages/Sign Up.jsx";
import DashBoard from "../pages/DashBoard.jsx";
import AddToCartPage from "../pages/AddToCartPage.jsx";
import AboutUs from "../pages/AboutUs.jsx";
import {ProductsPage} from "../pages/ProductsPage.jsx";
import WishlistPage from "../pages/WishListPage.jsx";
import {CategoriesPage} from "../pages/CategoriesPage.jsx";
import {StoresPage} from "../pages/StoresPage.jsx";
import {GroupPage} from "../pages/GroupPage.jsx";
import {JoinGroupPage} from "../pages/JoinGroupPage.jsx";
import {SingleStorePage} from "../pages/SingleStoresPage.jsx";
import {StoreDetailsPage} from "../pages/StoresDetailsPage.jsx";
import {StoreGroupListPage} from "../pages/StoreGroupListPage.jsx";
import {StoreProductsPage} from "../pages/StoreProductsPage.jsx";
import {TrackOrderPage} from "../pages/TrackOrderPage.jsx";
import {OrderPage} from "../pages/OrderPage.jsx";
import {CategoryGroupsPage} from "../pages/CategoryGroupsPage.jsx";
import SignInPage from "../pages/SignInPage.jsx";
import {BrowseItemsPage} from "../pages/BrowseItemsPage.jsx";


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
          path: '/Sign in',
          element: <SignInPage/>
     },
     {
          path: '/dashBoard',
          element: <DashBoard/>
     },
     {
          path: '/addToCart',
          element: <AddToCartPage/>
     },
     {
          path: '/about',
          element: <AboutUs/>
     },
     {
          path: '/product/:id',
          element: <ProductsPage/>
     },
     {
          path: '/wish',
          element: <WishlistPage/>
     },
     {
          path: '/categories',
          element: <CategoriesPage/>
     },
     {
          path: '/stores',
          element: <StoresPage/>
     },
     {
          path: '/group',
          element: <GroupPage/>
     },
     {
          path: '/join-group/:groupId',
          element: <JoinGroupPage/>
     },
     {
          path: '/store/:storeId',
          element: <SingleStorePage />
     },
     {
          path: '/store/:storeId',
          element: <StoreDetailsPage/>,
     },
     {
          path:"/store/:storeId/groups",
          element: <StoreGroupListPage/>,

     },
     {
          path:"/store/:storeId/products",
          element: <StoreProductsPage/>,

     },
     {
          path: '/track-order/:orderId',
          element: <TrackOrderPage/>
     },

     {
          path: '/order',
          element: <OrderPage/>
     },
     {
          path: '/category/:categoryId/groups',
          element: <CategoryGroupsPage/>
     },
     {
          path: '/category/:categoryId/items',
          element: <BrowseItemsPage/>
     }


]);


export default route;