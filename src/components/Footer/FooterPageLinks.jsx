import React from "react";
// styles file
import styles from "../../style/componentStyle/linksInterest.module.scss";

const FooterPageLinks = ({ isProfilePage }) => {
  return (
    <div className={`${styles.links}  ${
      isProfilePage ? styles["list--black"] : ""
    }`}>
      <ul>
        <li>
          <a href="#" className={`${isProfilePage ? styles["list--black"] : ""}`}>
            Talent Solutions
          </a>
        </li>
        <li>
          <a href="#" className={`${isProfilePage ? styles["list--black"] : ""}`}>
            Professional Community Policies
          </a>
        </li>
        <li>
          <a href="#" className={`${isProfilePage ? styles["list--black"] : ""}`}>
            Careers
          </a>
        </li>
        <li>
          <a href="#" className={`${isProfilePage ? styles["list--black"] : ""}`}>
            Marketing Solutions
          </a>
        </li>
        <li>
          <a href="#" className={`${isProfilePage ? styles["list--black"] : ""}`}>
            Sales Solutions
          </a>
        </li>
      </ul>
    </div>
  );
};

export default FooterPageLinks;
