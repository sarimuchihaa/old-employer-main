import React from "react";
import styles from "../../style/pageStyle/dashboard/cards.module.scss";
import "../../style/pageStyle/dashboard/SrdCard.scss"; // Import SrdCard CSS module
import { RatingIcon } from "../../icon/index"; // Import RatingIcon

const RankCard = ({ rankNumber, rankChange, isSrdCard }) => {
  return (
    <div>
      <div className={styles.part1}>
        <p>Rank in Hall of Fame</p>
        <div className={styles.rank}>
          <div className={styles.rankText}>
            <span className={styles.rankNumber}>{rankNumber}</span>
            <span className={styles.rankChange}>{rankChange}</span>
          </div>
          <div className={styles.rate}>
            <RatingIcon /> {/* Add RatingIcon */}
          </div>
        </div>
      </div>

      {isSrdCard && (
        <div className="srd-card">
          <h3>Update your Profile</h3>
          <div className="content">
            <button className="update-button">Update</button>
            <div className="text">
              <h3>Get Access Millions of CV's</h3>
              <p>Defend your company!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RankCard;