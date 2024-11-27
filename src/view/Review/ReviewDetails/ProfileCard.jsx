import Image from "next/image";
import React, { useState } from "react";
import styles from "../../style/pageStyle/employerProfile/reviews.module.scss";
import { AvatarIcon } from "../../icon";
import { useRouter } from "next/navigation";

const ReviewCard = ({ idx, designation, name, profile, rating, country }) => {
  const router = useRouter();

  const stars = Array.from({ length: 5 }, (_, index) => {
    const fillPercentage = Math.max(0, Math.min(1, rating - index)) * 100;
    return (
      <span
        key={index}
        style={{
          cursor: "pointer",
          display: "inline-block",
          background: `linear-gradient(90deg, #ffd700 ${fillPercentage}%, #ccc ${fillPercentage}%)`,
          WebkitBackgroundClip: "text",
          color: "transparent",
          fontSize: "1.2em"
        }}
      >
        ★
      </span>
    );
  });


  const [imageError, setImageError] = useState(false);

  const handleViewClick = async () => {
    router.push('/reviewDetails');
  };

  return (
    <>
      <div
        className={`${styles["profiles-card"]} ${idx === 2 ? styles["no-border"] : ""}`}
        key={idx}
        onClick={handleViewClick}
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
          </div>
          <div className={styles["rattings"]}>
            <div className={styles["stars"]}>{stars}</div>
            <button className={styles["rating-button"]}>{rating}/5</button>
          </div>
        </div>
      </div>
    </>

  );
};

export default ReviewCard;
