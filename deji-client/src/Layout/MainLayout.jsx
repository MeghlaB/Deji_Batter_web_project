import React from "react";
import Navbar from "../components/Header/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-288px)] mb-15">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
