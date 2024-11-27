import React from "react";
import CompaniesCard from "../../components/Profile/CompaniesCard";
// stylefile
import styles from "../../style/pageStyle/profileStyle/topCompanies.module.scss"
const TopCompanies = () => {
  return (
    <div className={styles['top-companies-card']}>
      <div className={styles['header']}>
        <p>Top Companies</p>
      </div>
      <div className={styles['companies-list']}>
        {Array.from({ length: 4 }, (item, idx) => (
          <CompaniesCard idx={idx} />
        ))}
      </div>
    </div>
  );
};

export default TopCompanies;
