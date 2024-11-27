import React from 'react';
import { EditIcon } from '../../icon';
import styles from "../../style/pageStyle/profileStyle/resumeCard.module.scss";

export default function ResumeCard({ resumes }) {

  return (
    <div className={styles["Resume-container"]}>
      <div className={styles.header}>
        <p className={styles.title}>Resume</p>
        <div className={styles["edit-icon"]}>
          <EditIcon />
        </div>
      </div>
      <div className={styles.content}>
        {resumes.map((item, idx) => (
          <div key={idx} className={styles.item}>
            <span>{item.icon}</span>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <span>{item.name}</span>
            </a>
            <span>{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
