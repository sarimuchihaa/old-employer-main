import React, { useState } from "react";
import { ExperienceIcon, EditIcon, PlusIcon } from "../../../icon";
import CompanyExpCard from "../../../components/Profile/CompanyExpCard";
import styles from "../../../style/pageStyle/profileStyle/experienceCard.module.scss";

const ProjectCard = ({ projects = [] }) => {
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
          <p className={styles["title"]}>Projects</p>
          <div className={styles["edit-icon"]} onClick={toggleMenu}>
            <EditIcon />
          </div>
          <div className={styles["Add-icon"]} onClick={toggleMenu}>
            <PlusIcon />
          </div>
        </div>
      </div>
      <div className="">
        {projects.map((projectItem) => {
          let logoURL = "/default-image.jpg";
          if (projectItem.media) {
            try {
              const Media = JSON.parse(projectItem.media);
              logoURL = `/assets/files/${Media.originalname}`;
            } catch (error) {
              console.error("Error parsing logo JSON:", error);
            }
          }

          return (
            <CompanyExpCard
              key={projectItem.id}
              logo={logoURL}
              company={projectItem.title}
              type={projectItem.description}
              designation={projectItem.designation}
              fromDate={projectItem.startDate}
              toDate={projectItem.endDate}
              current={projectItem.current}
              location={projectItem.completionType}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProjectCard;
