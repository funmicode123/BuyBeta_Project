import {ToastContainer} from "react-toastify";
import './App.css'
import {RouterProvider} from "react-router-dom";
import route from "./router/route.jsx";

function App() {

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}/>
      <RouterProvider router={route}/>
    </>
  )
}

export default App
