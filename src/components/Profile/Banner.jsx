"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Button from "../../dump/Button";
import { getUserData, getUserById, addToFollow, removeFromFollowing, getUserId } from "../../services/user";
import { removeFromShortlist } from '../../services/shortlist';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from "../../style/componentStyle/banner.module.scss";
import { EditIcon, SettingOption, FollowArrow, AvatarIcon, ShortlistIcon } from "../../icon";
import { useSearchParams } from "next/navigation";
import CategoryModel from "../../components/Profile/CategoryModel";

const Banner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [skills, SetSkills] = useState("");
  const [followers, SetFollowers] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowBack, setIsFollowBack] = useState(false);
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  console.log("profile which we visit", userId);
  const currentUserId = getUserId();
  console.log("current user", currentUserId);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        let userData;
        if (userId) {
          // If there is a userId in the URL, get data for that user
          userData = await getUserById(userId);
          if (userData) {
            const followersArray = Array.isArray(userData.followers)
              ? userData.followers
              : JSON.parse(userData.followers || '[]');

            SetFollowers(followersArray);
            console.log("Followers Array:", followersArray);

            // Check if userId is in followers and set isFollowing
            const isUserFollowing = followersArray.includes(String(currentUserId));
            console.log("User Following Status:", isUserFollowing);
            setIsFollowing(isUserFollowing);
            const isUserFollowBack = !isUserFollowing && userData.following.includes(String(currentUserId));
            console.log("User Follow Back Status:", isUserFollowBack);
            setIsFollowBack(isUserFollowBack);
          }
        } else {
          userData = await getUserData();
        }

        if (userData) {
          setFirstName(userData.firstname || "N/A");
          setLastName(userData.lastname || "N/A");

          if (userData.Profile) {
            const avatarData = userData.Profile.avatar ? JSON.parse(userData.Profile.avatar) : null;
            const avatarURL = avatarData ? `/assets/images/${avatarData.originalname}` : ""; // Default if avatar is null
            setAvatar(avatarURL); // Set default avatar image

            SetSkills(userData.Profile.skills || "No skills"); // Set default skills text if missing
          } else {
            toast.warn("No profile data found.");
          }
        } else {
          toast.error("Profile data not available");
        }
      } catch (error) {
        toast.error("Failed to load user data");
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleFollowBack = async () => {
    try {
      // Follow the user back (similar to handleAddToFollowers)
      const response = await addToFollow(userId);

      if (response.message) {
        toast.success(response.message); // Show success message from backend response
        setIsFollowing(true); // Update the follow status
        setIsFollowBack(false); // Reset follow back status
        SetFollowers((prevFollowers) => [...prevFollowers, String(currentUserId)]); // Add currentUserId to followers list
      } else {
        toast.error("Failed to follow user back.");
      }
    } catch (error) {
      console.error("Error following user back:", error);
      toast.error(error.message || "Error following user back");
    }
  };

  // Handle Add to Followers button click
  const handleAddToFollowers = async () => {
    try {
      // Call the backend function to follow the user
      const response = await addToFollow(userId);

      if (response.message) {
        toast.success(response.message); // Show success message from backend response
        setIsFollowing(true); // Update the follow status
        SetFollowers((prevFollowers) => [...prevFollowers, String(currentUserId)]); // Add currentUserId to followers list
      } else {
        toast.error("Failed to follow user.");
      }
    } catch (error) {
      console.error("Error adding to followers:", error);
      toast.error(error.message || "Error adding to followers");
    }
  };

  // Handle Remove from Following button click
  const handleRemoveFromFollowing = async () => {
    try {
      // Call the backend function to unfollow the user
      const response = await removeFromFollowing(userId);

      if (response.message) {
        toast.success(response.message);  // Show success message from backend response
        setIsFollowing(false);  // Update the follow status to unfollow
        SetFollowers((prevFollowers) => prevFollowers.filter(id => id !== String(currentUserId)));  // Remove currentUserId from followers list
      } else {
        toast.error("Failed to unfollow user.");
      }
    } catch (error) {
      console.error("Error removing from followers:", error);
      toast.error(error.message || "Error removing from followers");
    }
  };

  const handleToggleList = () => {
    setShowList(!showList);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles["background-section"]}>
      <div className={styles["inner-section"]}>
        {avatar ? (
          <Image
            src={avatar}
            alt="avatar"
            height={130}
            width={130}
            className={styles.avatar}
          />
        ) : (
          <div className={styles.avatar}>
            <AvatarIcon />
          </div>
        )}
        <div className={styles["info-section"]}>
          <p className={styles["user-info"]}>
            <span>{firstname} {lastname}</span>
            <span className={styles["AndBar"]}>|</span>
            <span>{skills}</span>
          </p>

          {/* Conditionally render follow, shortlist, and settings buttons if userId exists */}
          {userId && userId != currentUserId && (
            <div className={styles["follow-section"]}>
              <p className={styles.followers}>
                {followers.length} follower{followers.length !== 1 ? 's' : ''}
              </p>
              <Button
                text={isFollowBack ? "Follow Back" : isFollowing ? "UnFollow" : "Follow"} // Display "Follow Back" if needed
                icon={<FollowArrow />}
                classes={styles["follow-button"]}
                onClick={isFollowBack ? handleFollowBack : isFollowing ? handleRemoveFromFollowing : handleAddToFollowers}
              />
              <Button
                text={"ShortList"}
                icon={<ShortlistIcon />}
                classes={styles["Short-List"]}
                onClick={handleOpenModal}
              />
              <CategoryModel
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onContinue={() => setIsModalOpen(false)}
                userId={userId}
              />
            </div>
          )}

          <div className={styles["edit-section"]}>
            {(userId == currentUserId) || !userId && <Button text={<EditIcon fill="white" />} />}
            <div style={{ position: "relative" }}>
              {userId && userId !== currentUserId && (
                <Button
                  text={<SettingOption />}
                  onClick={handleToggleList}
                />
              )}

              {showList && (
                <div
                  style={{
                    position: "absolute",
                    left: "-150px", // Adjust to position the list to the left of the button
                    top: "0",
                    backgroundColor: "white",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    borderRadius: "4px",
                    padding: "8px",
                    width: "500%",
                    zIndex: 1, // To ensure it appears above other elements

                  }}
                >
                  <ul style={{ listStyleType: "none", padding: 0, margin: 0, cursor: 'pointer' }}>
                    <li onClick={() => console.log("Option 1 clicked")}>Download Resume</li>
                    <li onClick={() => console.log("Option 3 clicked")}>Request for Recommend</li>
                    <li onClick={() => console.log("Option 2 clicked")}>Recommend</li>
                  </ul>
                </div>
              )}
            </div>
            {/* Conditionally render the SettingOption button if userId exists */}
            {/* {userId && userId != currentUserId && <Button text={<SettingOption />} />} */}
          </div>
        </div>
      </div>
    </div>

  );
};

export default Banner;
