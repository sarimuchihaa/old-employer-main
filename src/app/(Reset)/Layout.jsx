import Navbar from "../../components/Topbar/Navbar2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      {children}
      <ToastContainer />
    </div>
  );
};

export default Layout;
