import React, { useState, useEffect } from "react";
import { getReviewData } from "../../services/review";
// import AboutDrawer from "../../../components/Drawers/AboutDrawer";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from "../../style/pageStyle/employerProfile/ratting.module.scss";
import RatingItem from "./RatingsItem";
import { useSearchParams } from "next/navigation";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { LongArrowIcon } from "../../icon";
ChartJS.register(ArcElement, Tooltip, Legend);

const RattingCard = () => {
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId");
  // const [isOpen, setIsOpen] = useState(false);
  const [compensation, setCompensation] = useState(0);
  const [work_balance, setWorkBalance] = useState(0);
  const [career_opportunities, setCareerOpportunities] = useState(0);
  const [cutlers, setCutlers] = useState(0);

  useEffect(() => {
    const fetchReview = async () => {
      if (!companyId) return;

      try {
        const reviews = await getReviewData(companyId);
        console.log("Fetched reviews:", reviews);

        if (reviews && reviews.length > 0) {
          // Calculate average ratings for each category
          const avgCompensation = (
            reviews.reduce((sum, review) => sum + review.compensation, 0) / reviews.length
          ).toFixed(1);

          const avgWorkBalance = (
            reviews.reduce((sum, review) => sum + review.work_balance, 0) / reviews.length
          ).toFixed(1);

          const avgCareerOpportunities = (
            reviews.reduce((sum, review) => sum + review.career_opportunities, 0) / reviews.length
          ).toFixed(1);

          const avgCutlers = (
            reviews.reduce((sum, review) => sum + review.cutlers, 0) / reviews.length
          ).toFixed(1);

          // Update state with calculated averages
          setCompensation(avgCompensation);
          setWorkBalance(avgWorkBalance);
          setCareerOpportunities(avgCareerOpportunities);
          setCutlers(avgCutlers);
        } else {
          console.error("Review data not available");
        }
      } catch (error) {
        console.error("Failed to load Review data");
      }
    };

    fetchReview();
  }, [companyId]);

  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };

  const pieData = {
    labels: ['Compensation & Benefits', 'Work-Life Balance', 'Career Opportunities', 'Culture & Values'],
    datasets: [
      {
        label: 'Overall Ratings',
        data: [compensation, work_balance, career_opportunities, cutlers],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className={styles["contact-container"]}>
      <div className={styles.header}>
        <p className={styles.title}>About Andropple Soft</p>
        <div className={styles["add-icon"]} >
          Add Review <LongArrowIcon />
        </div>
      </div>
      <div className={styles["chart-container"]}>
        <div className={styles["pie-chart"]}>
          <Pie data={pieData} options={options} />
        </div>
        <div className={styles["chart-labels"]}>
          {pieData.labels.map((label, index) => (
            <div key={index} className={styles["label"]}>
              <span
                className={styles["color-box"]}
                style={{ backgroundColor: pieData.datasets[0].backgroundColor[index] }}
              ></span>
              {label}
            </div>
          ))}
        </div>
      </div>
      <div className={styles["header"]}>
        <div className={styles["sub-header"]}>
          <div className={styles["title"]} >
          </div>
        </div>
      </div>

      <div className={styles["rating"]}>
        <RatingItem
          label="Compensation & Benefits"
          rating={compensation}
        />
        <RatingItem
          label="Work-Life Balance"
          rating={work_balance}
        />
      </div>
      <div className={styles["rating"]}>
        <RatingItem
          label="Career Opportunities"
          rating={career_opportunities}
        />
        <RatingItem
          label="Culture & Values"
          rating={cutlers}
        />
      </div>
      {/* <AboutDrawer
        title={"Contact Info"}
        buttonText={"Save"}
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        handleSave={() => { }}
      /> */}
    </div >
  );
};

export default RattingCard;
