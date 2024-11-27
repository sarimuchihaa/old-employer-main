"use client";
import Button from "../../dump/Button";
import Input from "../../dump/Input";
import Link from "next/link";
import React, { useState } from "react";
import FacebookOAuth from "./FacebookOAuth";
import GoogleOAuth from "./GoogleOAuth";
import LinkedinOAuth from "./LinkedinOAuth";
import { login } from "../../services/auth";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
// style file import
import styles from '../../style/pageStyle/loginStyle/Form.module.scss'

const Form = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleLoginClick = async () => {
    const resp = await login(inputs);
    if (resp.status === 200) {
      localStorage.setItem("token", JSON.stringify(resp.data));
      toast.success("Login successfull");
      router.push("/search");
    } else {
      toast.error(resp.error.nessage);
    }
  };

  return (
    <div className={styles["form-container"]}>
      <div className={styles["form-content"]}>
        <h1 className={styles["form-title"]}>
          Login to OldEmployer
        </h1>
        <p className={styles["form-description"]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod incididunt ut labore et dolore magna aliqua.
        </p>
        <Input
          label={"Enter your email"}
          placeholder={"Enter your name or email"}
          containerClassName={styles["input-container"]}
          value={inputs.email}
          onChange={handleInputChange}
          name={"email"}
        />
        <Input
          label={"Password"}
          placeholder={"* * * * * * * *"}
          type="password"
          value={inputs.password}
          onChange={handleInputChange}
          name={"password"}
        />
        <Button text={"Login"} classes={styles["button-container"]} onClick={handleLoginClick} />
        <GoogleOAuth width={"300px"} type={"standard"} />
        <FacebookOAuth buttonText={"Sign in with Facebook"} width={"300px"} />
        <LinkedinOAuth width={"300px"} showText={true} />
        <p className={styles["sign-up-text"]}>
          {"Don't you have an account? "}
          <Link className={styles["sign-up-link"]} href={"/register"}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Form;
