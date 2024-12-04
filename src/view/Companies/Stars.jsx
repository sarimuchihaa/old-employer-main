"use client";

import React, { useState, useEffect } from "react";
import { LikeIcon, DislikeIcon } from "../../icon";
import styles from "../../style/pageStyle/searchStyle/employerSearch.module.scss";

// Stars Component to Display Individual Company Details
const Stars = ({ company }) => {
  const [goodCount, setGoodCount] = useState(0);
  const [notGoodCount, setNotGoodCount] = useState(0);

  useEffect(() => {
    // Safely check for Reviews before accessing properties
    if (Array.isArray(company?.Reviews) && company.Reviews.length > 0) {
      const goodCounter = company.Reviews.filter((review) => review.emp_thougts === "good").length;
      const notGoodCounter = company.Reviews.filter((review) => review.emp_thougts === "bad").length;

      setGoodCount(goodCounter);
      setNotGoodCount(notGoodCounter);
    }
  }, [company?.Reviews]);

  return (
    <div key={company.id} className={styles["company-card"]}>
      {/* Company Logo and Name */}
      <div className={styles["company-logo"]}>
        <img src={company.logo || "/placeholder-logo.png"} alt={`${company.name} Logo`} />
        <h4>{company.name}</h4>
      </div>

      {/* Company Info Section */}
      <div className={styles["company-info"]}>
        <div>
          <LikeIcon />
          <p>{goodCount} Employees say it's good</p>
        </div>
        <div>
          <DislikeIcon />
          <p>{notGoodCount} Employees say it's not good</p>
        </div>
        <p>{company.country || "Country not specified"}</p>
        <div className={styles["ratings"]}>
          <p>Overall Rating: {company.calculatedOverallRating || "N/A"}</p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className={styles["reviews"]}>
        {Array.isArray(company?.Reviews) && company.Reviews.length > 0 ? (
          company.Reviews.map((review) => (
            <div key={review.id} className={styles["review-card"]}>
              <p>
                <strong>Employee Thoughts:</strong> {review.emp_thougts || "No thoughts provided"}
              </p>
            </div>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </div>
    </div>
  );
};

// Company Grid to Display All Companies
const CompanyGrid = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);

  const getCompanyData = async () => {
    const response = await fetch("http://localhost:8000/company/all-companies");
    return response;
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getCompanyData();
        if (!response || !response.ok) {
          throw new Error(`HTTP error! Status: ${response?.status || "No response"}`);
        }

        const data = await response.json();
        setCompanies(data);
      } catch (err) {
        console.error("Error fetching companies:", err.message);
        setError(err.message);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className={styles["grid-container"]}>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        companies.map((company) => <Stars key={company.id} company={company} />)
      )}
    </div>
  );
};

export default CompanyGrid;
