import React, { useState } from "react";
import { EditIcon, TagIcon, PlusIcon } from "../../icon";
import SkillsDrawer from "../../components/Drawers/SkillsDrawer";
// style file import
import styles from "../../style/pageStyle/profileStyle/tagsCard.module.scss";

const TagsCard = ({ tags }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles["tags-card"]}>
      <div className={styles["header"]}>
        <div>
          <TagIcon />
        </div>
        <div className={styles["sub-header"]}>
          <p className={styles["title"]}>Tags</p>
          <div className={styles["edit-icon"]} onClick={toggleMenu}>
            <EditIcon />
          </div>
          <div className={styles["Add-icon"]} onClick={toggleMenu}>
            <PlusIcon />
          </div>
        </div>
      </div>
      <div className={styles["tags"]}>
        {tags.map((tag, idx) => (
          <p key={idx} className={styles["tag"]}>
            {tag}
          </p>
        ))}
      </div>
      {/* <SkillsDrawer
        title={"Tags"}
        buttonText={"Save"}
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        value={tags.join(", ")}
        onChange={(e) => setTags(e.target.value.split(",").map(s => s.trim()))}
        handleSave={() => { }}
      /> */}
    </div>

  );
};

export default TagsCard;
