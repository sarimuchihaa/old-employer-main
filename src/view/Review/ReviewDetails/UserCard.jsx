import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../../style/pageStyle/reviewStyle/ReviewDetails/UserCard.module.scss";
// import SkillsDrawer from "../../../components/Drawers/SkillsDrawer";

const UserCard = ({ name, designation, profile, skills = [] }) => {

  return (
    <div className={styles["tags-card"]}>
      <div className={styles["header"]}>
        <div className={styles["user-image"]}>
          <Image
            src={profile}
            className={styles['avatar']}
            height={80}
            width={80}
          />
        </div>
        <div className={styles["header-content"]}>
          <div className={styles["sub-header"]}>
            <p className={styles["title"]}>{name}</p>
            <p> {designation}</p>
          </div>
          <div className={styles["tags"]}>
            {Array.isArray(skills) ? (
              skills.map((skill, idx) => (
                <p key={idx} className={styles["tag"]}>
                  {skill}
                </p>
              ))
            ) : (
              <p className={styles["tag"]}>{skills}</p>
            )}
          </div>
        </div>
      </div>
      {/* <SkillsDrawer
        title={"Tags"}
        buttonText={"Save"}
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        value={tags.join(",")}
        onChange={(e) => setTags(e.target.value.split(",").map(s => s.trim()))}
        handleSave={() => { }}
      /> */}
    </div>

  );
};

export default UserCard;
