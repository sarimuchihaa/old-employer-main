"use client";
import React from "react";
import styles from "../../style/pageStyle/employerProfile/about.module.scss";

const RatingItem = ({ label, value, icon }) => {

  return (
    <>
      <div className={styles["item"]}>
        <div className={styles["content"]}>
          <div className={styles["icon"]}>{icon}</div>
          <label className={styles["label"]}>{label}</label>
        </div>
        <p className={styles["value"]}>{value}</p>
      </div >
    </>

  );
};

export default RatingItem;
