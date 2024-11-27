import React from "react";
import styles from "../../../style/pageStyle/reviewStyle/reviewCards.module.scss";
import { EnvironmentIcon, EmploymentIcon } from "../../../icon";
import DropdownCard from "./DropdownCard";

const InfoCard = ({ title, Icon, onInfoChange }) => {
    const handleDropdownChange = (type, selectedValue) => {
        onInfoChange(type, selectedValue);
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
            <div className={styles.dropdown}>
                <DropdownCard
                    title="Working Environment"
                    dropdownIcon={<EnvironmentIcon />}
                    dropdownOptions={[
                        { value: "poor", label: "Poor" },
                        { value: "good", label: "Good" },
                        { value: "average", label: "Average" },
                    ]}
                    onSelectChange={(selectedValue) => handleDropdownChange("environment", selectedValue)}
                />
                <DropdownCard
                    title="Employment"
                    dropdownIcon={<EmploymentIcon />}
                    dropdownOptions={[
                        { value: "15 to 20", label: "15 to 20" },
                        { value: "50 to 100", label: "50 to 100" },
                        { value: "100 to 200", label: "100 to 200" },
                    ]}
                    onSelectChange={(selectedValue) => handleDropdownChange("employment", selectedValue)}
                />
            </div>
        </div>
    );
};

export default InfoCard;
