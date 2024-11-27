"use client";
import React, { useState } from "react";
import { EditIcon, ManIcon } from "../../../icon";
import AboutDrawer from "../../../components/Drawers/AboutDrawer";
import styles from "../../../style/pageStyle/profileStyle/aboutCard.module.scss";

const AboutCard = ({ about }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  console.log("about:", about);

  // const handleSaveAbout = async () => {
  //   if (about !== aboutText && about !== "") {
  //     const resp = await addOrUpdateAbout(about);
  //     if (resp.status === 200) {
  //       toggleMenu();
  //       toast.success(
  //         aboutText ? "About updated successfully" : "About added successfully"
  //       );
  //     }
  //   } else {
  //     toast.error("Please made some changes to save");
  //   }
  // };


  return (
    <div className={styles["about-card"]}>
      <div className={styles["header"]}>
        <div>
          <ManIcon />
        </div>
        <div className={styles["sub-header"]}>
          <p className={styles["title"]}>About</p>
          <div className={styles["edit-icon"]}
            onClick={toggleMenu}>
            <EditIcon />
          </div>
        </div>
      </div>
      <p className={styles["description"]}>
        {about || "No about information available"},

      </p>
      <AboutDrawer
        title={"About"}
        buttonText={"Save"}
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      // handleSave={handleSaveAbout}
      />
    </div>

  );
};

export default AboutCard;
