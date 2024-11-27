import React from "react";
import styles from "../../style/pageStyle/dashboard/Activity.module.scss";

const Activity = () => {
  const activities = [
    {
      id: 1,
      title: "Visit XYZ Profile",
      date: "07 / 30 / 2024",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting",
    },
    {
      id: 2,
      title: "Visit XYZ Profile",
      date: "07 / 30 / 2024",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting",
    },
    {
      id: 3,
      title: "Visit XYZ Profile",
      date: "07 / 30 / 2024",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting",
    },
    {
      id: 4,
      title: "Visit XYZ Profile",
      date: "07 / 30 / 2024",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting",
    },
    {
      id: 5,
      title: "Visit XYZ Profile",
      date: "07 / 30 / 2024",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting",
    },
  ];

  return (
    <div className={styles.activity}>
      <h2>Activity</h2>
      <div className={styles["activity-list"]}>
        {activities.map((activity) => (
          <div key={activity.id} className={styles["activity-item"]}>
            <div className={styles["activity-header"]}>
              <div className={styles["activity-title"]}>{activity.title}</div>
              <div className={styles["activity-date"]}>{activity.date}</div>
            </div>
            <div className={styles["activity-description"]}>
              {activity.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
