"use client";
import React from "react";
import {
  EmploymentsIcon,
  RecommendIcon,
  WorkingIcon,
} from "../../../icon";
import RatingItem from "../../EmployerProfile/RatingItem";
import 'react-toastify/dist/ReactToastify.css';
import styles from "../../../style/pageStyle/reviewStyle/ReviewDetails/commonCard.module.scss";

const InfoCard = ({ title, icon, environment, employment, recommendation }) => {

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
              label="Working Environment"
              icon={<WorkingIcon />}
              value={environment}
            />
          </div>
          <div className={styles["review-items"]}>
            <RatingItem
              label="Employment"
              icon={<EmploymentsIcon />}
              value={employment}
            />
          </div>
          <div className={styles["review-items"]}>
            <RatingItem
              label="Recommendations"
              icon={<RecommendIcon />}
              value={recommendation}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoCard;
