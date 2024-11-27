import Button from "../../dump/Button";
import Input from "../../dump/Input";
import Link from "next/link";
import React from "react";
// style file
import styles from "../../style/pageStyle/reset/reset.module.scss"
const Form = () => {
  return (
    <div className={styles["form-container"]}>
      <div className={styles["form-content"]}>
        <h1 className={`${styles["form-title"]}`}>
          You lost your password ?
        </h1>
        <p className={styles["form-description"]}>
          No problam Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod incididunt ut labore et dolore magna aliqua.
        </p>
        <Input
          label={"Enter your email"}
          placeholder={"Enter your name or email"}
          containerClassName={styles["input-container"]}
        />
        <Button text={"SUBMIT"} classes={styles["button-container"]} />
        <p className={styles["reset-up-text"]}>
          Already have password?{" "}
          <Link className={styles["reset-up-link"]} href={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
};

export default Form;
