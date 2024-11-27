import React, { useState, useEffect } from "react";
import { EditIcon, PlusIcon, SkillIcon } from "../../icon";
import SkillsDrawer from "../../components/Drawers/SkillsDrawer";
// style file
import styles from "../../style/pageStyle/profileStyle/skillCard.module.scss";

const SkillsCard = ({ skills }) => {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className={styles["Skill-card"]}>
      <div className={styles["header"]}>
        <div>
          <SkillIcon />
        </div>
        <div className={styles["sub-header"]}>
          <p className={styles["title"]}>Skills</p>
          <div className={styles["edit-icon"]}
          // onClick={toggleMenu}
          >
            <EditIcon />
          </div>
          <div className={styles["Add-icon"]}
          // onClick={toggleMenu}
          >
            <PlusIcon />
          </div>
        </div>
      </div>
      <div className={styles["skills"]}>
        {skills.map((skill, idx) => (
          <p key={idx} className={styles["skill"]}>
            {skill.trim()}
          </p>
        ))}
      </div>
      {/* <SkillsDrawer
        title={"Skills"}
        buttonText={"Save"}
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        value={skills.join(", ")} // Convert the array back to a comma-separated string
        onChange={(e) => setSkills(e.target.value.split(",").map(s => s.trim()))} // Update skills state
        handleSave={() => { }} // Handle saving here
      /> */}
    </div>
  );
};

export default SkillsCard;
