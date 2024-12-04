"use client";
import React, { useState } from "react";
import { DislikeIcon, LikeIcon, ThoughtsIcon } from "../../../icon";
import styles from "../../../style/pageStyle/reviewStyle/reviewCards.module.scss";

const ThoughtsCard = ({ onThoughtsChange }) => {
    const [emp_thougts, setThoughts] = useState("");

    const handleStatusChange = (e) => {
        const newValue = e.target.value;
        setThoughts(newValue);
        if (onThoughtsChange) {
            onThoughtsChange(newValue); // This should now correctly call with emp_thougts
        }
    };

    return (
        <div className={styles["status-card"]}>
            <div className={styles["header"]}>
                <div>
                    <ThoughtsIcon />
                </div>
                <div className={styles["sub-header"]}>
                    <p className={styles["title"]}>What do you think about this Company?</p>
                </div>
            </div>
            <div className={styles.thoughts}>
                <div className={styles.radios}>
                    <LikeIcon />
                    <label>A good company</label>
                    <input
                        type="radio"
                        value="good"
                        checked={emp_thougts === "good"}
                        onChange={handleStatusChange}
                    />
                </div>
                <div className={styles.radios}>
                    <DislikeIcon />
                    <label>Not a good company</label>
                    <input
                        type="radio"
                        value="not-good"
                        checked={emp_thougts === "not-good"}
                        onChange={handleStatusChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default ThoughtsCard;


