import Button from "../../dump/Button";
import Dropdown from "../../dump/Dropdown";
import Image from "next/image";
import React from "react";
// styles file
import styles from "../../style/componentStyle/topbar.module.scss";

const Topbar = () => {
  const menuOptions = [{ label: "Profile", label: "Settings" }];

  return (
    <div className={styles.topbar}>
      <button className={styles["topbar-signup"]}>Signup</button>
      <Button text={"Signin"} classes={styles["topbar-button"]} />
      <div className={styles["profile-section"]}>
        <Image
          src={"/assets/images/image.png"}
          alt="profile-pic"
          width={30}
          height={30}
          className={styles["profile-image"]}
        />
        <Dropdown
          label={"Mudassar"}
          items={menuOptions}
          labelClasses={styles["dropdown-label"]}
        />
      </div>
    </div>
  );
};

export default Topbar;
