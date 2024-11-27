import React from "react";
import Form from "./Form";
import { ResetRightSection } from "../../icon";
// style file
import styles from "../../style/pageStyle/reset/reset.module.scss"

const ResetView = () => {
  return (
    <div className={styles["reset-page"]}>
      <img src="/assets/images/resetScreen.svg" className={styles["reset-Img"]} alt="Reset Password image" />
      <Form />
    </div>
  )
};

export default ResetView;
