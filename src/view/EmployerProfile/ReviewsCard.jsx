import React, { useState, useEffect } from "react";
import ReviewCard from "../../components/Employer/ReviewCard";
import styles from "../../style/pageStyle/employerProfile/totalReviews.module.scss";
import { useSearchParams } from "next/navigation";
import { getReviewData } from "../../services/review";
import { getSingleCompanyData } from "../../services/company";
import { getUserById } from "../../services/user";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AvatarIcon, LongArrowIcon } from "../../icon";
import { useRouter } from "next/navigation";

const TotalReviews = () => {
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId");
  const [reviews, setReviews] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const router = useRouter();
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(0);

  useEffect(() => {
    const fetchCompanyName = async () => {
      if (companyId) {
        const company = await getSingleCompanyData(companyId);
        setCompanyName(company.name);
      }
    };

    fetchCompanyName();
  }, [companyId]);

  const fetchUserProfile = async (userId) => {
    if (!userId) return null; // Return null if userId is undefined
    try {
      const userProfile = await getUserById(userId);
      return userProfile;
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      console.error("User profile not available");
      return null; // Return null to indicate user profile fetch failed
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      if (!companyId) return;

      try {
        const fetchedReviews = await getReviewData(companyId);
        if (fetchedReviews && fetchedReviews.length > 0) {
          const reviewsWithUserProfiles = await Promise.all(
            fetchedReviews.map(async (review) => {
              const userProfile = await fetchUserProfile(review.review_by);
              return {
                ...review,
                userProfile,
              };
            })
          );

          setReviews(reviewsWithUserProfiles);
        } else {
          console.error("Review data not available");
        }
      } catch (error) {
        console.error("Failed to load Review data");
      }
    };

    fetchReviews();
  }, [companyId]);

  const handleViewClick = async () => {
    router.push(`/reviewDetails?companyId=${companyId}`);
  };

  const handleSingleClick = (review) => {
    // const selectedReviewIndex = reviews.indexOf(review); // Get the index of the selected review
    setSelectedReviewIndex(review.id);
    // setSelectedReviewIndex(selectedReviewIndex); // Update local state (if needed)
    console.log("id", selectedReviewIndex);
    const url = `/reviewDetails?companyId=${companyId}&index=${review.id}`;
    router.push(url);
  };

  return (
    <>
      <div className={styles['top-profile-card']}>
        <div className={styles["header"]}>
          <div className={styles["sub-header"]}>
            <p className={styles["title"]}>{reviews.length} Reviews</p>
            <p className={styles["title-icon"]} onClick={handleViewClick} >View all <LongArrowIcon /> </p>
          </div>
        </div>
        <div className={styles['profile-list']}>
          {reviews.map((review, idx) => {
            const userOverallRating = (
              (review.compensation + review.work_balance + review.career_opportunities + review.cutlers) / 4
            ).toFixed(1);

            const userExperience = review.userProfile?.Experiences.find(
              experience => experience.company === companyName
            );

            const isInfoHidden = review.hide_emp_info;

            const avatar = review.userProfile?.Profile?.avatar
            const profileImageSrc = avatar ? `/assets/images/${avatar.originalname}`
              : <AvatarIcon />;

            return (
              <ReviewCard
                key={idx}
                idx={idx}
                rating={userOverallRating} // Use individual user rating
                designation={isInfoHidden ? 'xxxxxx' : (userExperience ? userExperience.designation : 'N/A')}
                name={isInfoHidden ? 'xxxxxx xxxxxx' : `${review.userProfile?.firstname} ${review.userProfile?.lastname}`}
                profile={isInfoHidden ? <AvatarIcon /> : profileImageSrc}
                country={isInfoHidden ? 'xxxxxx' : review.userProfile?.country}
                clickfunction={() => handleSingleClick(review)} // Set selected review on click
              />
            );
          })}
        </div>

      </div>
    </>
  );
};

export default TotalReviews;
