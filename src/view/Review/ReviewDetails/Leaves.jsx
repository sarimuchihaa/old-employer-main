"use client";
import React from "react";
import {
  EmploymentsIcon,
  WorkingIcon,
} from "../../../icon";
import RatingItem from "../../EmployerProfile/RatingItem";
import 'react-toastify/dist/ReactToastify.css';
import styles from "../../../style/pageStyle/reviewStyle/ReviewDetails/commonCard.module.scss";

const LeavesCard = ({ title, icon, annually, monthly }) => {

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
              label="Annually Leaves"
              icon={<WorkingIcon />}
              value={annually}
            />
          </div>
          <div className={styles["review-items"]}>
            <RatingItem
              label="Monthly Leaves"
              icon={<EmploymentsIcon />}
              value={monthly}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LeavesCard;
