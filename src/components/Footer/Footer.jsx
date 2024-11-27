"use client";
import React from "react";
import { usePathname } from "next/navigation";
import LinksOfInterest from "./LinksOfInterest";
import SearchByIndustry from "./SearchByIndustry";
import FooterPageLinks from "./FooterPageLinks";
// style file
import styles from "../../style/componentStyle/footer.module.scss";

const Footer = () => {
  const pathname = usePathname(); // Use usePathname for accessing the current path
  
  // Define the route where the footer should be white
  const isProfilePage = pathname === "/profile";
  return (
    <footer
      className={`${styles.footer}  ${
        isProfilePage ? styles["footer--black"] : ""
      }`}
    >
      <div className={styles.container}>
        <div className={styles["footer-content"]}>
          <div className={`${styles.column} ${styles.logo}`}>
            {!isProfilePage ?
              <img src="/assets/images/logo-black.png" alt="Old Employer" />
             : 
              <img src="/assets/images/logo-white.png" alt="Old Employer" />
            }
          </div>
          <div className={styles.center_footer}>
            <div className={styles.listAlign}>
              <LinksOfInterest isProfilePage = {isProfilePage} />
              <div className={styles.secondList}>
                <FooterPageLinks  isProfilePage = {isProfilePage} />
              </div>
            </div>
            <div className={`${styles.column} ${styles.industry}`}>
              <SearchByIndustry  isProfilePage = {isProfilePage} />
            </div>
          </div>
          <div className={styles.Right_footer}> </div>
        </div>
      </div>
      <div
        className={`${styles["footer-bottom"]}  ${
          isProfilePage ? styles["footer--black"] : ""
        }`}
      >
        <div className={styles["footer-Aline"]}>
          <p>&copy; 2024 Corporation</p>
          <a href="/privacy">Privacy & Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
