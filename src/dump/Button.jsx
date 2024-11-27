import React from "react";
import styles from "../style/dumpStyle/Button.module.scss";

const Button = ({
  text,
  onClick,
  type,
  icon,
  classes,
  varient,
}) => {
  return (
    <button
      className={`${classes} ${varient}`}
      onClick={onClick}
      type={type}
    >
      {text}
      {icon || <span className={styles.icon}>{icon}</span>}
    </button>
  );
};

export default Button;
