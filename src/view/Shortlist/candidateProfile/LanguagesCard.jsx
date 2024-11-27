import React, { useState } from "react";
import { EditIcon, PlusIcon, LanguageIcon } from "../../../icon";
import LanguagesDrawer from "../../../components/Drawers/LanguagesDrawer";
// styles file 
import styles from "../../../style/pageStyle/profileStyle/languageCard.module.scss"

const LanguagesCard = ({ languages }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles["language-card"]}>
      <div className={styles["header"]}>
        <div>
          <LanguageIcon />
        </div>
        <div className={styles["sub-header"]}>
          <p className={styles["title"]}>Language</p>
          <div className={styles["edit-icon"]} onClick={toggleMenu}>
            <EditIcon />
          </div>
          <div className={styles["Add-icon"]} onClick={toggleMenu}>
            <PlusIcon />
          </div>
        </div>
      </div>
      <div className={styles["language-div"]}>
        {languages.map((item, idx) => (
          <p
            className={`${styles.language} ${idx === 2 ? styles['no-border'] : ''}`}
            key={idx}
          >
            {item}
          </p>
        ))}
      </div>
      <LanguagesDrawer
        title={"Languages"}
        buttonText={"Save"}
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        value={languages}
        onChange={(e) => setLanguages(e.target.value)}
        handleSave={() => { }}
      />
    </div>
  );
};

export default LanguagesCard;
