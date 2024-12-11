import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../style/pageStyle/searchStyle/employerSearch.module.scss";
import Input from "../../dump/SearchInput";
import Button from "../../dump/Button";
import Dropdown from "../../dump/Dropdown";
import { DislikeIcon, GridIcon, LikeIcon, ListIcon, LocationIcon, SearchIcon } from "../../icon";
import Pagination from "../../dump/Pagination";

const EmployeeSearches = () => {
  const router = useRouter();
  const [companies, setCompanies] = useState([]);
  const [viewType, setViewType] = useState("grid"); // Toggle b/w grid and list views.
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = viewType === "grid" ? 12 : 6;
  const totalPages = Math.ceil(companies.length / companiesPerPage);

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
          throw new Error(
            `HTTP error! Status: ${response?.status || "No response"}`
          );
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

  // Scroll to top when currentPage changes.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Calculate start and end indices for slicing companies array.
  const startIndex = (currentPage - 1) * companiesPerPage;
  const endIndex = startIndex + companiesPerPage;
  const currentCompanies = companies.slice(startIndex, endIndex);

  // Insert a random ad card.
  const insertAdCard = (cards) => {
    const adCard = (
      <div key="ad-card" className={styles["vertical-ad-card"]}>
        <p>Ad here...</p>
      </div>
    );

    // Randomly choose a position to insert the ad card
    const randomIndex = Math.floor(Math.random() * (cards.length + 1));
    cards.splice(randomIndex, 0, adCard);
    return cards;
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

  // Randomly insert the ad card into the list of companies
  const displayedCompanies = insertAdCard([...currentCompanies]);

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
                <h3>Showing: {displayedCompanies.length} Filtered Startups</h3>
                <div className="flex gap-1.5">
                  {/* Grid Icon */}
                  <div
                    className={`bg-white p-3 rounded-lg cursor-pointer transition-all ${viewType === "grid" ? "border-2 border-[#1f9798]" : "border-2 border-transparent"}`}
                    onClick={() => handleViewTypeChange("grid")}
                  >
                    <GridIcon />
                  </div>
                  {/* List Icon */}
                  <div
                    className={`bg-white p-3 rounded-lg cursor-pointer transition-all ${viewType === "list" ? "border-2 border-[#1f9798]" : "border-2 border-transparent"}`}
                    onClick={() => handleViewTypeChange("list")}
                  >
                    <ListIcon />
                  </div>
                </div>
              </div>
              <div
                className={viewType === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" : "flex flex-wrap gap-12"}
              >
                {displayedCompanies.length > 0 ? (
                  displayedCompanies.map((company) => {
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
                        {/* Company details here */}
                      </div>
                    ) : (
                      <div
                        key={company.id}
                        className="flex items-center gap-6 px-8 py-5 bg-white rounded-lg cursor-pointer shadow-md transform duration-200 transition-transform hover:scale-105 hover:bg-[#1c9596] hover:text-white group"
                        onClick={() => handleCompanyClick(company.id)}
                      >
                        {/* Company details here */}
                      </div>
                    );
                  })
                ) : (
                  <p>No companies found.</p>
                )}
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
    </div>
  );
};

export default EmployeeSearches;
