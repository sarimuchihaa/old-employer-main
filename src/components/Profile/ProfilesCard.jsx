import Image from "next/image";
import React from "react";

// style file 
import styles from "../../style/componentStyle/profileCard.module.scss"
const ProfilesCard = ({ idx }) => {
  return (
    <div
      className={`${styles["profiles-card"]} ${idx === 2 ? styles["no-border"] : ""
        }`}
      key={idx}
    >
      <Image
        src={"/assets/images/image5.png"}
        className={"rounded-lg"}
        width={50}
        height={50}
      />
      <div className={styles['profile-info']}>
        <p className={styles['profile-name']}>Aaron Berder</p>
        <p className={styles['profile-description']}>
          Full stack web and mob...
        </p>

        <p className={styles['profile-location']}>Freelancer</p>
      </div>
    </div>
  );
};

export default ProfilesCard;
