"use client";
import React, { useState, useEffect } from "react";
import styles from "../../style/pageStyle/profileStyle/profile.module.scss"
import CompanyDetailCard from "./CompanyDetailCard";
import ContactInfoCard from "./ContactInfoCard";
import ResumeCard from "./ResumeCard";
import AboutCard from "./AboutCard";
import Recommendations from "./Recommendations";
import TagsCard from "./TagsCard";
import ExperienceCard from "./ExperienceCard";
import EducationCard from "./EducationCard";
import SkillsCard from "./SkillsCard";
import TopCompanies from "./TopCompanies";
import LanguagesCard from "./LanguagesCard";
import TopProfiles from "./TopProfiles";
import PeopleYouKnow from "./PeopleYouKnow";
import { useSearchParams } from "next/navigation";
import { getUserData, getUserById } from "../../services/user";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PdfIcon } from "../../icon";

const ProfileView = ({ props }) => {
  const [profile, setProfile] = useState({
    currentJob: null,
    about: "",
    dateOfBirth: "Not provided",
    email: "",
    phone: "",
    experienceData: [],
    educationData: [],
    languages: [],
    skills: [],
    tags: [],
    resumes: [],
  });
  const [loading, setLoading] = useState(true);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const formatDateOfBirth = (date) => {
    if (!date) return "Not provided";
    const dob = new Date(date);
    return dob.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const calculateCompletionPercentage = (data) => {
    const sections = [
      data.Profile?.about,
      data.Experiences?.length > 0,
      data.Education?.length > 0,
      data.Profile?.languages,
      data.Profile?.skills,
      data.Profile?.tags,
      data.Profile?.resume,
    ];
    const filledSections = sections.filter(Boolean).length;
    return Math.round((filledSections / sections.length) * 100);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const userData = userId ? await getUserById(userId) : await getUserData();
        console.log("Complete data on one page: ", userData);

        if (userData) {
          const presentJob = userData.Experiences ? userData.Experiences?.find(job => job.current) : [];
          const languagesArray = userData.Profile?.languages ? userData.Profile.languages.split(",") : [];
          const skillsArray = userData.Profile?.skills ? userData.Profile.skills.split(",") : [];
          const tagsArray = userData.Profile?.tags ? userData.Profile.tags.split(",") : [];
          const resumesArray = userData.Profile?.resume ? [{
            icon: <PdfIcon />,
            name: "Resume",
            date: "07/12/2024",
            url: userData.Profile.resume,
          }] : [];

          setProfile({
            currentJob: presentJob || null,
            about: userData.Profile?.about || "",
            dateOfBirth: formatDateOfBirth(userData.Profile?.dateOfBirth),
            email: userData.email || "",
            phone: userData.phone || "",
            experienceData: userData.Experiences || [],
            educationData: userData.Education || [],
            languages: languagesArray,
            skills: skillsArray,
            tags: tagsArray,
            resumes: resumesArray,
          });

          // Calculate and set profile completion percentage
          const completion = calculateCompletionPercentage(userData);
          setCompletionPercentage(completion);

        } else {
          toast.error("Profile data not available");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className={styles.profile}>
      <div className={styles['content-container']}>
        <div className={styles['left-column']}>
          <CompanyDetailCard currentJob={profile.currentJob} />
          <ContactInfoCard dateOfBirth={profile.dateOfBirth}
            phone={profile.phone} email={profile.email} />
          <ResumeCard resumes={profile.resumes} />
        </div>
        <div className={styles['center-column']}>
          <AboutCard about={profile.about} />
          <TagsCard tags={profile.tags} />
          <ExperienceCard experienceData={profile.experienceData} />
          <EducationCard educationData={profile.educationData} />
          <SkillsCard skills={profile.skills} />
          <LanguagesCard languages={profile.languages} />
          <Recommendations />
        </div>
        <div className={styles['right-column']}>
          <TopCompanies />
          <TopProfiles />
          <PeopleYouKnow />
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