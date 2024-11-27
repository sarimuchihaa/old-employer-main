"use client";
import Button from "../../dump/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
// style file 
import styles from "../../style/componentStyle/navbar.module.scss"
import CompanyNameModal from "../../view/Review/Popups/CompanyName";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleContinue = (companyName) => {
    console.log("Company Name:", companyName);
  };

  const links = [
    { label: "Home", link: "#" },
    { label: "Companies", link: "#" },
    { label: "Hall of fame", link: "#" },
    { label: "Blogs", link: "#" },
  ];
  return (
    <div className={styles.navbar}>
      <div>
        <Image
          src={"/assets/images/logo.png"}
          className={styles["navbar-image"]}
          width={100}
          height={50}
        />
      </div>
      <div className={styles["navbar-links"]}>
        {links.map((item, idx) => (
          <Link href={item.link} key={idx}>
            {item.label}
          </Link>
        ))}
        <Button
          onClick={handleOpenModal}
          text={"Add Review"}
          varient="primary"
          classes={styles["navbar-button"]}
        />

        <CompanyNameModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
};

export default Navbar;
