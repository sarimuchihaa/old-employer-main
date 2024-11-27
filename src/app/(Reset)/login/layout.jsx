import React from "react";
import Navbar from "../../../components/Topbar/Navbar2";

const ProfileLayout = ({ children }) => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      {children}
    </>
  );
};

export default ProfileLayout;
