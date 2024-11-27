import React from "react";
import FacebookLogin from "react-facebook-login";
import { FacebookIcon } from "../../icon";
// style file import
import styles from "../../style/pageStyle/loginStyle/SocialLogin.module.scss"

const FacebookOAuth = ({ width, buttonText }) => {
  return (
    <div
    className={`${styles["facebook-container"]} ${
      width ? styles["gap"] : styles["rounded"]
    }`}
      style={{ width: width || "" }}
    >
      <FacebookLogin
        appId="1088597931155576"
        fields="name,email,picture"
        callback={(responseFacebook) => {}}
        cssClass={styles["facebook-login"]}
        icon={<FacebookIcon />}
        textButton={buttonText || ""}
      />
    </div>
  );
};

export default FacebookOAuth;
