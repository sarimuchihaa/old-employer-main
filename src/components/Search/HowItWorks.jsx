import React from 'react';
import styles from "../../style/pageStyle/searchStyle/HowItWorks.module.scss";

const HowItWorks = () => {
  return (
    <div className={styles.howItWorks}>
      <div className={styles.description}>
        <h2>How it works</h2>
        <hr className={styles.underline} />
        <div className={styles.divider}></div> {/* Add this divider */}
        <p>
          The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
          Sections 1.10.32 and 1.10.33 also reproduced in their exact original form, accompanied by English versions.
        </p>
      </div>
      <div className={styles.features}>
        <div className={styles.row}>
          <p><b>Reach quality talent</b></p>
          <p>Search Employ or Employer</p>
        </div>
        <div className={styles.row}>
          <p><b>No need to pay HR companies</b></p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
