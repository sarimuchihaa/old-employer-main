import React from "react";
import styles from "../../../style/pageStyle/reviewStyle/reviewCards.module.scss";
import DropdownCard from "./DropdownCard";
import { DollarIcon } from "../../../icon";

const SalaryCard = ({ title, Icon, onSalaryChange }) => {
    const handleDropdownChange = (field, selectedValue) => {
        onSalaryChange(field, selectedValue);
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
            <div className={styles.salarydropdown}>
                <DropdownCard
                    title="Salary Range"
                    dropdownOptions={[
                        { value: "poor", label: "Poor" },
                        { value: "good", label: "Good" },
                        { value: "excelent", label: "Excelent" },
                    ]}
                    onSelectChange={(selectedValue) => handleDropdownChange("salary_range", selectedValue)}
                />
                <DropdownCard
                    title="Pay Salary On Time?"
                    dropdownOptions={[
                        { value: true, label: "Yes" },
                        { value: false, label: "No" },
                    ]}
                    onSelectChange={(selectedValue) => handleDropdownChange("pay_on_time", selectedValue)}
                />
                <DropdownCard
                    title="Bonus"
                    dropdownIcon={<DollarIcon />}
                    dropdownOptions={[
                        { value: "six-months", label: "Six Months" },
                        { value: "Annual", label: "Annual" },
                        { value: "Performance", label: "Performance" },
                        { value: "not-sure", label: "Not Sure" },
                    ]}
                    onSelectChange={(selectedValue) => handleDropdownChange("bonus", selectedValue)}
                />
                <DropdownCard
                    title="Increment"
                    dropdownIcon={<DollarIcon />}
                    dropdownOptions={[
                        { value: "poor", label: "Poor" },
                        { value: "good", label: "Good" },
                        { value: "excelent", label: "Excelent" },
                    ]}
                    onSelectChange={(selectedValue) => handleDropdownChange("increment", selectedValue)}
                />
                <DropdownCard
                    title="Increment Duration"
                    dropdownIcon={<DollarIcon />}
                    dropdownOptions={[
                        { value: "6 months", label: "6 months" },
                        { value: "1 year", label: "1 year" },
                        { value: "2 years", label: "2 years" },
                    ]}
                    onSelectChange={(selectedValue) => handleDropdownChange("increment_duration", selectedValue)}
                />
            </div>
        </div>
    );
};

export default SalaryCard;
