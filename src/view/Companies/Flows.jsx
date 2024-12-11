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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCompanies, setTotalCompanies] = useState([]); // Keep track of all companies

  const companiesPerPage = 12;
  const totalPages = Math.ceil(totalCompanies.length / companiesPerPage); // Calculate total pages based on the total companies.

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
        setTotalCompanies(data); // Store the full list of companies
      } catch (err) {
        console.error("Error fetching companies:", err.message);
      }
    };

    fetchCompanies();
  }, []);

  // Calculate the start and end indices for slicing the companies array
  const startIndex = (currentPage - 1) * companiesPerPage;
  const endIndex = startIndex + companiesPerPage;
  const currentCompanies = totalCompanies.slice(startIndex, endIndex);

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
        <div className={styles["form-container"]}>
          <div className={styles["form-content"]}>
            <div className={styles["input-group"]}>
              <SearchIcon />
              <Input
                placeholder={"Search Company/Employer or Keyword"}
                containerClassName={styles["input-width"]}
                name={"searchText"}
              />
              <div className={styles.divider}></div>
              <LocationIcon />
              <div className={styles["dropdown-container"]}>
                <Dropdown
                  label={
                    <input
                      type="text"
                      placeholder="Choose Location"
                      className={styles["dropdown-input"]}
                    />
                  }
                />
              </div>
            </div>
          </div>
          <Button text={"Search"} classes={styles["btn-join"]} />
        </div>
        <div className={styles["columns-container"]}>
          <div className={styles["right-column"]}>
            <div className={styles["filtered-companies"]}>
              <div className="flex justify-between items-center pb-4">
                <h3>Showing: {currentCompanies.length} Filtered Startups</h3>
                <div className="flex gap-1.5">
                  <div
                    className={`bg-white p-3 rounded-lg cursor-pointer transition-all ${
                      viewType === "grid" ? "border-2 border-[#1f9798]" : "border-2 border-transparent"
                    }`}
                    onClick={() => handleViewTypeChange("grid")}
                  >
                    <GridIcon />
                  </div>
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
                {currentCompanies.length > 0 ? (
                  currentCompanies.map((company) => {
                    const logoData = company.logo ? JSON.parse(company.logo) : null;
                    const { goodCount, notGoodCount } = calculateRatings(company);

                    return (
                      <div key={company._id} className="flex flex-col gap-4">
                        <div
                          className="card"
                          style={{
                            backgroundImage: `url(${logoData?.url || "/fallback-image.jpg"})`,
                            backgroundSize: 'cover', // Ensure the background fits correctly
                            backgroundPosition: 'center',
                            minHeight: '200px',
                          }}
                          onClick={() => handleCompanyClick(company._id)}
                        >
                          <h3>{company.name}</h3>
                          <div>{renderStars(company.rating || 0)}</div>
                          <div className="flex items-center mt-2">
                            <LikeIcon />
                          </div>
                          <p className="text-sm">{goodCount}</p>
                          <div className="flex items-center mt-2">
                            <DislikeIcon />
                          </div>
                          <p className="text-sm">{notGoodCount}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-lg font-bold">No reviews available.</div>
                )}
              </div>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSearches;
