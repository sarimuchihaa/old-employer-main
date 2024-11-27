"use client";
import React, { useEffect, useState } from "react";
import Button from "../../dump/Button";
import styles from "../../style/componentStyle/tabs.module.scss";
import { getSingleCompanyData } from "../../services/company";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import CompanyNameModal from "../../view/Review/Popups/CompanyName";
import { LongArrowIcon, EyeIcon } from "../../icon";

const Tab = () => {
    const searchParams = useSearchParams();
    const companyId = searchParams.get("companyId");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchCompanyProfile = async () => {
            if (!companyId) return;
            try {
                const userData = await getSingleCompanyData(companyId);
                if (userData) {
                    setCountry(userData.country);
                    setCity(userData.city);
                } else {
                    toast.error("Profile data not available");
                }
            } catch (error) {
                toast.error("Failed to load user data");
            }
        };

        fetchCompanyProfile();
    }, [companyId]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleContinue = (companyName) => {
        console.log("Company Name:", companyName);
    };

    return (
        <>
            <ToastContainer />
            <div className={styles.tabs}>
                <div className={styles['tab-container']}>
                    <div className={styles["address-info"]}>
                        <p>
                            {`${country}, ${city}` || "No address available"}
                        </p>
                    </div>
                    <div className={styles["action-buttons"]}>
                        <Button text={"View all Reviews"} classes={styles["view-button"]} icon={<EyeIcon />} />
                        <Button text={"Add Review"} classes={styles["add-button"]} onClick={handleOpenModal} icon={<LongArrowIcon />} />
                        <CompanyNameModal
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            onContinue={handleContinue}
                        />
                    </div>
                </div>
            </div>
        </>

    );
};

export default Tab;
