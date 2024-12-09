"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../style/pageStyle/searchStyle/employerSearch.module.scss";
import Input from "../../dump/SearchInput";
import Button from "../../dump/Button";
import Dropdown from "../../dump/Dropdown";
import { DislikeIcon, GridIcon, LikeIcon, ListIcon, LocationIcon, SearchIcon } from "../../icon";
import Pagination from "../../dump/Pagination";
import Link from "next/link";

const EmployeeSearches = () => {
  const router = useRouter();
  const [companies, setCompanies] = useState([]);
  const [viewType, setViewType] = useState("grid"); // Toggle b/w grid and list views.
  const totalPages = 4;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleViewTypeChange = (type) => {
    setViewType(type);
  };

  const handleCompanyClick = (companyId) => {
    router.push(`/employerProfile?companyId=${companyId}`);
  };

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
      }
    };

    fetchCompanies();
  }, []);

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const calculateRatings = (company) => {
    let goodCount = 0;
    let notGoodCount = 0;

    company.Reviews?.forEach((review) => {
      if (review.emp_thougts === "good") {
        goodCount += 1;
      } else if (review.emp_thougts === "not-good") {
        notGoodCount += 1;
      }
    });

    company.Endows?.forEach((endow) => {
      if (endow.emp_thougts === "good") {
        goodCount += 1;
      } else if (endow.emp_thougts === "not-good" || endow.emp_thougts === "bad") {
        notGoodCount += 1;
      }
    });

    return { goodCount, notGoodCount };
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const fraction = rating % 1;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span
          key={`full-${i}`}
          style={{
            color: "#fc9823",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          ★
        </span>
      );
    }

    if (fraction > 0) {
      const percentage = Math.round(fraction * 100);
      const partialStar = (
        <span
          key={`partial-${fullStars}`}
          style={{
            backgroundImage: `linear-gradient(to right, #fc9823 ${percentage}%, #ccc ${percentage}%)`,
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          ★
        </span>
      );
      stars.push(partialStar);
    }

    for (let i = fullStars + (fraction > 0 ? 1 : 0); i < 5; i++) {
      stars.push(
        <span
          key={`empty-${i}`}
          style={{
            color: "#ccc",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <div className={styles.search}>
      <div className={styles["content-container"]}>
        <div className={`${styles["form-container"]}`}>
          <div className={`${styles["form-content"]}`}>
            <div className={`${styles["input-group"]}`}>
              <SearchIcon />
              <Input
                placeholder={"Search Company/Employer or Keyword"}
                containerClassName={`${styles["input-width"]}`}
                onChange={handleInputChange}
                name={"searchText"}
              />
              <div className={styles.divider}></div>
              <LocationIcon />
              <div className={`${styles["dropdown-container"]}`}>
                <Dropdown
                  label={
                    <input
                      type="text"
                      onChange={(e) => setCitySearchText(e.target.value)}
                      placeholder="Choose Location"
                      className={styles["dropdown-input"]}
                      autoFocus
                    />
                  }
                  onSelect={(value) => handleCitySelect(value)}
                />
              </div>
            </div>
          </div>
          <Button text={"Search"} classes={styles["btn-join"]} />
        </div>
        <div className={styles["columns-container"]}>
          <div>
            <div className={styles["filter-group"]}>
              <label className={styles["filters-search"]}></label>
            </div>
          </div>
          <div className={styles["right-column"]}>
            <div className={styles["filtered-companies"]}>
            <div className="flex justify-between items-center pb-4">
  <h3>Showing: {companies.length} Filtered Startups</h3>
  <div className="flex gap-1.5">
    {/* Grid Icon */}
    <div
      className={`bg-white p-3 rounded-lg cursor-pointer transition-all ${
        viewType === "grid" ? "border-2 border-[#1f9798]" : "border-2 border-transparent"
      }`}
      onClick={() => handleViewTypeChange("grid")}
    >
      <GridIcon />
    </div>
    {/* List Icon */}
    <div
      className={`bg-white p-3 rounded-lg cursor-pointer transition-all ${
        viewType === "list" ? "border-2 border-[#1f9798]" : "border-2 border-transparent"
      }`}
      onClick={() => handleViewTypeChange("list")}
    >
      <ListIcon />
    </div>
  </div>
</div>
              <div
                className={
                  viewType === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    : "flex flex-wrap gap-12"
                }
              >
                {companies.length > 0 ? (
                  companies.map((company) => {
                    const logoData = company.logo ? JSON.parse(company.logo) : null;
                    let logoUrl = "/assets/images/logo-1.png";
                    if (logoData) {
                      logoUrl = `/assets/images/${logoData.originalname}`;
                    }

                    const { goodCount, notGoodCount } = calculateRatings(company);

                    return viewType === "grid" ? (
                      <div
                        key={company.id}
                        className="flex flex-col lg:flex-row justify-between items-center text-center 2xl:p-8 xl:p-6 lg:p-6 bg-white rounded-lg cursor-pointer shadow-md transform duration-200 transition-transform hover:scale-105 hover:bg-[#1c9596] hover:text-white group"
                        onClick={() => handleCompanyClick(company.id)}
                      >
                        {company.Reviews?.length > 0 || company.Endows?.length > 0 ? (
                          <>
                            {/* Left Side - Logo, Company Name, Stars */}
                            <div className="flex flex-col items-center lg:items-start lg:w-1/2">
                              <img src={logoUrl} alt="Logo" className="w-24 h-24 mb-4" />
                              <h4 className="text-lg font-bold">
                                {company.name || "Company Name Not Available"}
                              </h4>
                              <div className="flex items-center">
                                {renderStars(parseFloat(company.Reviews[0]?.calculatedOverallRating) || 0)}
                              </div>
                            </div>

                            {/* Right Side - Like/Dislike, Ratings */}
                            <div className="lg:w-1/2 flex flex-col items-center lg:items-end mt-4 lg:mt-0">
                              <div className="flex flex-col items-center justify-center lg:justify-end mb-4">
                                {/* Like */}
                                <div className="flex items-center">
                                  <LikeIcon />
                                </div>
                                <p className="text-sm">{goodCount}</p>
                                {/* Dislike */}
                                <div className="flex items-center mt-4">
                                  <DislikeIcon />
                                </div>
                                <p className="text-sm">{notGoodCount}</p>
                              </div>
                              <p className="text-sm">{company.country}</p>

                              {/* Overall Rating */}
                              <div className="flex items-center justify-center lg:justify-end">
                                <button className="bg-[#1c9596] text-white 2xl:px-2 2xl:py-2 xl:px-1 xl:py-1 lg:px-1 lg:py-1 rounded-md group-hover:bg-white group-hover:text-[#1c9596]">
                                  {company.Reviews[0]?.calculatedOverallRating
                                    ? (parseFloat(company.Reviews[0]?.calculatedOverallRating) || 0).toFixed(1)
                                    : "N/A"}
                                </button>
                                <p className="text-sm">Overall ratings</p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <p>No reviews or endows available.</p>
                        )}
                      </div>
                    ) : (
<div
  key={company.id}
  className="flex w-full 2xl:justify-between items-center text-center bg-white rounded-lg cursor-pointer shadow-md transform duration-200 transition-transform hover:scale-105 hover:bg-[#1c9596] hover:text-white group 2xl:p-4 xl:p-2 lg:p-4 md:p-4 sm:p-12 p-14 2xl:flex-row xl:flex-row lg:flex-row md:flex-col sm:flex-col flex-col"
  onClick={() => handleCompanyClick(company.id)}
>
  {company.Reviews?.length > 0 || company.Endows?.length > 0 ? (
    <>
      {/* Company Logo and Info Layout */}
      <div className="flex flex-row items-center space-x-4">
        {/* Logo */}
        <img src={logoUrl} alt="Logo" className="w-24 h-24 rounded-full object-cover" />

        {/* Company Name and Stars */}
        <div className="flex flex-col items-start">
          {/* Company Name */}
          <h4 className="text-lg font-bold mb-2">
            {company.name || "Company Name Not Available"}
          </h4>

          {/* Stars */}
          <div className="flex items-center mb-2">
            {renderStars(parseFloat(company.Reviews[0]?.calculatedOverallRating) || 0)}
          </div>
        </div>
      </div>

      {/* Ratings, Country Info, Like/Dislike (arranged at the end) */}
      <div className="flex flex-row items-center 2xl:justify-end lg:justify-end md:justify-between sm:justify-between space-x-6 w-full pt-2">
        <div className="flex flex-col items-center space-y-2">
          {/* Country Name */}
          <p className="text-sm mb-2">{company.country}</p>

          {/* Overall Rating */}
          <div className="flex items-center justify-center space-x-2">
            <button className="bg-[#1c9596] text-white px-4 py-2 rounded-md group-hover:bg-white group-hover:text-[#1c9596]">
              {company.Reviews[0]?.calculatedOverallRating
                ? (parseFloat(company.Reviews[0]?.calculatedOverallRating) || 0).toFixed(1)
                : "N/A"}
            </button>
            <p className="text-sm ml-2 space-y-4">Overall ratings</p>
          </div>
        </div>

        {/* Dislike */}
        <div className="flex flex-col items-center space-y-8 p-4">
          <DislikeIcon />
          <p className="text-sm mt-1">{notGoodCount}</p>
        </div>

        {/* Like */}
        <div className="flex flex-col items-center space-y-8 p-4">
          <LikeIcon />
          <p className="text-sm mt-1">{goodCount}</p>
        </div>
      </div>
    </>
  ) : (
    <p>No reviews or endows available.</p>
  )}
</div>
                    );
                  })
                ) : (
                  <p>No companies found.</p>
                )}
              </div>
              <Pagination currentPage={1} totalPages={totalPages} onPageChange={handlePageChange} />
              <Link href="/companies">
        <div className="w-full h-[150px] bg-[#1c9596] hover:bg-[#127f7f] text-white flex justify-center items-center rounded-lg font-sans transition-colors duration-300">
          <p>Add here...</p>
        </div>
      </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSearches;
