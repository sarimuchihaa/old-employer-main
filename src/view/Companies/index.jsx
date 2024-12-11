// Imports.
import React from "react";
import CustomAd from "../../view/Companies/CustomAd.jsx";
import GoogleAd from "../../view/Companies/GoogleAd.jsx";
import EmployeeSearches from "../../view/Companies/EmployeeSearches.jsx";

// Frontend.
const ShowCompanies = () => {
  return (
    <div>
      <EmployeeSearches />
      <div>
        <GoogleAd />
        <CustomAd />
      </div>
    </div>
  );
};

export default ShowCompanies;
