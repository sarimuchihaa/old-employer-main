import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import styles from "../../../style/pageStyle/employerProfile/ratting.module.scss";
import RatingItem from "./RatingsItem";

const RattingCard = ({ compensation, work_balance, career_opportunities, cutlers }) => {


  return (
    <div className={styles["contact-container"]}>
      <div className={styles["rating"]}>
        <RatingItem
          label="Compensation & Benefits"
          rating={compensation}
        />
        <RatingItem
          label="Work-Life Balance"
          rating={work_balance}
        />
      </div>
      <div className={styles["rating"]}>
        <RatingItem
          label="Career Opportunities"
          rating={career_opportunities}
        />
        <RatingItem
          label="Culture & Values"
          rating={cutlers}
        />
      </div>
    </div >
  );
};

export default RattingCard;
