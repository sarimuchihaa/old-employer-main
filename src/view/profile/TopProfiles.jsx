import React from "react";
import ProfilesCard from "../../components/Profile/ProfilesCard";
// stylefile 
import styles from "../../style/pageStyle/profileStyle/topProfile.module.scss"

const TopProfiles = () => {
  return (
    <div className={styles['top-profile-card']}>
      <div className={styles['header']}>
        <p>Top Profiles</p>
      </div>
      <div className={styles['profile-list']}>
        {Array.from({ length: 3 }, (item, idx) => (
          <ProfilesCard idx={idx} />
        ))}
      </div>
    </div>
  );
};

export default TopProfiles;
