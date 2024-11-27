"use client";
import React, { useState } from "react";
import styles from "../../../style/pageStyle/reviewStyle/reviewCards.module.scss";
import DropdownCard from "./DropdownCard";
import { BenevolentIcon, InsuranceIcon, MedicalIcon, ResidenceIcon } from "../../../icon";

const BenefitsCard = ({ title, Icon, areaTitle, areaIcon, onBenefitsChange }) => {
    const [insurance, setInsurance] = useState("");
    const [residence, setResidence] = useState("");
    const [benovland_fund, setBenovlandFund] = useState("");
    const [medical, setMedical] = useState("");
    const [other_benefit, setOtherBenefit] = useState(""); // State for the textarea
    const [error, setError] = useState(""); // State for error message

    const handleDropdownChange = (type, selectedValue) => {
        switch (type) {
            case "insurance":
                setInsurance(selectedValue);
                onBenefitsChange("insurance", selectedValue);
                break;
            case "residence":
                setResidence(selectedValue);
                onBenefitsChange("residence", selectedValue);
                break;
            case "benovland_fund":
                setBenovlandFund(selectedValue);
                onBenefitsChange("benovland_fund", selectedValue);
                break;
            case "medical":
                setMedical(selectedValue);
                onBenefitsChange("medical", selectedValue);
                break;
            default:
                break;
        }
    };

    const handleTextareaChange = (e) => {
        setOtherBenefit(e.target.value);
        onBenefitsChange("other_benefit", e.target.value);
        setError(""); // Clear error when user starts typing
    };

    return (
        <div className={styles["status-card"]}>
            <div className={styles["header"]}>
                {Icon && <div><Icon /></div>}
                <div className={styles["sub-header"]}>
                    <p className={styles["title"]}>{title}</p>
                </div>
            </div>
            <div className={styles.benefits}>
                <div className={styles.dropdown}>
                    <DropdownCard
                        title="Insurance"
                        dropdownIcon={<InsuranceIcon />}
                        dropdownOptions={[
                            { value: true, label: "Yes" },
                            { value: false, label: "No" },
                        ]}
                        onSelectChange={(selectedValue) => handleDropdownChange("insurance", selectedValue)}
                    />
                    <DropdownCard
                        title="Residence"
                        dropdownIcon={<ResidenceIcon />}
                        dropdownOptions={[
                            { value: true, label: "Yes" },
                            { value: false, label: "No" },
                        ]}
                        onSelectChange={(selectedValue) => handleDropdownChange("residence", selectedValue)}
                    />
                </div>
                <div className={styles.dropdown}>
                    <DropdownCard
                        title="Benevolent Fund"
                        dropdownIcon={<BenevolentIcon />}
                        dropdownOptions={[
                            { value: true, label: "Yes" },
                            { value: false, label: "No" },
                        ]}
                        onSelectChange={(selectedValue) => handleDropdownChange("benovland_fund", selectedValue)}
                    />
                    <DropdownCard
                        title="Medical"
                        dropdownIcon={<MedicalIcon />}
                        dropdownOptions={[
                            { value: true, label: "Yes" },
                            { value: false, label: "No" },
                        ]}
                        onSelectChange={(selectedValue) => handleDropdownChange("medical", selectedValue)}
                    />
                </div>
                <div>
                    <div className={styles["header"]}>
                        {areaIcon && <div>{<areaIcon />}</div>}
                        <div className={styles["sub-header"]}>
                            <p className={styles["title"]}>{areaTitle}</p>
                        </div>
                    </div>
                    <div className={styles.description}>
                        <textarea
                            className={styles.textarea}
                            placeholder={"Write here..."}
                            rows={5}
                            value={other_benefit}
                            onChange={handleTextareaChange}
                        />
                        {error && <p className={styles.error}>{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BenefitsCard;
