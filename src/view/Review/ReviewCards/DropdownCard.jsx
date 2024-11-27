"use client";
import React, { useState } from "react";
import styles from "../../../style/pageStyle/reviewStyle/reviewCards.module.scss";
import { ArrowIcon } from "../../../icon";

const DropdownCard = ({ title, dropdownIcon, dropdownOptions, onSelectChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");

    const handleSelectChange = (e) => {
        const value = e.target.value;
        setSelectedValue(value);
        if (onSelectChange) {
            onSelectChange(value);
        }
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (

        <div className={styles["dropdown-list"]}>
            <label className={styles["dropdown-label"]}>{title}</label>
            <div className={styles["dropdown-container"]}>
                {dropdownIcon && (
                    <span className={styles["dropdown-icon"]}>
                        {dropdownIcon}
                    </span>
                )}
                <select
                    value={selectedValue}
                    onChange={handleSelectChange}
                    className={`${styles["dropdown"]}`}
                    onClick={toggleDropdown}
                    onBlur={() => setIsOpen(false)}
                >
                    <option value="" disabled>
                        Select
                    </option>
                    {dropdownOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <span className={`${styles["dropdown-arrow"]} ${isOpen ? styles.rotated : ''}`} onClick={toggleDropdown}>
                    <ArrowIcon />
                </span>
            </div>
        </div>
    );
};

export default DropdownCard;
