import React, { useState } from "react";
import { ExperienceIcon, EditIcon, PlusIcon } from "../../../icon";
import CompanyExpCard from "../../../components/Profile/CompanyExpCard";
import styles from "../../../style/pageStyle/profileStyle/experienceCard.module.scss";

const ExperienceCard = ({ experienceData = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles["Experience-card"]}>
      <div className={styles["header"]}>
        <div>
          <ExperienceIcon />
        </div>
        <div className={styles["sub-header"]}>
          <p className={styles["title"]}>Experience</p>
          <div className={styles["edit-icon"]} onClick={toggleMenu}>
            <EditIcon />
          </div>
          <div className={styles["Add-icon"]} onClick={toggleMenu}>
            <PlusIcon />
          </div>
        </div>
      </div>
      <div className="">
        {experienceData.map((experienceItem) => {
          let logoURL = "/default-image.jpg"; // default logo path
          if (experienceItem.logo) {
            try {
              const logo = JSON.parse(experienceItem.logo);
              logoURL = `/assets/images/${logo.originalname}`;
            } catch (error) {
              console.error("Error parsing logo JSON:", error);
            }
          }

          return (
            <CompanyExpCard
              key={experienceItem.id}
              logo={logoURL}
              company={experienceItem.company}
              type={experienceItem.type}
              designation={experienceItem.designation}
              fromDate={experienceItem.fromDate}
              toDate={experienceItem.toDate}
              current={experienceItem.current}
              location={experienceItem.location}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExperienceCard;
