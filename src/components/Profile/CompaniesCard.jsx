import React from "react";
import { LocationPinIcon } from "../../icon";
import Image from "next/image";
// styles file 
import styles from "../../style/componentStyle/companies.module.scss"

const CompaniesCard = ({ idx }) => {
  return (
    <div
      className={`${styles["companies-card"]} ${idx === 3 ? styles["no-border"] : ""
        }`}
      key={idx}
    >
      <Image src={"/assets/images/avatar.png"} width={50} height={50} />
      <div className={styles['company-info']}>
        <p className={styles['company-name']}>
          Stark Digital Media Services
        </p>
        <p className={styles['company-description']}>
          Web Development and Mobile App Expert
        </p>

        <p className={styles['company-location']}>
          <LocationPinIcon />
          Ikeja, Lagos, Nigeria
        </p>
      </div>
    </div>
  );
};

export default CompaniesCard;
