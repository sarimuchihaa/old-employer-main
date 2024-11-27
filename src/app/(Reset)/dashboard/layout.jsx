import React from "react";
import Navbar from "../../../components/Topbar/Navbar2";
import Footer from "../../../components/Footer/Footer";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      {children}
      <Footer />
    </>
  );
};

export default DashboardLayout;
