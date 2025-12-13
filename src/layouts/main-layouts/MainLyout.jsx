import React from "react";
import Navbar from "../../component/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../../component/footer/Footer";

const MainLyout = () => {
  return (
    <div className="flex flex-col min-h-screen">
   
        <Navbar></Navbar>
  
      <div className="flex-grow">
        <Outlet></Outlet>
      </div>

        <Footer></Footer>

    </div>
  );
};

export default MainLyout;
