"use client";
import React, { useState, useEffect } from "react";
import styles from "../../../style/pageStyle/candidateProfile/profile.module.scss";
import candidatestyles from "../../../style/pageStyle/candidateProfile/totalCandidates.module.scss";
import CompanyDetailCard from "./CompanyDetailCard";
import ContactInfoCard from "./ContactInfoCard";
import ResumeCard from "./ResumeCard";
import AboutCard from "./AboutCard";
import ProjectsCard from "./Projects";
import TagsCard from "./TagsCard";
import ExperienceCard from "./ExperienceCard";
import EducationCard from "./EducationCard";
import SkillsCard from "./SkillsCard";
import CandidateCard from "../../../components/Candidate/CandidateCard";
import LanguagesCard from "./LanguagesCard";
import { useSearchParams } from "next/navigation";
import { getUserData, getUserById } from "../../../services/user";
import { removeFromShortlist, removeCandidatesByCategory, getCategories, getCandidatesByCategory } from '../../../services/shortlist';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ArrowIcon, AvatarIcon, PdfIcon } from "../../../icon";

const ProfileView = ({ props }) => {
  const [Candidates, setCandidates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const searchParams = useSearchParams();
  const CandidateId = searchParams.get("id");
  const CandidateCategory = searchParams.get("category");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [Shortlists, setShortlist] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [isShortlisted, setIsShortlisted] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log("Selected Category:", category);
  };


  useEffect(() => {
    const fetchCandidatesByCategory = async () => {
      if (selectedCategory) {
        try {
          const candidatesData = await getCandidatesByCategory(selectedCategory);
          setCandidates(candidatesData);
        } catch (error) {
          console.error("Error fetching candidates by category:", error);
        }
      }
    };

    fetchCandidatesByCategory();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setShortlist(categoriesData);
        console.log("shortlisted", Shortlists);
        const uniqueCategories = Array.from(new Set(categoriesData.map(cat => cat.category)));
        setCategories(uniqueCategories.map(cat => ({ category: cat })));

        const shortlistedStatus = uniqueCategories.reduce((acc, cat) => {
          const isShortlisted = categoriesData.some(item => {
            const matchesCategory = item.category === cat;
            const matchesUserId = String(item.candidateId) === String(userId);

            // Log to see what's happening in each iteration
            console.log(`Category: ${cat}, CandidateId: ${item.candidateId}, UserId: ${userId}, Matches: ${matchesCategory && matchesUserId}`);

            return matchesCategory && matchesUserId;
          });

          acc[cat] = isShortlisted;
          return acc;
        }, {});

        setIsShortlisted(shortlistedStatus);
        console.log("Unique categories:", uniqueCategories);
        console.log("Shortlisted status:", shortlistedStatus);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchUserProfile = async (candidateId) => {
    console.log("id", candidateId)
    try {
      const userProfile = await getUserById(candidateId);
      return userProfile;
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      toast.error("User profile not available");
      return null;
    }
  };

  useEffect(() => {
    // Set the initial category if it exists in the URL
    if (CandidateCategory) {
      setSelectedCategory(CandidateCategory);
    }

    // Fetch the profile if `userId` (candidate ID) is available
    const fetchInitialProfile = async () => {
      if (CandidateId) {
        try {
          const profile = await fetchUserProfile(CandidateId); // assuming `userId` is the correct candidate ID
          setCandidates([{ candidateId: CandidateId, userProfile: profile }]);
          setSelectedCandidate({ candidateId: CandidateId, userProfile: profile }); // Set as selected candidate on initial load
        } catch (error) {
          console.error("Error fetching initial candidate profile:", error);
        }
      }
    };

    fetchInitialProfile();
  }, [CandidateId, CandidateCategory]);

  const formatDateOfBirth = (date) => {
    if (!date) return "Not provided";
    const dob = new Date(date);
    return dob.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchCandidatesByCategory = async () => {
      if (selectedCategory) {
        try {
          const candidatesData = await getCandidatesByCategory(selectedCategory);
          if (candidatesData && candidatesData.length >= 0) {
            const CandidatesWithUserProfiles = await Promise.all(
              candidatesData.map(async (candidate) => {
                const userProfile = await fetchUserProfile(candidate.candidateId);
                return {
                  ...candidate,
                  userProfile,
                };
              })
            );
            setCandidates(CandidatesWithUserProfiles);
            console.log("Candidates with User Profiles:", CandidatesWithUserProfiles);
          } else {
            console.log("Candidate data not available");
          }
        } catch (error) {
          console.error("Error fetching candidates by category:", error);
        }
      }
    };

    fetchCandidatesByCategory();
  }, [selectedCategory]);


  const handleSingleClick = async (candidate) => {
    const profile = await fetchUserProfile(candidate.candidateId);
    setSelectedCandidate({ candidateId: candidate.candidateId, userProfile: profile });
    console.log("selected id", candidate.candidateId);
  };

  const removeFromShortlistSingle = async (userId, category) => {
    try {
      const encodedCategory = encodeURIComponent(category);  // Encode category here
      const response = await removeFromShortlist(userId, encodedCategory);

      // Check if response is an object and contains the message
      if (response && response.message) {
        toast.success(response.message);
        setSelectedCategory(""); // Reset selected category
        // Filter out the deleted category from the list
        setCategories(Categories.filter(cat => cat.category !== category));
      } else {
        toast.error("Failed to remove from shortlist.");
      }
    } catch (error) {
      console.error("Error removing from shortlist:", error);
      toast.error(error.message || "Error removing from shortlist.");
    }
  };

  const handleRemoveCategory = async (categoryToRemove) => {
    try {
      const response = await removeCandidatesByCategory(categoryToRemove);

      if (response.message) {
        toast.success(response.message);
        setSelectedCategory("");
        setCategories(Categories.filter(cat => cat.category !== categoryToRemove)); // Update categories list
      } else {
        toast.error("Failed to remove candidates.");
      }
    } catch (error) {
      console.error("Error removing category:", error);
      toast.error(error.message || "Error removing category");
    }
  };

  return (
    <div className={styles.profile}>
      <div className={styles['content-container']}>
        <div className={styles['left-column']}>
          <div className={candidatestyles['top-profile-card']}>
            <div className={candidatestyles["header"]}>
              <div className={candidatestyles["sub-header"]}>
                <p><b>{Shortlists.length} Candidates</b></p>
              </div>
            </div>
            <div className={`${candidatestyles["saved-searches-dropdown"]} ${isOpen ? candidatestyles["open"] : ''}`}>
              <div className={candidatestyles["header"]} onClick={toggleDropdown}>
                <span className={candidatestyles["title"]}>My Shortlist's Categories</span>
                <div className={candidatestyles["icons"]}>
                  <span className={candidatestyles["arrow"]} style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>
                    <ArrowIcon />
                  </span>
                </div>
              </div>
              {isOpen && (
                <div className={candidatestyles["dropdown-content"]}>
                  <div className={candidatestyles.categoryList}>
                    <div className={candidatestyles.list}>
                      {Categories.map((cat, idx) => (
                        <button
                          key={idx}
                          className={`${candidatestyles.categoryItem} ${selectedCategory === cat.category ? candidatestyles.selected : ""}`}
                          onClick={() => handleCategorySelect(cat.category)}
                        >
                          <div className={candidatestyles.categoryInfo}>
                            <span>{cat.category}</span>
                            {isShortlisted[cat.category] && (
                              <div
                                className={candidatestyles.shortlistedText}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFromShortlistSingle(userId, cat.category);
                                }}
                              >
                                Remove from this shortlist.
                              </div>
                            )}
                          </div>
                          <span
                            className={candidatestyles.removeIcon}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveCategory(cat.category);
                            }}
                          >
                            &times;
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className={candidatestyles['profile-list']}>
              {Candidates.length > 0 ? (
                Candidates.map((candidate, idx) => {
                  let profileImageSrc;
                  let avatar;
                  try {
                    avatar = JSON.parse(candidate.userProfile?.Profile?.avatar || '{}');
                    profileImageSrc = avatar.originalname ? `/assets/images/${avatar.originalname}` : null;
                  } catch (e) {
                    console.error("Failed to parse avatar JSON:", e);
                    profileImageSrc = null;
                  }

                  return (
                    <CandidateCard
                      key={idx}
                      name={`${candidate.userProfile?.firstname || ''} ${candidate.userProfile?.lastname || ''}`}
                      profile={profileImageSrc || <AvatarIcon />}
                      country={candidate.userProfile?.country || 'N/A'}
                      city={candidate.userProfile?.city || 'N/A'}
                      clickfunction={() => handleSingleClick(candidate)}
                    />
                  );
                })
              ) : (
                <p>No candidates in this category</p>
              )}
            </div>
          </div>

        </div>
        <div className={styles['center-column']}>
          {selectedCandidate && (
            <div>
              <CompanyDetailCard currentJob={selectedCandidate.userProfile.Experiences?.find(job => job.current)} />
              <ContactInfoCard
                dateOfBirth={selectedCandidate.userProfile.Profile?.dateOfBirth}
                phone={selectedCandidate.userProfile.phone}
                email={selectedCandidate.userProfile.email}
              />
              <ResumeCard resumes={selectedCandidate.userProfile.Profile?.resume
                ? [{
                  icon: <PdfIcon />,
                  name: "Resume",
                  date: "07/12/2024", // You can replace with dynamic date if available
                  url: selectedCandidate.userProfile.Profile?.resume,
                }]
                : [] || []} />
            </div>
          )}
        </div>
        <div className={styles['right-column']}>
          {selectedCandidate && (
            <div>
              <AboutCard about={selectedCandidate.userProfile.Profile?.about || ""} />
              <TagsCard tags={selectedCandidate.userProfile.Profile?.tags.split(",") || []} />
              <ExperienceCard experienceData={selectedCandidate.userProfile.Experiences || []} />
              <EducationCard educationData={selectedCandidate.userProfile.Education || []} />
              <SkillsCard skills={selectedCandidate.userProfile.Profile?.skills.split(",") || []} />
              <LanguagesCard languages={selectedCandidate.userProfile.Profile?.languages.split(",") || []} />
              <ProjectsCard projects={selectedCandidate.userProfile.Projects || []} />
            </div>
          )}
        </div>

      </div>
    </div>
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

export default ProfileView;