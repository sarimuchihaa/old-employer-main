import React from "react";
import { EditIcon, PlusIcon, EductionIcon } from "../../../icon";
import EducationDetails from "../../../components/Profile/EducationDetails";
import EducationDrawer from "../../../components/Drawers/EducationDrawer";
// style file
import styles from "../../../style/pageStyle/profileStyle/eductionCard.module.scss";

const EducationCard = ({ educationData }) => {
  // const [isOpen, setIsOpen] = useState(false);

  // if (educationData) {
  //   console.log(avatarURL);
  //   educationItem.logo = `/assets/images/${avatarURL}`
  // }
  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className={styles["Eduction-card"]}>
      <div className={styles["header"]}>
        <div>
          <EductionIcon />
        </div>
        <div className={styles["sub-header"]}>
          <p className={styles["title"]}>Education</p>
          <div className={styles["edit-icon"]}
          // onClick={toggleMenu}
          >
            <EditIcon />
          </div>
          <div className={styles["Add-icon"]}
          // onClick={toggleMenu}
          >
            <PlusIcon />
          </div>
        </div>
      </div>

      <div className="">
        {educationData.map((educationItem, idx) => {
          let logoURL = "/default-image.jpg"; // default logo path
          if (educationItem.logo) {
            try {
              const logo = JSON.parse(educationItem.logo);
              logoURL = `/assets/images/${logo.originalname}`;
            } catch (error) {
              console.error("Error parsing logo JSON:", error);
            }
          }

          return (
            <EducationDetails
              key={idx}
              logo={logoURL}
              institute={educationItem.institute}
              degree={educationItem.degree}
              fromDate={educationItem.fromDate}
              toDate={educationItem.toDate}
              grade={educationItem.grade}
            />
          );
        })}
      </div>

      {/* <EducationDrawer
        title={"Education"}
        buttonText={"Save"}
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        inputs={educationData}
        handleSave={() => { }}
      /> */}
    </div>
  );
};

export default EducationCard;
