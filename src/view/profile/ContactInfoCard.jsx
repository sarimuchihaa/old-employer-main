import React, { useState } from "react";
import AboutDrawer from "../../components/Drawers/AboutDrawer";
import styles from "../../style/pageStyle/profileStyle/contactCard.module.scss"
import {
  BirthDayIcon,
  EditIcon,
  MailIcon,
  MobileIcon,
  TelphoneIcon,
} from "../../icon";

const ContactInfoCard = ({ dateOfBirth, phone, email }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const contactInfo = [
    { icon: <MobileIcon />, label: phone },
    { icon: <MailIcon />, label: email },
    { icon: <BirthDayIcon />, label: dateOfBirth },
  ];
  return (
    <div className={styles["contact-container"]}>
      <div className={styles.header}>
        <p className={styles.title}>Contact info</p>
        <div className={styles["edit-icon"]} onClick={toggleMenu}>
          <EditIcon />
        </div>
      </div>
      <div className={styles.content}>

        {contactInfo.map((item, idx) => (
          <p
            key={idx}
            className={styles.item}
          >
            {item.icon} {item.label}
          </p>
        ))}
      </div>
      {/* <AboutDrawer
        title={"Contact Info"}
        buttonText={"Save"}
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        handleSave={() => { }}
      /> */}
    </div>
  );
};

export default ContactInfoCard;
