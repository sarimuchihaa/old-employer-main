import React from "react";
import Navbar from "../../../components/Topbar/Navbar2";
import Footer from "../../../components/Footer/Footer";

const EmployeeLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default EmployeeLayout;
