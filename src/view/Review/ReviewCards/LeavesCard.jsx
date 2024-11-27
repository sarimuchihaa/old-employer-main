"use client";
import React, { useState } from "react";
import styles from "../../../style/pageStyle/reviewStyle/reviewCards.module.scss";
import { LeaveIcon } from "../../../icon";
import DropdownCard from "./DropdownCard";

const LeavesCard = ({ title, Icon, onLeavesChange }) => {
    const [monthly_leaves, setMonthlyLeave] = useState("");
    const [annually_leaves, setAnnualLeave] = useState("");
    const [error, setError] = useState("");

    const handleDropdownChange = (type, selectedValue) => {
        switch (type) {
            case "monthly_leaves":
                setMonthlyLeave(selectedValue);
                onLeavesChange("monthly_leaves", selectedValue);
                setError("");
                break;
            case "annually_leaves":
                setAnnualLeave(selectedValue);
                onLeavesChange("annually_leaves", selectedValue);
                setError("");
                break;
            default:
                break;
        }
        console.log("Selected value:", selectedValue);
    };


    const handleSubmit = () => {
        if (!monthly_leaves || !annually_leaves) {
            setError("Please fill out the required field: monthly_leaves and annually_leaves");
            return;
        }
        // Handle further submit logic here
        console.log("Monthly Leaves:", monthly_leaves);
        console.log("Annually Leaves:", annually_leaves);
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
            <div className={styles.leaves}>
                <div className={styles.dropdown}>
                    <DropdownCard
                        title="Monthly Leaves"
                        dropdownIcon={<LeaveIcon />}
                        dropdownOptions={[
                            { value: "2", label: "2 Leaves" },
                            { value: "1", label: "1 Leave" },
                            { value: "0", label: "No Leave" },
                        ]}
                        onSelectChange={(selectedValue) => handleDropdownChange("monthly_leaves", selectedValue)} // Pass type
                    />
                </div>
                <div className={styles.dropdown}>
                    <DropdownCard
                        title="Annually Leaves"
                        dropdownIcon={<LeaveIcon />}
                        dropdownOptions={[
                            { value: "24", label: "24 Leaves" },
                            { value: "12", label: "12 Leaves" },
                            { value: "0", label: "No Leave" },
                        ]}
                        onSelectChange={(selectedValue) => handleDropdownChange("annually_leaves", selectedValue)} // Pass type
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    );
};

export default LeavesCard;
