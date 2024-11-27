"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Button from "../../dump/Button";
import { getSingleCompanyData } from "../../services/company";
import { addToWatchlist, removeFromWatchlist, addToFollow, removeFromFollowing, getUserId } from "../../services/user";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from "next/navigation";
import styles from "../../style/componentStyle/banner.module.scss";
import { EditIcon, SettingOption, FollowArrow, WhiteEyeIcon } from "../../icon";
import CompanyVerifyModal from "./VerifyCompany";

const Banner = () => {
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId");
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const [industry, SetIndustry] = useState("");
  const [followers, SetFollowers] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUserId = getUserId();

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      if (!companyId) return;
      try {
        const userData = await getSingleCompanyData(companyId);
        if (userData) {
          const parsedLogo = JSON.parse(userData.logo);
          // const avatarData = userData.Profile.avatar ? JSON.parse(userData.Profile.avatar) : null;
          // const avatarURL = avatarData ? `/assets/images/${avatarData.originalname}` : ""; // Default if avatar is null
          // setAvatar(avatarURL); // Set default avatar image
          setLogo(parsedLogo.originalname);
          setName(userData.name);
          SetIndustry(userData.industry);
          const followersArray = Array.isArray(userData.followers)
            ? userData.followers
            : JSON.parse(userData.followers || '[]');

          SetFollowers(followersArray);
          console.log("Followers Array:", followersArray);

          // Check if userId is in followers and set isFollowing
          const isUserFollowing = followersArray.includes(String(currentUserId));
          console.log("User Following Status:", isUserFollowing);
          setIsFollowing(isUserFollowing);
        } else {
          console.log("Profile data not available");
        }
      } catch (error) {
        console.log("Failed to load user data");
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

  const handleAddToWatchlist = async (userId) => {
    try {
      const response = await addToFollow(userId);
      toast.success(response.message);
      setIsFollowing(true);
      SetFollowers(prev => [...prev, String(currentUserId)]);
    } catch (error) {
      toast.error(response.error);
    }
  };

  const handleRemoveFromWatchlist = async (userId) => {
    try {
      const response = await removeFromFollowing(userId); // Call your remove function
      toast.success(response.message);
      setIsFollowing(false);
      SetFollowers(prev => prev.filter(id => id !== String(currentUserId)));
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles["background-section"]}>
      <div className={styles["inner-section"]}>
        {logo && (
          <Image
            src={logo ? `/assets/images/${logo}` : '/assets/images/logo-1.png'}
            alt="Company Logo"
            height={130}
            width={130}
            className={styles.logo}
          />

        )}
        <div className={styles["info-section"]}>
          <p className={styles["user-info"]}>
            <span>{name}</span>
            <span className={styles["AndBar"]}>|</span>
            <span>{industry}</span>
          </p>
          <div className={styles["follow-section"]}>
            <p className={styles.followers}> {followers.length} follower{followers.length !== 1 ? 's' : ''}</p>
            <Button
              text={"Claim Company"}
              icon={<FollowArrow />}
              classes={styles["follow-button"]}
              onClick={handleOpenModal}
            />
            <CompanyVerifyModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onContinue={handleContinue}
            />
            <Button
              text={isFollowing ? "Remove from Watchlist" : "Add to Watchlist"}
              classes={styles["follow-button"]}
              onClick={isFollowing ? handleRemoveFromWatchlist : handleAddToWatchlist}
              icon={<WhiteEyeIcon />}
            />
          </div>
          <div className={styles["edit-section"]}>
            <Button text={<EditIcon fill="white" />} />
            <Button text={<SettingOption />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;