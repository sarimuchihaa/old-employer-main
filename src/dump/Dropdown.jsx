"use client";
import { ChevronDownIcon } from "../icon";
import React, { useState, useEffect, useRef } from "react";
import styles from "../style/dumpStyle/Dropdown.module.scss"

const Dropdown = ({ label, defaultValue, items, labelClasses, onSelect }) => {
  const [isOpen, setISOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOpen = () => {
    setISOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setISOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (value) => {
    onSelect(value);
    setISOpen(false); // Close dropdown after selecting a value
  };

  return (
    <div className={`${styles["dropdown-flag"]}`} ref={dropdownRef}>
      <div className={`${styles["dropdown-flag-div"]}`} onClick={handleOpen}>
        <p className={labelClasses}>{defaultValue || label}</p>
        <span
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.1s" }}
        >
          <ChevronDownIcon />
        </span>
      </div>
      {isOpen && (
        <div className={`${styles["dropdown-menu"]}`}>
          <div className={`${styles["dropdown-flex"]}`}>
            {items?.map((item, idx) => (
              <div
                key={idx}
                className={`${styles["dropdown-item"]}`}
                onClick={() => handleSelect(item.value)} // Close dropdown after selection
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
