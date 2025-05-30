import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import { ImCross, ImMenu } from 'react-icons/im';
import AdminDashboard from './AdminDashboard/AdminDashboard';



export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const isAdmin = true; 
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`flex h-screen`}>
      {/* Sidebar */}
      <div
        className={`fixed top-0 bg-gray-800 text-white left-0 z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 w-80 min-h-screen p-4`}
      >
        {/* Close Button */}
        <button
          onClick={toggleSidebar}
          className={`btn bg-green-600 text-white text-3xl btn-sm absolute top-2 right-4`}
        >
          <ImCross  />
        </button>

        {/* Sidebar Content */}
        <AdminDashboard/>
        {/* {isAdmin ? <AdminDashboard /> : <UserDashboard/>} */}
      </div>

      {/* Main Content */}
      <div className={`flex-1`}>
        {/* Drawer Toggle Button */}
        <div className="p-4">
          <button
            onClick={toggleSidebar}
            className="btn bg-green-600 text-white drawer-button text-3xl"
          >
            <ImMenu />
          </button>
        </div>

        {/* Outlet for Nested Routes */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
