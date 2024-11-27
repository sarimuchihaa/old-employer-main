import React from "react";
import Form from "./Form";
import SocialLogin from "./SocialLogin"
import styles from "../../style/pageStyle/registerStyle/Form.module.scss";
const RegisterView = () => {
  return (
    //style={{display:"flex" , flexDirection:"column" , alignItems: "center" , backgroundColor: "#F5F7FB"}}
    <div className={styles["Main-Register"]}>
      <Form />
      <SocialLogin />
    </div>
  );
};

export default RegisterView;
