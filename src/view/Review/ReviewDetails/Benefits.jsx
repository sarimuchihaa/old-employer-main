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

const BenefitsCard = ({ title, icon, Insurance, Residence, Benovland, Medical, Other }) => {

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
              label="Insurance"
              icon={<WorkingIcon />}
              value={Insurance}
            />
          </div>
          <div className={styles["review-items"]}>
            <RatingItem
              label="Residence"
              icon={<EmploymentsIcon />}
              value={Residence}
            />
          </div>
          <div className={styles["review-items"]}>
            <RatingItem
              label="Benovland"
              icon={<RecommendIcon />}
              value={Benovland}
            />
          </div>
          <div className={styles["review-items"]}>
            <RatingItem
              label="Medical"
              icon={<WorkingIcon />}
              value={Medical}
            />
          </div>
          <div className={styles["review-items"]}>
            <RatingItem
              label="Other Benefits"
              icon={<WorkingIcon />}
              value={Other}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BenefitsCard;
