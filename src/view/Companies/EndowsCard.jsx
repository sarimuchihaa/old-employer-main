"use client";
import React, { useState, useEffect } from "react";
import { DislikeIcon, LikeIcon } from "../../icon";
import styles from "../../style/pageStyle/employerProfile/endows.module.scss";
import Button from "../../dump/Button";
import { getReviewData, endowsReview, getEndowsData } from "../../services/review";
import { useSearchParams } from "next/navigation";
import CompanyNameModal from "../Review/Popups/CompanyName";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ThoughtsCard = () => {
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [endowsData, setEndowsData] = useState({
    emp_thougts: "",
    companyId: "",
  });

  useEffect(() => {
    const fetchReview = async () => {
      if (!companyId) return;

      try {
        // Fetch data from both reviews and endows tables
        const reviews = await getReviewData(companyId);
        const endows = await getEndowsData(companyId);

        console.log("Fetched reviews and endows:", reviews, endows);

        // Initialize counters
        let yesCounter = 0;
        let noCounter = 0;

        // Combine and process each review from both tables to count "yes" and "no"
        const allReviews = [...(reviews || []), ...(endows || [])];
        console.log("all: ", allReviews);
        allReviews.forEach((item) => {
          // Check if the thought is 'yes' or 'no'
          if (item.emp_thougts === 'good') {
            yesCounter++;
          } else if (item.emp_thougts === 'bad') {
            noCounter++;
          }
        });

        // Set the counts in state
        setYesCount(yesCounter);
        setNoCount(noCounter);

        if (allReviews.length === 0) {
          console.error("Review data not available");
        }
      } catch (error) {
        console.error("Error fetching review data:", error);
        console.error("Failed to load Review data");
      }
    };

    fetchReview();
  }, [companyId]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleContinue = (companyName) => {
    console.log("Company Name:", companyName);
  };

  const handleSubmitEndows = async (reviewType) => {
    const updatedEndowsData = {
      ...endowsData,
      emp_thougts: reviewType === "good" ? "good" : "bad",
      companyId: companyId,
    };

    const requiredFields = ["emp_thougts", "companyId"];
    for (const field of requiredFields) {
      if (!updatedEndowsData[field]) {
        toast.error(`Please fill out the required field: ${field}`);
        return;
      }
    }

    try {
      const response = await endowsReview(updatedEndowsData);
      toast.success("Endow submitted successfully");

      // Update local counts immediately if re-fetching data isn't desired
      if (reviewType === "good") {
        setYesCount(prev => prev + 1);
      } else {
        setNoCount(prev => prev + 1);
      }

      setEndowsData((prevData) => ({
        ...prevData,
        id: response.data.endows.id,
      }));
    } catch (error) {
      toast.error("Endows already exists or failed to submit");
    }
  };

  return (
    <div className={styles["status-card"]}>
      <div className={styles.thoughts}>
        <div className={styles.radios}>
          <strong>{yesCount} Employees say</strong>
          <p>Andropple Soft</p>
          <LikeIcon />
          <label>A good company</label>
          <strong>{yesCount}</strong>
          <Button
            text={"Endows Review"}
            classes={styles["btn-endows"]}
            onClick={() => handleSubmitEndows("good")}
          />
          <div className={styles["radio-divider"]}></div>
        </div>
        <div className={styles.radios}>
          <strong>{noCount} Employees say</strong>
          <p>Andropple Soft</p>
          <DislikeIcon />
          <label>Not a good company</label>
          <strong>{noCount}</strong>
          <Button
            text={"Endows Review"}
            classes={styles["btn-endows"]}
            onClick={() => handleSubmitEndows("bad")}
          />
        </div>
        <div className={styles["add-card"]}>
          <p>We are not share your private information with any company/parson so feel free and share your review
            about your proves/current company. You are able to hide your info in review.</p>
          <Button
            text={"Add Review"}
            classes={styles["btn-join"]}
            onClick={handleOpenModal}
          />
          <CompanyNameModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onContinue={handleContinue}
          />
        </div>
      </div>
    </div>
  );
};

export default ThoughtsCard;


