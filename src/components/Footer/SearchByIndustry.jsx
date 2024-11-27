import React from "react";
// style file
import styles from "../../style/componentStyle/search.module.scss"

const SearchByIndustry = ({ isProfilePage }) => {
  return (
    <div className={`${styles.search}  ${
      isProfilePage ? styles["search--black"] : ""
    }`}>
      <h4>Search by Industry</h4>
      <ul>
        {Array(15)
          .fill("Industry")
          .map((industry, index) => (
            <li key={index}>
              <a href="#" className={`${isProfilePage ? styles["list--black"] : ""}`}>
                {industry}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SearchByIndustry;
