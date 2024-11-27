"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RadioCard from "./ReviewCards/RadioCard";
import ThoughtsCard from "./ReviewCards/ThoughtsCard";
import RatingsCard from "./ReviewCards/RatingsCard";
import AreaCard from "./ReviewCards/AreaCard";
import styles from "../../style/pageStyle/reviewStyle/review.module.scss";
import { UserIcon, UsersIcon, OkIcon, SuggestionsIcon, OkayIcon } from "../../icon";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ReviewForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const companyId = searchParams.get("companyId");
    const [reviewData, setReviewData] = useState({
        emp_status: "",
        emp_thougts: "",
        hide_emp_info: false,
        compensation: 0,
        work_balance: 0,
        career_opportunities: 0,
        cutlers: 0,
        recommendation: false,
        suggestions: null,
        best_worst: null,
        companyId: "",
    });

    useEffect(() => {
        console.log("companyId from searchParams:", companyId);
        const storedReviewData = sessionStorage.getItem("reviewData");
        if (storedReviewData) {
            const parsedData = JSON.parse(storedReviewData);
            setReviewData((prevData) => ({
                ...prevData,
                ...parsedData,         // Merge session data first
                companyId: companyId,  // Then set companyId from searchParams
            }));
        } else {
            setReviewData((prevData) => ({
                ...prevData,
                companyId: companyId, // Set directly if no session data
            }));
        }
    }, [companyId]);


    const handleFieldChange = (field, value) => {
        setReviewData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleContinue = () => {
        if (!reviewData.companyId) {
            console.log("data: ", reviewData);
            toast.error("Please fill out all required fields.");
            return;
        }

        try {
            // Store review data in sessionStorage
            sessionStorage.setItem("reviewData", JSON.stringify(reviewData));
            console.log("Navigating with data: ", reviewData);

            // Navigate to the second review page with companyId
            router.push(`/secondreview?companyId=${reviewData.companyId}`); // Correct way to push
        } catch (error) {
            console.error("Error navigating to the second review page:", error);
        }
    };

    return (
        <div className={styles.review}>
            <div className={styles["content-container"]}>
                <div className={styles['left-column']}>
                    <RadioCard
                        title="Your Status in this company"
                        Icon={UserIcon}
                        statusOptions={[
                            { value: "current", label: "Current Employee" },
                            { value: "ex-employee", label: "Ex-Employee" },
                        ]}
                        onStatusChange={(status) => handleFieldChange("emp_status", status)}
                    />
                    <RadioCard
                        title="Do you want to show your name & image with post?"
                        Icon={UsersIcon}
                        statusOptions={[
                            { value: false, label: "Show my name and other info" },
                            { value: true, label: "Hide my name and other info" },
                        ]}
                        onStatusChange={(info) => handleFieldChange("hide_emp_info", info)}
                    />
                </div>
                <div className={styles["right-column"]}>
                    <ThoughtsCard
                        onThoughtsChange={(thoughts) => handleFieldChange("emp_thougts", thoughts)} // Use emp_thougts here
                    />
                </div>
                <div className={styles["center-column"]}>
                    <RatingsCard onRatingsChange={(field, value) => handleFieldChange(field, value)} />
                </div>

                <div className={styles['center-column']}>
                    <RadioCard
                        title="Do you recommend this company?"
                        Icon={OkIcon}
                        statusOptions={[
                            { value: true, label: "Yes I recommend this employer" },
                            { value: false, label: "No, I do not recommend" },
                        ]}
                        onStatusChange={(recommend) => handleFieldChange("recommendation", recommend)}
                    />
                </div>
                <div className={styles['left-column']}>
                    <AreaCard
                        title="Suggestions for other Employees"
                        Icon={SuggestionsIcon}
                        onAreaChange={(suggestions) => handleFieldChange("suggestions", suggestions)}
                    />
                </div>
                <div className={styles['right-column']}>
                    <AreaCard
                        title="Best & worst things about this company"
                        Icon={OkayIcon}
                        onAreaChange={(bestWorst) => handleFieldChange("best_worst", bestWorst)}
                    />
                </div>
                <div className={styles["button-container"]}>
                    <button
                        className={styles["submit-button"]}
                        onClick={handleContinue}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;
