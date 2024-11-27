import React from "react";
import Banner from "../../../components/Profile/Banner";
import Tabs from "../../../components/Topbar/Tabs";
import Navbar from "../../../components/Topbar/Navbar2";
import Footer from "../../../components/Footer/Footer";

const ProfileLayout = ({ children }) => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <Banner />
      <Tabs />
      {children}
      <Footer />
    </>
  );
};

export default ProfileLayout;
