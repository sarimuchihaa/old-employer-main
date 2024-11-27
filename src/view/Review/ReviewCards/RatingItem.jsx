"use client";
import React from "react";
import styles from "../../../style/pageStyle/reviewStyle/reviewCards.module.scss";

const RatingItem = ({ label, rating, onRatingChange }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      onClick={() => onRatingChange(index + 1)} // Calls onRatingChange with the star value (1-5)
      style={{ cursor: "pointer", color: index < rating ? "#FC9823" : "#ccc" }} // Updates star color based on rating
    >
      ★
    </span>
  ));

  return (
    <div className={styles["rating-item"]}>
      <label className={styles["rating-label"]}>{label}</label>
      <div className={styles["rating-content"]}>
        <div className={styles["stars"]}>{stars}</div>
        <button className={styles["rating-button"]}>{rating}/5</button>
        <p>Rating</p>
      </div>
    </div>
  );
};

export default RatingItem;
