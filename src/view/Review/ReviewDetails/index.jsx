"use client";
import React, { useState, useEffect } from "react";
import styles from "../../../style/pageStyle/reviewStyle/ReviewDetails/reviewDetails.module.scss";
// import styles from "../../../style/pageStyle/reviewStyle/review.module.scss";
import CompanyCard from "./CompanyCard";
import UserCard from "./UserCard";
import InfoCard from "./Info";
import SalaryCard from "./SalaryCard";
import LeavesCard from "./Leaves";
import BenefitsCard from "./Benefits";
import PublicReviewCard from "./ReviewCard";
import CommentCard from "./CommentCard";
import PlanCard from "./PlanCard";
import ReviewCard from "../../../components/Employer/ReviewCard";
import { useRouter, useSearchParams } from "next/navigation";
import { getReviewData, getEndowsData } from "../../../services/review";
import { getSingleCompanyData } from "../../../services/company";
import { getUserById } from "../../../services/user";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AvatarIcon, SuggestionsIcon, CrossIcon, InfoIcon, LeavesIcon, RatingIcon, SalaryIcon, TickIcon, UnverifiedIcon, VerifiedIcon } from "../../../icon";

const ReviewDetails = ({ props }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId");
  const selectedReviewIndex = searchParams.get("index");
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [company, setCompany] = useState('');
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);

  useEffect(() => {
    console.log("selectedReviewIndex from URL:", selectedReviewIndex); // Debugging line

    const fetchCompanyName = async () => {
      if (!companyId) return;
      const company = await getSingleCompanyData(companyId);
      const reviews = await getReviewData(companyId);
      const endows = await getEndowsData(companyId);

      let logoPath = '/assets/images/logo.png';
      try {
        const logoData = JSON.parse(company.logo);
        logoPath = logoData.originalname ? `/assets/images/${logoData.originalname}` : logoPath;
      } catch (error) {
        console.error("Failed to parse logo data:", error);
      }

      let yesCounter = 0;
      let noCounter = 0;
      const allReviews = [...(reviews || []), ...(endows || [])];

      allReviews.forEach((item) => {
        if (item.emp_thougts === 'good') yesCounter++;
        else if (item.emp_thougts === 'bad') noCounter++;
      });

      setYesCount(yesCounter);
      setNoCount(noCounter);
      setCompany({ ...company, logo: logoPath });
    };

    fetchCompanyName();
  }, [companyId]);

  const fetchUserProfile = async (userId) => {
    if (!userId) return null;
    try {
      const userProfile = await getUserById(userId);
      return userProfile;
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      toast.error("User profile not available");
      return null;
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      if (!companyId) return;

      try {
        const fetchedReviews = await getReviewData(companyId);
        console.log("Fetched Reviews:", fetchedReviews); // Log the fetched reviews

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
          console.log("Reviews with User Profiles:", reviewsWithUserProfiles); // Log the reviews with UUIDs

          const foundReview = reviewsWithUserProfiles.find((review) => review.id === selectedReviewIndex);
          if (!foundReview) {
            console.warn("No review found for selectedReviewIndex:", selectedReviewIndex);
          }
          setSelectedReview(foundReview || reviewsWithUserProfiles[0]);
          console.log("Selected Review based on UUID:", reviewsWithUserProfiles[0]);
        } else {
          toast.error("Review data not available");
        }
      } catch (error) {
        toast.error("Failed to load review data");
      }
    };


    fetchReviews();
  }, [companyId, selectedReviewIndex]);

  const handleReviewSelect = (review) => {
    setSelectedReview(review);
    console.log("Selected Review:", review);
  };

  const handleCommentChange = (e) => {
    // const selectedStatus = e.target.value;
    // setPublicReview(selectedStatus);
    // console.log("Selected Status:", selectedStatus); // Log the selected status
    // if (onStatusChange) {
    //   onStatusChange(selectedStatus);
    // }
  };
  return (
    <div className={styles.review}>
      <div className={styles["content-container"]}>
        <div className={styles['left-column']}>
          <CompanyCard name={company.name} logo={company.logo} yesCount={yesCount} noCount={noCount} />
          <div className={styles['totalReviews']}>
            <p>{reviews.length} Reviews</p>
          </div>
          <div className={styles['top-profile-card']}>
            <div className={styles['profile-list']}>
              {reviews.map((review, idx) => {
                const userOverallRating = (
                  (review.compensation + review.work_balance + review.career_opportunities + review.cutlers) / 4
                ).toFixed(1);

                const userExperience = review.userProfile?.Experiences.find(
                  experience => experience.company === company.name
                );
                const isInfoHidden = review.hide_emp_info;

                const avatar = review.userProfile?.Profile?.avatar
                const profileImageSrc = avatar ? `/assets/images/${avatar.originalname}`
                  : <AvatarIcon />;

                return (
                  <ReviewCard
                    key={review.id || idx}
                    idx={idx}
                    rating={userOverallRating}
                    designation={isInfoHidden ? 'xxxxxx' : (userExperience ? userExperience.designation : 'N/A')}
                    name={isInfoHidden ? 'xxxxxx xxxxxx' : `${review.userProfile?.firstname} ${review.userProfile?.lastname}`}
                    profile={isInfoHidden ? <AvatarIcon /> : profileImageSrc}
                    country={isInfoHidden ? 'xxxxxx' : review.userProfile?.country}
                    clickfunction={() => handleReviewSelect(review)}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles["right-column"]}>
          {selectedReview && (
            <>
              <UserCard
                designation={
                  selectedReview.hide_emp_info
                    ? 'xxxxxx'
                    : (selectedReview.userProfile?.Experiences.find(exp => exp.company === company.name)?.designation || 'N/A')
                }
                name={
                  selectedReview.hide_emp_info
                    ? 'xxxxxx xxxxxx'
                    : `${selectedReview.userProfile?.firstname} ${selectedReview.userProfile?.lastname}`
                }
                profile={
                  selectedReview.hide_emp_info
                    ? <AvatarIcon />
                    : selectedReview.userProfile?.Profile?.avatar
                }
                skills={
                  selectedReview.hide_emp_info
                    ? 'xxxxxx'
                    : selectedReview.userProfile?.Profile?.skills
                }
              />

              <PublicReviewCard
                verified={
                  selectedReview.is_verified ? <VerifiedIcon /> : <UnverifiedIcon />
                }
                title="Public Review"
                publicReview={selectedReview.public_review}
                compensation={selectedReview.compensation}
                work_balance={selectedReview.work_balance}
                career_opportunities={selectedReview.career_opportunities}
                cutlers={selectedReview.cutlers}
              />

              <InfoCard title="Common Information"
                icon={<InfoIcon />}
                environment={selectedReview.environment}
                employment={selectedReview.employment}
                recommendation={selectedReview.recommendation ? "I am Recommend this employer" : "I am not Recommend this employer"}
              />
              <BenefitsCard title="Benefits"
                icon={<RatingIcon />}
                Insurance={selectedReview.insurance ? <TickIcon /> : <CrossIcon />}
                Residence={selectedReview.residence ? <TickIcon /> : <CrossIcon />}
                Benovland={selectedReview.benovland_fund ? <TickIcon /> : <CrossIcon />}
                Medical={selectedReview.medical ? <TickIcon /> : <CrossIcon />}
                Other={selectedReview.other_benefit}
              />
              <SalaryCard title="Salary"
                icon={<SalaryIcon />}
                range={selectedReview.salary_range}
                paytime={selectedReview.pay_on_time ? <TickIcon /> : <CrossIcon />}
                bonnes={selectedReview.bonus}
                increment={selectedReview.increment}
                duration={selectedReview.increment_duration} />
              <LeavesCard title="Leaves Policy"
                icon={<LeavesIcon />}
                annually={selectedReview.annually_leaves}
                monthly={selectedReview.monthly_leaves} />
              <CommentCard
                title="Comments"
                handleCommentChange={handleCommentChange}
                Icon={SuggestionsIcon}
                onAreaChange={(suggestions) => handleFieldChange("suggestions", suggestions)}
              />
              <div className="plan-card-section">
                <PlanCard />
              </div>
            </>
          )}
        </div>
      </div>
    </div >
  );
};

export async function getServerSideProps(context) {
  const resp = await profile();

  const data = resp.data;
  return {
    props: {
      data,
    },
  };
}

export default ReviewDetails;
