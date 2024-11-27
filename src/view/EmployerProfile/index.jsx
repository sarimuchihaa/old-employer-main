"use client";
import React from "react";
import RattingCard from "./RattingCard";
import AboutCard from "./AboutCard";
import TotalReviews from "./ReviewsCard";
import EndowsCard from "./EndowsCard";
import styles from "../../style/pageStyle/employerProfile/profile.module.scss"
const EmployerProfileView = ({ props }) => {
  return (
    <div className={styles.profile}>
      <div className={styles['content-container']}>
        <div className={styles['center-column']}>
          <AboutCard />
        </div>
        <div className={styles['left-column']}>
          <RattingCard />
          <EndowsCard />
        </div>
        <div className={styles['right-column']}>
          <TotalReviews />
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const resp = await profile();

  const data = resp.data;
  return {
    props: {
      data,
    },
  };
}

export default EmployerProfileView;
