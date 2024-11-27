import React from "react";
import ProfilesCard from "../../components/Profile/ProfilesCard";
// style file
import styles from "../../style/pageStyle/profileStyle/peopleknow.module.scss"
const PeopleYouKnow = () => {
  return (
    <div className={styles['peopleKnow-card']}>
      <div className={styles['header']}>
        <p>People you may know</p>
      </div>
      <div className={styles['peopleKnow-list']}>
        {Array.from({ length: 3 }, (item, idx) => (
          <ProfilesCard idx={idx} />
        ))}
      </div>
    </div>
  );
};

export default PeopleYouKnow;
