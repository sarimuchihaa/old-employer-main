import React from "react";
import styles from "../style/dumpStyle/input.module.scss";

const Input = ({
  label,
  type = "text",
  labelClassName,
  inputClassName,
  value = null,
  onChange,
  iconStart,
  iconEnd,
  placeholder,
  containerClassName,
  name,
  inputContainerClass,
  pattern,
}) => {
  return (
    <div className={`${containerClassName}`}>
      {label && (
        <div>
          {/* ${styles['input']} */}
          <p className={`${labelClassName} ${styles['labelText']}`}>
            {label}
          </p>
        </div>
      )}
      <div
        className={`${inputContainerClass}  ${styles['input-Div']}`}
      >
        {iconStart && <span>{iconStart}</span>}
        <input
          type={type}
          className={`${inputClassName}  ${styles['input-bar']} ${styles['inputBar']}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder || ""}
          name={name}
          pattern={pattern || ""}
        />
        {iconEnd && <span>{iconEnd}</span>}
      </div>
    </div>
  );
};

export default Input;
