import {
  BarChart2,
  BookImageIcon,
  Boxes,
  ClipboardList,
  Home,
  HomeIcon,
  Newspaper,
  User,
  UserPlus,
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaCartPlus } from "react-icons/fa";

function AdminDashboard() {
  return (
    <aside className="h-full w-full bg-gray-800 text-white px-4 py-6">
      <div className="text-2xl font-bold mb-10">Admin</div>

      <div className="pb-4 flex flex-col gap-2">
        <Link to="/dashboard/adminhome" className="flex items-center gap-3 hover:text-gray-300">
          <Home size={20} />
          Admin Home
        </Link>
        <Link to="/dashboard/addproduct" className="flex items-center gap-3 hover:text-gray-300">
          <FaCartPlus size={20} />
          Add Product
        </Link>
        <Link to="/dashboard/manage-products" className="flex items-center gap-3 hover:text-gray-300">
           <Boxes size={20} />
          Manage Product
        </Link>
        <Link to="/dashboard/manage-oders" className="flex items-center gap-3 hover:text-gray-300">
           <ClipboardList size={20}/>
          Manage Oders
        </Link>
        <Link to="/dashboard/add-news" className="flex items-center gap-3 hover:text-gray-300">
          <Newspaper size={20} />
          Add News
        </Link>
        <Link to="/" className="flex items-center gap-3 hover:text-gray-300">
          <HomeIcon size={20} />
         Home
        </Link>
      </div>

     
    </aside>
  );
}

export default AdminDashboard;
