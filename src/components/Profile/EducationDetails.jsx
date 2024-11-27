import Image from "next/image";
import React from "react";
// style file
import styles from "../../style/componentStyle/eductionCard.module.scss";

const EducationDetails = ({ logo, institute, degree, fromDate, toDate, grade }) => {
  const getYear = (dateString) => {
    return dateString ? new Date(dateString).getFullYear() : "N/A";
  };

  return (
    <div className={styles["companiesExp-card"]}>
      <Image src={logo} width={50} height={50} alt="education-icon" />
      <div className={styles["company-info"]}>
        <p className={styles["company-name"]}>{institute}</p>
        <p className={styles["company-description"]}>{degree}</p>
        <p className={styles["company-description"]}>
          {getYear(fromDate)} - {toDate ? getYear(toDate) : "Present"}
        </p>
        {grade && <p className={styles["company-description"]}>Grade: {grade}</p>}
      </div>
    </div>
  );
};

export default EducationDetails;
