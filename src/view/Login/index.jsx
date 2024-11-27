import React from "react";
import Form from "./Form";
import styles from "../../style/pageStyle/loginStyle/login.module.scss"

const LoginView = () => {
  return (
    <div className={styles["login-page"]}>
      <img src="/assets/images/imagearea.png" className={styles["login-Img"]} alt="Login picture" />
      <Form />
    </div>
  );
};

export default LoginView;
