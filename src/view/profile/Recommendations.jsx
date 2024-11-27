"use client";
import React, { useState } from "react";
import { EditIcon, ManIcon } from "../../icon";
import AboutDrawer from "../../components/Drawers/AboutDrawer";
import recommendstyles from "../../style/pageStyle/profileStyle/aboutCard.module.scss";
import styles from "../../style/pageStyle/profileStyle/recommendationCard.module.scss";

const Recommendations = ({ }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Received');
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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

  const testimonials = [
    {
      id: 1,
      name: 'Nauman Ahmed',
      relation: '2nd',
      profilePic: 'nauman.jpg', // Replace with actual image path
      title: 'AWS Certified Full Stack Developer Laravel|Node|AWS|WordPress|CodeIgniter|Web Automation|Scraping Expert',
      date: 'April 16, 2024',
      description: 'Ameer Hamza worked with Nauman but on different teams',
      feedback: 'He is passionate about what he is doing.',
    },
    {
      id: 2,
      name: 'Muhammad Bilal Younis',
      relation: '2nd',
      profilePic: 'bilal.jpg', // Replace with actual image path
      title: 'Electrical Engineer (Electronics)',
      date: 'December 10, 2023',
      description: 'Ameer Hamza and Muhammad Bilal studied together',
      feedback: 'Bilal is a quick learner and very smart worker. His way of doing works are very professional and he is a very friendly person.',
    },
  ];


  return (
    <div className={recommendstyles["about-card"]}>
      <div className={recommendstyles["header"]}>
        <div>
          <ManIcon />
        </div>
        <div className={recommendstyles["sub-header"]}>
          <p className={recommendstyles["title"]}>Recommendations</p>
          <div className={recommendstyles["edit-icon"]}
          // onClick={toggleMenu}
          >
            <EditIcon />
          </div>
        </div>
      </div>
      <p className={recommendstyles["description"]}>
        {/* {about || "No about information available"} */}
      </p>

      <div className={styles.recommendations}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'Received' ? styles.active : ''}`}
            onClick={() => setActiveTab('Received')}
          >
            Received
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'Given' ? styles.active : ''}`}
            onClick={() => setActiveTab('Given')}
          >
            Given
          </button>
        </div>
        <div className={styles.content}>
          {activeTab === 'Received' && (
            <>
              <h3>Nothing to see for now</h3>
              <p>Recommendations that Ameer Hamza receives will appear here.</p>
            </>
          )}
          {activeTab === 'Given' && (
            <div className={styles.testimonials}>
              {testimonials.map((testimonial) => (
                <div className={styles.testimonial} key={testimonial.id}>
                  <img src={testimonial.profilePic} alt={testimonial.name} className={styles['profile-pic']} />
                  <div className={styles.text}>
                    <h3>
                      {testimonial.name} <span className={styles.relation}>· {testimonial.relation}</span>
                    </h3>
                    <p className={styles.title}>{testimonial.title}</p>
                    <p className={styles.date}>{testimonial.date}, {testimonial.description}</p>
                    <p className={styles.feedback}>{testimonial.feedback}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
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
    </div>
  );
};

export default Recommendations;
