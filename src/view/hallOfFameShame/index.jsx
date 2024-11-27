"use client";
import React from "react";
import Image from "next/image";
import styles from "../../style/pageStyle/halloffame/CompanyTable.module.scss"; // Import the styles
import HallFame from "./HallFame"; // Import HallFame component
import CompanyTable from "./CompanyTable"; // Import CompanyTable component
import WelcomeBanner from "./WelcomeBanner"; // Import WelcomeBanner component
import Pagination from "./Pagination"; // Import Pagination component

const HallView = ({ props }) => {
  return (
    <div className={styles.hallOfFame}>
      {/* <div className={styles.hallOfFameCard}>
        <div className={styles.logo}>
          <ManIcon />
        </div>
        <div className={styles.content}>
          <p>Andropple lab's rank is 1530 in hall of fame</p>
        </div>
        <div className={styles.actions}>
          <div className={styles.ratings}>
            <div className={styles.ratingItem}>
              <DislikeIcon style={{ color: 'red' }} /> <span>18</span>
            </div>
            <div className={styles.ratingItem}>
              <LikeIcon style={{ color: 'green' }} /> <span>150</span>
            </div>
          </div>
          <button className={styles.visitButton}>Visit the hall of fame</button>
        </div>
      </div> */}

      <div className={styles.body} style={{ backgroundColor: "#eaf0ff" }}>
        <WelcomeBanner /> {/* Add WelcomeBanner component */}
        <div className="plan-card-section">
          <HallFame />
        </div>
        <div className="company-table-section">
          <CompanyTable />
          <Pagination /> {/* Add Pagination component */}
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

export default HallView;
