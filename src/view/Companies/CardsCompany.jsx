import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../style/pageStyle/searchStyle/employerSearch.module.scss";
import { DislikeIcon, GridIcon, LikeIcon, ListIcon } from "../../icon";
import Pagination from "../../dump/Pagination";

const CardsCompany = () => {
  const router = useRouter();
  const [companies, setCompanies] = useState([]);
  const [viewType, setViewType] = useState("grid");
  const totalPages = 4;

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
    const fullStars = Math.floor(rating); // Number of fully filled stars.
    const fraction = rating % 1;          // Fractional part of rating.

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span
          key={`full-${i}`}
          style={{
            color: "#fc9823", // Full stars color.
            fontSize: "30px",
            cursor: "pointer",
          }}
        >
          ★
        </span>
      );
    }
    if (fraction > 0) {
      const percentage = Math.round(fraction * 100); // Convert fraction to percentage (e.g., 0.4 -> 40%).
      const partialStar = (
        <span
          key={`partial-${fullStars}`}
          style={{
            backgroundImage: `linear-gradient(to right, #fc9823 ${percentage}%, #ccc ${percentage}%)`, // Fill based on percentage.
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontSize: "30px",
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
            color: "#ccc",      // Empty stars color.
            fontSize: "30px",
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
    <div className={styles["right-column"]}>
      <div className={styles["filtered-companies"]}>
        <div className={styles["list-icons"]}>
          <h3>Showing: {companies.length} Filtered Startups</h3>
          <div className={styles["icons"]}>
            <div
              className={`${styles["icon"]} ${viewType === "grid" ? styles["active"] : ""}`}
              onClick={() => handleViewTypeChange("grid")}
            >
              <GridIcon />
            </div>
            <div
              className={`${styles["icon"]} ${viewType === "list" ? styles["active"] : ""}`}
              onClick={() => handleViewTypeChange("list")}
            >
              <ListIcon />
            </div>
          </div>
        </div>
        <div className={styles["companies-cards"]}>
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
                  className={styles["company-card"]}
                  onClick={() => handleCompanyClick(company.id)}
                >
                  <div className={styles["company-logo"]}>
                    <img src={logoUrl} alt="Logo" />
                    <h4>{company.name || "Company Name Not Available"}</h4>
                  </div>

                  {company.Reviews?.length > 0 || company.Endows?.length > 0 ? (
                    <div className={styles["company-info"]}>
                      <div>
                        <LikeIcon />
                        <p>{goodCount}</p>
                      </div>
                      <div>
                        <DislikeIcon />
                        <p>{notGoodCount}</p>
                      </div>

                      <p>{company.country}</p>

                      <div className={styles["ratings"]}>
                        <button className={styles["rating-button"]}>
                          {company.Reviews[0]?.calculatedOverallRating
                            ? (parseFloat(company.Reviews[0]?.calculatedOverallRating) || 0).toFixed(1)
                            : "N/A"}
                        </button>
                        <p>Overall Rating</p>

                        <div className={styles["stars"]}>
                          {renderStars(parseFloat(company.Reviews[0]?.calculatedOverallRating) || 0)}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p>No reviews or endows available.</p>
                  )}
                </div>
              ) : (
                <div
                  key={company.id}
                  className={styles["review-card"]}
                  onClick={() => handleCompanyClick(company.id)}
                >
                  <div className={styles["content"]}>
                    <div className={styles["company-logo"]}>
                      <img src={logoUrl} alt="Logo" />
                      <h4>{company.name || "Company Name Not Available"}</h4>
                    </div>
                  </div>

                  <div className={styles["actions"]}>
                    <div className={styles["ratings"]}>
                      <div>
                        <LikeIcon />
                        <p>{goodCount}</p>
                      </div>
                      <div>
                        <DislikeIcon />
                        <p>{notGoodCount}</p>
                      </div>
                      <div className={styles["ratingItem"]}>
                        <p>{company.country}</p>
                      </div>
                      <div className={styles["ratingItem"]}>
                      <button className={styles["rating-button"]}>
                          {company.Reviews[0]?.calculatedOverallRating
                            ? (parseFloat(company.Reviews[0]?.calculatedOverallRating) || 0).toFixed(1)
                            : "N/A"}
                        </button>
                        <p>Overall Ratings</p>
                        <div className={styles["stars"]}>
                          {renderStars(parseFloat(company.Reviews[0]?.calculatedOverallRating) || 0)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No reviews or endows available.</p>
          )}

          <Pagination />

          <div className={styles["vertical-ad-card"]}>
            <p>Add here...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsCompany;
