"use client";
import React, { useState } from "react";
import styles from "../../../style/pageStyle/reviewStyle/reviewCards.module.scss";

const RadioCard = ({ title, Icon, statusOptions = [], onStatusChange }) => {
  const [status, setStatus] = useState(undefined); // No default selection

  const handleStatusChange = (e) => {
    let selectedStatus = e.target.value;

    // Cast string values to boolean if necessary
    if (selectedStatus === "true") {
      selectedStatus = true;
    } else if (selectedStatus === "false") {
      selectedStatus = false;
    }

    setStatus(selectedStatus);
    if (onStatusChange) {
      onStatusChange(selectedStatus);
    }
  };

  return (
    <div className={styles["status-card"]}>
      <div className={styles["header"]}>
        {Icon && <div><Icon /></div>}
        <div className={styles["sub-header"]}>
          <p className={styles["title"]}>{title}</p>
        </div>
      </div>
      <div className={styles.description}>
        {statusOptions.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              value={option.value}
              checked={status === option.value}
              onChange={handleStatusChange}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioCard;
