import React from "react";
import Banner from "../../../components/Employer/Banner";
import Tab from "../../../components/Topbar/Tab";
import Footer from "../../../components/Footer/Footer";
import Navbar from "../../../components/Topbar/Navbar2";

const EmployerProfileLayout = ({ children }) => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <Banner />
      <Tab />
      {children}
      <Footer />
    </>
  );
};

export default EmployerProfileLayout;
