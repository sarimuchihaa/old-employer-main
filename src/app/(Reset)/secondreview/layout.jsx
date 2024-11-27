import React from "react";
import Navbar from "../../../components/Topbar/Navbar2";
import Footer from "../../../components/Footer/Footer";

const ReviewLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default ReviewLayout;
