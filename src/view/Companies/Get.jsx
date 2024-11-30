"use client";
import React, { useState, useEffect } from "react";
import styles from "../../style/pageStyle/searchStyle/employerSearch.module.scss";
import Button from "../../dump/Button";
import { GridIcon, ListIcon, LocationIcon, SearchIcon } from "../../icon";
import Pagination from "../../dump/Pagination";
import { searchCompany } from '../../services/company';

const Get = () => {
  const [companies, setCompanies] = useState([]);
  const [viewType, setViewType] = useState("grid"); // Toggle between grid and list views
  const totalPages = 4;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleViewTypeChange = (type) => {
    setViewType(type);
  };

  useEffect(() => {
    // Fetch companies on component mount
    const fetchCompanies = async () => {
      try {
        const response = await fetch("http://localhost:8000/company/all-companies");
        const data = await response.json();
        
        if (response.ok) {
          setCompanies(data); // Set companies data
        } else {
          console.error("Error fetching companies:", data.message);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className={styles.search}>
      <div className={styles["content-container"]}>
        <div className={styles["form-container"]}>
          <div className={styles["input-group"]}>
            <SearchIcon />
            <input
              type="text"
              placeholder="Search Company/Employer or Keyword"
              className={styles["search-input"]}
            />
            <div className={styles.divider}></div>
            <LocationIcon />
            <input
              type="text"
              placeholder="Choose Location"
              className={styles["location-input"]}
            />
          </div>
          <Button text="Search" classes={styles["btn-join"]} />
        </div>

        <div className={styles["view-toggle"]}>
          <button onClick={() => handleViewTypeChange("grid")} className={viewType === "grid" ? styles.active : ""}>
            <GridIcon />
          </button>
          <button onClick={() => handleViewTypeChange("list")} className={viewType === "list" ? styles.active : ""}>
            <ListIcon />
          </button>
        </div>

        <div className={styles["company-list-container"]}>
          {companies.length > 0 ? (
            companies.map((company) => (
              <div key={company.id} className={viewType === "grid" ? styles.gridItem : styles.listItem}>
                <div className={styles["company-name"]}>
                  <h3>{company.name}</h3>
                  <p>{company.industry}</p>
                </div>
                <div className={styles["company-info"]}>
                  <div className={styles["company-location"]}>{company.location}</div>
                  <div className={styles["company-rating"]}>Rating: {company.rating}</div>
                </div>
              </div>
            ))
          ) : (
            <p>No companies found</p>
          )}
        </div>

        <Pagination currentPage={1} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default Get;
