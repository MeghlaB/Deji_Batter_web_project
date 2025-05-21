import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../components/Home/Home";
import Product from "../Pages/Product";
import BLUCK_ORDERS from "../Pages/BLUCK_ORDERS";
import Contact from "../Pages/Contact";
import Blog from "../Pages/Blog";
import Cart from "../Pages/Cart";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Dashbaord from "../Dashboard/Dashbaord";
import AddProductForm from "../Dashboard/AdminDashboard/AdminFeauter/AddProduct";
import ProductDetails from "../Pages/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:'/products',
        element:<Product/>
      },
      {
        path:'/b2b',
        element:<BLUCK_ORDERS/>
      },
      {
        path:'/contact',
        element:<Contact/>
      },
      {
        path:'/blog',
        element:<Blog/>
      },
      {
        path:'/cart',
        element:<Cart/>
      },{
        path:'/auth/login',
        element:<Login/>
      },
      {
        path:'/auth/register',
        element:<Register/>
      },
      {
        path:'/products/:id',
        element:<ProductDetails/>
      }
    ],
  
    
  },
  // dashbaord
 {
  path: '/dashboard',
  element: <Dashbaord />,
  children: [
    {
      path: 'addproduct',
      element: <AddProductForm />
    }
  ]
}

]);

export default router;
