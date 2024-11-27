"use client";
import React, { useState, useEffect, useId } from "react";
import { DislikeIcon, LikeIcon, UnverifiedIcon, VerifiedIcon } from "../../../icon";
// import styles from "../../../style/pageStyle/profileStyle/aboutCard.module.scss";
import styles from "../../../style/pageStyle/profileStyle/UserReviews/userReviews.module.scss";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { getReviewDataByUser } from "../../../services/review";
import { getSingleCompanyData } from "../../../services/company";
import { getUserId } from "../../../services/user";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import VerificationModal from "../../Review/Popups/VerifyReview";
import { verifyReview } from '../../../services/review';

const UserReviews = () => {
    const searchParams = useSearchParams();
    const userId = searchParams.get("id");
    const router = useRouter();
    const pathname = usePathname();
    const currentUserId = getUserId();
    const [reviews, setReviews] = useState([]);
    const [ratings, setRatings] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchCompany = async (companyId) => {
        try {
            const company = await getSingleCompanyData(companyId);
            return company;
        } catch (error) {
            console.error("Failed to fetch company:", error);
            return null;
        }
    };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const idToFetch = (userId && userId !== currentUserId) ? userId : currentUserId;
                const fetchedReviews = await getReviewDataByUser(idToFetch);
                console.log("Fetched Reviews:", fetchedReviews);

                // Fetch company data for each review asynchronously
                const updatedReviews = await Promise.all(fetchedReviews.map(async (review) => {
                    const company = await fetchCompany(review.companyId);
                    return {
                        ...review,
                        company, // Add the company data to the review
                    };
                }));

                setReviews(updatedReviews); // Set the reviews with company data
            } catch (error) {
                console.error("Failed to load review data:", error);
                toast.error("Failed to load review data");
            }
        };

        fetchReviews();
    }, [userId, currentUserId, pathname]);

    // Log reviews to check structure and ensure we have data
    console.log("Reviews:", reviews);

    useEffect(() => {
        if (reviews && reviews.length > 0) {
            const review = reviews[0]; // Accessing the first review if there are multiple

            // Log to check the structure of the review
            console.log("reviews rating: ", review);

            // Ensure the fields exist before calculating the total rating
            const totalRating = (
                (review.compensation + review.work_balance + review.career_opportunities + review.cutlers) / 4
            ).toFixed(1);

            // Round the rating to the nearest integer
            setRatings(totalRating);
            console.log("totalRating", totalRating); // Log the total rating
        } else {
            console.log("No reviews available.");
        }
    }, [reviews]);

    const generateStars = () => {
        const fullStars = Math.floor(ratings); // Full stars (integer part)
        const halfStar = ratings % 1 >= 0.5 ? 1 : 0; // Check for half star (if the fractional part is >= 0.5)
        const emptyStars = 5 - fullStars - halfStar; // Remaining stars are empty

        const starsArray = [];

        // Full stars
        for (let i = 0; i < fullStars; i++) {
            starsArray.push(
                <span key={`full-${i}`} style={{ color: "#FC9823", fontSize: "1.5em" }}>★</span>
            );
        }

        // Partial star (only the part of the star that needs to be filled)
        if (ratings % 1 > 0 && ratings % 1 < 0.5) {
            starsArray.push(
                <span key="partial" style={{
                    color: "#ffd700",
                    fontSize: "1.5em",
                    background: "linear-gradient(90deg, #FC9823 50%, #ccc 50%)",
                    WebkitBackgroundClip: "text",
                    color: "transparent"
                }}>
                    ★
                </span>
            );
        } else if (halfStar) {
            starsArray.push(
                <span key="half" style={{ color: "#FC9823", fontSize: "1.5em" }}>☆</span>
            );
        }

        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            starsArray.push(
                <span key={`empty-${i}`} style={{ color: "#ccc", fontSize: "1.5em" }}>★</span>
            );
        }

        return starsArray;
    };

    // const generateStars = () => {
    //     const fullStars = Math.floor(ratings); // Full stars (integer part)
    //     const partialStarPercentage = (ratings % 1) * 100; // Fractional part as percentage
    //     const emptyStars = 5 - fullStars - (partialStarPercentage > 0 ? 1 : 0); // Remaining stars are empty

    //     const starsArray = [];

    //     // Full stars
    //     for (let i = 0; i < fullStars; i++) {
    //         starsArray.push(
    //             <span key={`full-${i}`} style={{ color: "#FC9823", fontSize: "1.5em" }}>★</span>
    //         );
    //     }

    //     // Partial star (based on the percentage)
    //     if (partialStarPercentage > 0) {
    //         starsArray.push(
    //             <span key="partial" style={{
    //                 display: "inline-block",
    //                 width: `${partialStarPercentage}%`,
    //                 color: "#FC9823",
    //                 fontSize: "1.5em",
    //                 overflow: "hidden"
    //             }}>
    //                 ★
    //             </span>
    //         );
    //     }

    //     // Empty stars
    //     for (let i = 0; i < emptyStars; i++) {
    //         starsArray.push(
    //             <span key={`empty-${i}`} style={{ color: "#ccc", fontSize: "1.5em" }}>★</span>
    //         );
    //     }

    //     return starsArray;
    // };

    const handleReviewClick = (reviewId, companyId) => {
        // setSelectedReviewIndex(reviews.id);
        // setSelectedReviewIndex(selectedReviewIndex); // Update local state (if needed)
        // console.log("id", selectedReviewIndex);
        const url = `/reviewDetails?companyId=${companyId}&index=${reviewId}`;
        router.push(url);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    // const handleCloseModal = () => {
    //     setIsModalOpen(false);
    // };

    const handleVerificationContinue = async (verificationDoc, reviewId, companyId) => {
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
                setReviews((prevData) => ({
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
            <div className={styles["user-reviews"]}>
                {reviews.map((review, index) => {
                    // Check if review should be hidden based on emp_hide_info and userId
                    if (userId && userId !== currentUserId && review.hide_emp_info === 1) {
                        console.log("hide reviews");
                        return null;

                    }

                    const logoData = review.company?.logo ? JSON.parse(review.company.logo) : null;
                    const logoURL = logoData ? `/assets/images/${logoData.originalname}` : "/assets/images/logo-1.png";
                    const reviewRating = ratings[index]; // Get the calculated rating for this review

                    return (
                        <div key={index} className={styles["review-content"]}>
                            <div className={styles["review-card"]} >
                                <div className={styles["content"]} onClick={() => handleReviewClick(review.id, review.company.id)}>
                                    <div className={styles.logo}>
                                        <Image
                                            src={logoURL}
                                            alt="Company Logo"
                                            className={styles['avatar']}
                                            height={80}
                                            width={80}
                                        />
                                    </div>
                                    <div className={styles.name}>
                                        <p>{review.company?.name || "Company Name Not Available"}</p>
                                        <div className={styles["stars"]}>
                                            {generateStars()}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.actions}>
                                    <div className={styles.ratings}>
                                        <div className={styles.ratingItem}>
                                            <p>{review.company?.country}</p>
                                        </div>
                                        <button className={styles["rating-button"]}>{ratings}/5</button>
                                        <div className={styles.ratingItem}>
                                            <p>Ratings</p>
                                        </div>
                                        <div className={styles.ratingItem}>
                                            {review.emp_thougts === "good" ? <LikeIcon /> : <DislikeIcon />}
                                        </div>
                                        <div className={styles.ratingItem} onClick={handleOpenModal}>
                                            {review.is_verified ? <VerifiedIcon /> : <UnverifiedIcon />}
                                            <VerificationModal
                                                isOpen={isModalOpen}
                                                onClose={() => setIsModalOpen(false)}
                                                onContinue={handleVerificationContinue(review.id, review.company.id)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {/* {"No Reviews"} */}
            </div>
        </>
    );
};


export default UserReviews;
