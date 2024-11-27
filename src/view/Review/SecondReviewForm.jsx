"use client";
import React, { useState, useEffect } from "react";
import InfoCard from "./ReviewCards/InfoCard";
import SalaryCard from "./ReviewCards/SalaryCard";
import BenefitsCard from "./ReviewCards/BenefitsCard";
import ReviewCard from "./ReviewCards/ReviewCard";
import LeavesCard from "./ReviewCards/LeavesCard";
import { addReview, verifyReview } from '../../services/review';
import VerificationModal from "./Popups/VerifyReview";
import styles from "../../style/pageStyle/reviewStyle/review.module.scss"
import { InfoIcon, SalaryIcon, LeavesIcon, RatingIcon, RatingsIcon, ReviewIcon } from "../../icon";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

const SecondReviewForm = () => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [reviewData, setReviewData] = useState({
        environment: "",
        employment: "",
        insurance: false,
        residence: false,
        benovland_fund: false,
        medical: false,
        other_benefit: null,
        salary_range: "",
        pay_on_time: false,
        bonus: false,
        increment: "",
        increment_duration: "",
        monthly_leaves: "",
        annually_leaves: "",
        public_review: null,
        companyId: "",
    });

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem("reviewData"));
        if (data) {
            setReviewData((prevData) => ({
                ...prevData,
                ...data,
            }));
        }
    }, []);

    const handleFieldChange = (field, value) => {
        setReviewData((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };


    const handleSubmitReview = async () => {
        // Validation for all required fields
        const requiredFields = [
            "emp_status", "compensation",
            "work_balance", "career_opportunities",
            "cutlers", "environment",
            "employment", "insurance", "residence",
            "benovland_fund", "medical",
            "salary_range", "pay_on_time", "bonus",
            "increment", "increment_duration",
            "monthly_leaves", "annually_leaves",
            "companyId"
        ];

        for (const field of requiredFields) {
            if (!reviewData[field]) {
                console.log("ReviewData:", reviewData);
                toast.error(`Please fill out the required field: ${field}`);
                return;
            }
        }
        console.log("Submitting Review Data:", reviewData);
        setIsLoading(true);
        try {
            // Save the review data first
            const response = await addReview(reviewData);
            toast.success("Review submitted successfully:", response.data);
            reviewData.id = response.data.review.id;
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("An error is occured to submitting review, please, try again!", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerificationContinue = async (verificationDoc) => {
        // Ensure reviewData.id is properly defined
        const reviewId = reviewData?.id;
        const companyId = reviewData?.companyId;
        console.log("reviewId:", reviewId);
        if (!reviewId) {
            console.error("Review ID is undefined");
            toast.error("Review ID is required for verification.");
            return;
        }

        const verification_doc = {
            originalname: verificationDoc.name,
            mimetype: verificationDoc.type,
            size: verificationDoc.size,
        };

        try {
            // Send the request, ensuring that reviewId is passed correctly
            const doc = await verifyReview(verification_doc, reviewId);
            toast.success("Successfully submit verification document.");
            if (doc) {
                router.push(`/reviewDetails/?companyId=${companyId}&index=${reviewId}`);
                setReviewData((prevData) => ({
                    ...prevData,
                    is_verified: true,
                }));
            }
        } catch (error) {
            console.error("Error submitting verification document:", error);
            toast.error("Failed to submit verification document.");
        }
    };


    return (
        <>
            <ToastContainer />
            <div className={styles.review}>
                <div className={styles['content-container']}>
                    <div className={styles['left-column']}>
                        <InfoCard
                            title="Common Information"
                            Icon={InfoIcon}
                            onInfoChange={(field, value) => handleFieldChange(field, value)}
                        />
                        <BenefitsCard
                            title="Benefits"
                            Icon={RatingIcon}
                            areaTitle="Other Benefits"
                            areaIcon={RatingsIcon}
                            onBenefitsChange={(field, value) => handleFieldChange(field, value)}
                        />
                        <ReviewCard
                            title="Public Review"
                            Icon={ReviewIcon}
                            onStatusChange={(review) => handleFieldChange("public_review", review)} // Pass callback
                        />
                    </div>
                    <div className={styles['right-column']}>
                        <SalaryCard
                            title="Salary"
                            Icon={SalaryIcon}
                            onSalaryChange={(field, value) => handleFieldChange(field, value)}
                        />
                        <LeavesCard
                            title="Leaves Policy"
                            Icon={LeavesIcon}
                            onLeavesChange={(field, value) => handleFieldChange(field, value)}
                        />
                    </div>
                </div>
                <div className={styles["button-container"]}>
                    <button
                        className={styles["submit-button"]}
                        onClick={handleSubmitReview}
                        disabled={isLoading}
                    >
                        {isLoading ? "Submitting..." : "Submit"}
                    </button>
                </div>
                <VerificationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onContinue={handleVerificationContinue}
                />
            </div>
        </>
    );
};

export default SecondReviewForm;
