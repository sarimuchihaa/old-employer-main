import Image from "next/image";
import React, { useState } from "react";
import styles from "../../style/pageStyle/employerProfile/reviews.module.scss";
import { AvatarIcon } from "../../icon";
import { useRouter } from "next/navigation";

const CandidateCard = ({ idx, designation, name, profile, city, country, clickfunction }) => {
  const router = useRouter();

  const [imageError, setImageError] = useState(false);

  return (
    <>
      <div
        className={`${styles["profiles-card"]} ${idx === 2 ? styles["no-border"] : ""}`}
        key={idx}
        onClick={() => clickfunction(idx)}
      >
        {imageError ? (
          <AvatarIcon width={50} height={40} />
        ) : (
          <Image
            src={profile}
            className={styles["rounded-lg"]}
            width={50}
            height={50}
            alt={`${name}'s profile`}
            onError={() => setImageError(true)}
          />
        )}

        <div className={styles['profile-info']}>
          <p className={styles['profile-name']}>{name}</p>
          <div className={styles["user-profile"]}>
            <p className={styles['profile-description']}>
              {designation}
            </p>
            <p className={styles['profile-country']}>{country}</p>
            <p className={styles['profile-country']}>{city}</p>
          </div>
        </div>
      </div>
    </>

  );
};

export default CandidateCard;
