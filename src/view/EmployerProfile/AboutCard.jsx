"use client";
import React, { useState, useEffect } from "react";
import {
  BenifitsIcon,
  EarthIcon,
  EmployementIcon,
  FundIcon,
  MailIcon,
  MedicaleIcon,
  SalaryRangeIcon,
  TelphoneIcon,
  WorkIcon,
  CrossIcon,
  TickIcon,
  LikeIcon,
  DislikeIcon
} from "../../icon";
import RatingItem from "./RatingItem";
// import AboutDrawer from "../../../components/Drawers/AboutDrawer";
import { useSearchParams } from "next/navigation";
import { getSingleCompanyData } from "../../services/company";
import { getReviewData } from "../../services/review";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from "../../style/pageStyle/employerProfile/about.module.scss";

const AboutCard = () => {
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [web_url, setWeb_URL] = useState();
  const [phone, setPhone] = useState();
  const [size, setSize] = useState("");
  const [employment, setEmployment] = useState("");
  const [otherBenefits, setOtherBenefits] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [benovland, setBenovland] = useState("");
  const [environment, setEnvironment] = useState("");
  const [medical, setMedical] = useState("");
  // const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      if (!companyId) return;
      try {
        const companyData = await getSingleCompanyData(companyId);
        if (companyData) {
          setAbout(companyData.about);
          setPhone(companyData.phone);
          setEmail(companyData.email);
          setWeb_URL(companyData.web_url);
          setSize(companyData.size);
        } else {
          console.error("Profile data not available");
        }
      } catch (error) {
        console.error("Failed to load user data");
      }
    };

    fetchCompanyProfile();
  }, [companyId]);

  useEffect(() => {
    const fetchReview = async () => {
      if (!companyId) return;

      try {
        const reviews = await getReviewData(companyId);
        console.log("Fetched reviews:", reviews);

        if (reviews && reviews.length > 0) {
          const avgEmployment = (
            reviews.reduce((sum, review) => sum + parseInt(review.employment || 0), 0) /
            reviews.length
          ).toFixed(0);

          const benefitsCount = reviews.filter(review => review.other_benefit).length;
          const otherBenefits = benefitsCount > reviews.length / 2 ? "tick" : "cross";

          const salaryRange = getMostCommonValue(reviews.map(review => review.salary_range));

          const benovland = getMajorityIndicator(reviews.map(review => review.benovland_fund));

          const medical = getMajorityIndicator(reviews.map(review => review.medical));

          const environment = getMostCommonValue(reviews.map(review => review.environment)) === "good" ? "like" : "dislike";

          setEmployment(avgEmployment);
          setOtherBenefits(otherBenefits);
          setSalaryRange(salaryRange);
          setBenovland(benovland);
          setMedical(medical);
          setEnvironment(environment);
        } else {
          console.error("Review data not available");
        }
      } catch (error) {
        console.error("Failed to load Review data");
      }
    };

    fetchReview();
  }, [companyId]);

  function getMostCommonValue(arr) {
    const count = {};
    arr.forEach(val => count[val] = (count[val] || 0) + 1);
    return Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b);
  }

  function getMajorityIndicator(arr) {
    const yesCount = arr.filter(value => value === "yes").length;
    return yesCount > arr.length / 2 ? "tick" : "cross";
  }

  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };

  // const handleSaveAbout = async () => {
  //   if (about !== aboutText && about !== "") {
  //     const resp = await addOrUpdateAbout(about);
  //     if (resp.status === 200) {
  //       toggleMenu();
  //       toast.success(
  //         aboutText ? "About updated successfully" : "About added successfully"
  //       );
  //     }
  //   } else {
  //     toast.error("Please made some changes to save");
  //   }
  // };

  const contactInfo = [
    { icon: <TelphoneIcon />, label: phone },
    { icon: <MailIcon />, label: email },
    { icon: <EarthIcon />, label: web_url },
  ];
  return (
    <>
      <div className={styles["about-card"]}>
        <div className={styles["about"]}>
          <div className={styles["header"]}>
            <div className={styles["sub-header"]}>
              <p className={styles["title"]}>About</p>
              {/* <div className={styles["edit-icon"]} onClick={toggleMenu}>
                <EditIcon />
              </div> */}
            </div>
          </div>
          <p className={styles["description"]}>
            {about || "No about information available"}
          </p>
          <div className={styles["review-items"]}>
            <RatingItem
              label="Employment"
              icon={<EmployementIcon />}
              value={employment}
            />
            <RatingItem
              label="Other benifits"
              icon={<BenifitsIcon />}
              value={otherBenefits === "tick" ? <TickIcon /> : <CrossIcon />}
            />
          </div>
          <div className={styles["review-items"]}>
            <RatingItem
              label="Salary Range"
              icon={<SalaryRangeIcon />}
              value={salaryRange}
            />
            <RatingItem
              label="Benovland fund"
              icon={<FundIcon />}
              value={benovland === "tick" ? <TickIcon /> : <CrossIcon />}
            />
          </div>
          <div className={styles["review-items"]}>
            <RatingItem
              label="Working Environment"
              icon={<WorkIcon />}
              value={environment === "like" ? <LikeIcon /> : <DislikeIcon />}
            />
            <RatingItem
              label="Medical"
              icon={<MedicaleIcon />}
              value={medical === "tick" ? <TickIcon /> : <CrossIcon />}
            />
          </div>
        </div>
        <div className={styles["contact"]}>
          <div className={styles["header"]}>
            <div className={styles["sub-header"]}>
              <p className={styles["title"]}>Contact info</p>
              {/* <div className={styles["edit-icon"]} onClick={toggleMenu}>
                <EditIcon />
              </div> */}
            </div>
          </div>
          <div className={styles.content}>
            {contactInfo.map((item, idx) => (
              <p
                key={idx}
                className={styles.item}
              >
                {item.icon} {item.label}
              </p>
            ))}
          </div>
          <div className={styles["ad-card"]}>
            <p>Add here</p>
          </div>
        </div>
      </div>
      {/* <AboutDrawer
        title={"About"}
        buttonText={"Save"}
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        handleSave={handleSaveAbout}
      /> */}
    </>
  );
};

export default AboutCard;
