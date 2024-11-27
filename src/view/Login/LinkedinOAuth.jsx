import React from "react";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import { LinkedInIcon } from "../../icon";
// style file import
import styles from "../../style/pageStyle/loginStyle/SocialLogin.module.scss"

const LinkedinOAuth = ({ width, showText }) => {
  const { linkedInLogin } = useLinkedIn({
    clientId: "86vhj2q7ukf83q",
    redirectUri: `${window.location.origin}/linkedin`,
    onSuccess: (code) => {
      console.log(code);
      setCode(code);
      setErrorMessage("");
    },
    scope: "r_emailaddress r_liteprofile",
    onError: (error) => {
      console.log(error);
      setCode("");
      setErrorMessage(error.errorMessage);
    },
  });
  return (
    <div
      className={`${styles["Linkendin-container"]} ${
        width ? styles["gap"] : styles["rounded"]
      }`}
      style={{ width: width || "" }}
      onClick={linkedInLogin}
    >
      <LinkedInIcon />
      {showText && <p>Sign in With Linkedin</p>}
    </div>
  );
};

export default LinkedinOAuth;
