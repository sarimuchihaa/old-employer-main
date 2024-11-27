"use client";
import React from "react";
import {
  EmploymentsIcon,
  RecommendIcon,
  WorkingIcon,
} from "../../../icon";
import RatingItem from "../../EmployerProfile/RatingItem";
import 'react-toastify/dist/ReactToastify.css';
import styles from "../../../style/pageStyle/employerProfile/about.module.scss";

const SalaryCard = ({ title, icon, range, paytime, bonnes, increment, duration }) => {

  return (
    <>
      <div className={styles["about-card"]}>
        <div className={styles["about"]}>
          <div className={styles["header"]}>
            <div>
              {icon}
            </div>
            <div className={styles["sub-header"]}>
              <p className={styles["title"]}>{title}</p>
            </div>
          </div>
          <div className={styles["review-items"]}>
            <RatingItem
              label="Salary Range"
              icon={<WorkingIcon />}
              value={range}
            />
          </div>
          <div className={styles["review-items"]}>
            <RatingItem
              label="Pay Salary On Time?"
              icon={<EmploymentsIcon />}
              value={paytime}
            />
          </div>
          <div className={styles["review-items"]}>
            <RatingItem
              label="Bonnes"
              icon={<RecommendIcon />}
              value={bonnes}
            />
          </div>
          <div className={styles["review-items"]}>
            <RatingItem
              label="Increment"
              icon={<WorkingIcon />}
              value={increment}
            />
          </div>
          <div className={styles["review-items"]}>
            <RatingItem
              label="Increment Duration"
              icon={<WorkingIcon />}
              value={duration}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SalaryCard;
