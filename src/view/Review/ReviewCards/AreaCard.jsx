"use client";
import React, { useState } from "react";
import styles from "../../../style/pageStyle/reviewStyle/reviewCards.module.scss";

const AreaCard = ({ title, Icon, onAreaChange, placeholder, rows }) => {
    const [text, setText] = useState("");

    const handleAreaChange = (e) => {
        const updatedText = e.target.value;
        setText(updatedText);
        if (onAreaChange) {
            onAreaChange(updatedText);
        }
    };

    return (
        <div className={styles["status-card"]}>
            <div className={styles["header"]}>
                {Icon && (
                    <div>
                        <Icon />
                    </div>
                )}
                <div className={styles["sub-header"]}>
                    <p className={styles["title"]}>{title}</p>
                </div>
            </div>
            <div className={styles.description}>
                <textarea
                    className={styles.textarea}
                    placeholder={placeholder || "Write here..."}
                    value={text}
                    onChange={handleAreaChange}
                    rows={rows || 5}
                />
            </div>
        </div>
    );
};

export default AreaCard;
