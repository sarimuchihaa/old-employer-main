import React from "react";
import OffCanvas from "../../dump/OffCanvas";
// styles file
import styles from "../../style/componentStyle/Drawer.module.scss"

const AboutDrawer = ({
  title,
  buttonText,
  toggleMenu,
  isOpen,
  value,
  onChange,
  handleSave,
}) => {
  return (
    <OffCanvas
      title={title}
      isOpen={isOpen}
      toggleMenu={toggleMenu}
      buttonText={buttonText}
      saveBtnHandler={handleSave}
    >
      <p className={styles["Drawer-para"]}>
        write your skills with comma seprated i.e Frontend Developer, Backend
        Developer, PERN Developer
      </p>
      <div className={styles["Drawer"]}>
        <label className={styles["text"]}>Skills</label>
        <textarea
          className={styles["textarea"]}
          rows="5"
          placeholder="i.e Frontend Developer, Full Stack Developer"
          value={value}
          onChange={onChange}
        ></textarea>
      </div>
    </OffCanvas>
  );
};

export default AboutDrawer;
