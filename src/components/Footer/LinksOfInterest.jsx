import React from "react";
// styles file
import styles from "../../style/componentStyle/linksInterest.module.scss";

const LinksOfInterest = ({ isProfilePage }) => {
  return (
    <div
      className={`${styles.links}  ${
        isProfilePage ? styles["list--black"] : ""
      }`}
    >
      <h4 className={`${isProfilePage ? styles["list--black"] : ""}`}>
        Links of Interest
      </h4>
      <ul>
        <li>
          <a
            href="#"
            className={`${isProfilePage ? styles["list--black"] : ""}`}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`${isProfilePage ? styles["list--black"] : ""}`}
          >
            Help Center
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`${isProfilePage ? styles["list--black"] : ""}`}
          >
            Business Services
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`${isProfilePage ? styles["list--black"] : ""}`}
          >
            Ad Choices
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`${isProfilePage ? styles["list--black"] : ""}`}
          >
            Advertising
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LinksOfInterest;
