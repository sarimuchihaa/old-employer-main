import React from "react";
import { HelpIcon } from "../../../icon";
import Image from "next/image";
import styles from "../../../style/pageStyle/profileStyle/company.module.scss";

const CompanyDetailCard = ({ currentJob }) => {
  // Initialize variables to handle null cases
  let logoURL = '';
  let companyName = 'Unknown Company';
  let location = 'Location not provided';
  let followerCount = 0;

  // Parse logo and set variables if `currentJob` has data
  if (currentJob && currentJob.logo) {
    try {
      const logo = JSON.parse(currentJob.logo);
      logoURL = `/assets/images/${logo.originalname}`;
      console.log("currentJob:", currentJob);
    } catch (error) {
      console.error("Error parsing logo JSON:", error);
    }
  }

  if (currentJob) {
    // Set company and location if available
    companyName = currentJob.company || companyName;
    location = currentJob.location || location;

    // Handle followers as an array, parsing JSON if necessary
    try {
      const followersArray = Array.isArray(currentJob.followers)
        ? currentJob.followers
        : JSON.parse(currentJob.followers || '[]');
      followerCount = followersArray.length;
    } catch (error) {
      console.error("Error parsing followers JSON:", error);
    }
  }

  return (
    <div className={styles['company-card']}>
      <div className={styles['help-icon']}>
        <HelpIcon />
      </div>
      {currentJob ? (
        <>
          <div className={styles['content']}>
            <Image
              src={logoURL || "/assets/images/default-logo.png"} // fallback to default image if logoURL is empty
              alt="Company Logo"
              className={styles['avatar']}
              height={80}
              width={80}
            />
            <p className={styles['company-name']}>{companyName}</p>
            <p className={styles['location']}>{location}</p>
          </div>
          <div className={styles['stats']}>
            <p>
              <span>Follower</span>
              <span className="highlight">{followerCount}</span>
            </p>
          </div>
        </>
      ) : (
        <p className={styles['no-info']}>No current job information available</p>
      )}
    </div>
  );
};

export default CompanyDetailCard;
