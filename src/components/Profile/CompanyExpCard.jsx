import Image from "next/image";
import React from "react";
import { LocationPinIcon } from "../../icon";
// style file 
import styles from "../../style/componentStyle/companyExpCard.module.scss";

const CompanyExpCard = ({ logo, company, type, designation, fromDate, toDate, location, current }) => {
  const formatDate = (date) => {
    const options = { year: "numeric", month: "short" };
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US", options);
  };

  const getDuration = (fromDate, toDate, current) => {
    const from = new Date(fromDate);
    const to = current ? new Date() : new Date(toDate);

    // If the 'from' date is after the 'to' date, it can result in negative values.
    // So we only calculate the duration if 'to' is after 'from'
    let years = to.getFullYear() - from.getFullYear();
    let months = to.getMonth() - from.getMonth();

    // Adjust the year if months are negative
    if (months < 0) {
      years--;
      months += 12;
    }

    // Ensure no negative durations for future dates
    if (years < 0) {
      years = 0;
      months = 0;
    }

    return `${years} yr${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
  };

  return (
    <div className={styles["companiesExp-card"]}>
      <Image src={logo} width={50} height={50} alt={`${company} logo`} />
      <div className={styles['company-info']}>
        <p className={styles['company-name']}>{designation}</p>
        <p className={styles['company-description']}>
          {company} · {type}
        </p>
        <p className={styles['company-description']}>
          {formatDate(fromDate)} - {toDate ? formatDate(toDate) : "Present"} · {getDuration(fromDate, toDate, current)}
        </p>
        <p className={styles['company-location']}>
          <LocationPinIcon />
          {location}
        </p>
      </div>
    </div>
  );
};

export default CompanyExpCard;
