"use client";
import React, { useState, useEffect } from "react";
import { RatingIcon } from "../../../icon";
import styles from "../../../style/pageStyle/reviewStyle/reviewCards.module.scss";
import RatingItem from "./RatingItem";

const RatingsCard = ({ onRatingsChange }) => {
    const [ratings, setRatings] = useState({
        compensation: 0,
        work_balance: 0,
        career_opportunities: 0,
        cutlers: 0,
    });

    const handleRatingChange = (category, value) => {
        console.log(`Updating ${category} to ${value}`);

        setRatings((prevRatings) => ({
            ...prevRatings,
            [category]: value,
        }))

        onRatingsChange(category, value);
    };

    return (
        <div className={styles["status-card"]}>
            <div className={styles["header"]}>
                <div>
                    <RatingIcon />
                </div>
                <div className={styles["sub-header"]}>
                    <p className={styles["title"]}>Overall Rating</p>
                </div>
            </div>
            <div className={styles["rating"]}>
                <RatingItem
                    label="Compensation & Benefits"
                    rating={ratings.compensation}
                    onRatingChange={(value) => handleRatingChange("compensation", value)}
                />
                <RatingItem
                    label="Work-Life Balance"
                    rating={ratings.work_balance}
                    onRatingChange={(value) => handleRatingChange("work_balance", value)}
                />
                <RatingItem
                    label="Career Opportunities"
                    rating={ratings.career_opportunities}
                    onRatingChange={(value) => handleRatingChange("career_opportunities", value)}
                />
                <RatingItem
                    label="Culture & Values"
                    rating={ratings.cutlers}
                    onRatingChange={(value) => handleRatingChange("cutlers", value)}
                />
            </div>
        </div>
    );
};

export default RatingsCard;
