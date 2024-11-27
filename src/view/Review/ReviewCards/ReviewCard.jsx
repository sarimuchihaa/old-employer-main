"use client";
import React, { useState } from "react";
import styles from "../../../style/pageStyle/reviewStyle/reviewCards.module.scss";

const ReviewCard = ({ title, Icon, onStatusChange }) => {
    const [public_review, setPublicReview] = useState("");

    const handleStatusChange = (e) => {
        const selectedStatus = e.target.value;
        setPublicReview(selectedStatus);
        console.log("Selected Status:", selectedStatus); // Log the selected status
        if (onStatusChange) {
            onStatusChange(selectedStatus);
        }
    };


    return (
        <div className={styles["status-card"]}>
            <div className={styles["header"]}>
                {Icon && (
                    <div>
                        <Icon />
                    </div>
                )}
                <div className={styles["sub-header"]}>
                    <p className={styles["title"]}>{title}</p>
                </div>
            </div>
            <div className={styles.description}>
                <textarea
                    className={styles.textarea}
                    placeholder={"Write here..."}
                    value={public_review}
                    onChange={handleStatusChange}
                    rows={5}
                />
            </div>
        </div>
    );
};

export default ReviewCard;
