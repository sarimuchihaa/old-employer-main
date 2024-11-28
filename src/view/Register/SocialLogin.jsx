"use client";
import React from "react";
import GoogleOAuth from "../Login/GoogleOAuth";
import FacebookOAuth from "../Login/FacebookOAuth";
import LinkedinOAuth from "../Login/LinkedinOAuth";
import Link from "next/link";
import styles from "../../style/pageStyle/registerStyle/SocialLogin.module.scss"

const SocialLogin = () => {
  return (
    <div className={`${styles['social-login-container']}`}>
      <div className={`${styles['header']}`}>
        <p className= {`${styles['title']} ${styles['h5']}`}>
          Join with social media
        </p>
        <div className={`${styles['social-login']}`}>
          <GoogleOAuth  shape={"circle"} />
          <FacebookOAuth />
          <LinkedinOAuth />
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;
