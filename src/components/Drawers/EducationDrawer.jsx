import React from "react";
import OffCanvas from "../../dump/OffCanvas";
import Input from "../../dump/Input";

// styles file
import styles from "../../style/componentStyle/Drawer.module.scss";


const EducationDrawer = ({
  title,
  buttonText,
  toggleMenu,
  isOpen,
  inputs,
  handleChange,
  handleSave,
}) => {
  return (
    <OffCanvas
      title={title}
      isOpen={isOpen}
      toggleMenu={toggleMenu}
      buttonText={buttonText}
      saveBtnHandler={handleSave}
    >
      <div>
        <Input
          label={"Institute Name"}
          placeholder={"Institute name"}
          containerClassName={styles["Input-margin"]}
          value={inputs.institute}
          onChange={handleChange}
          name={"institute"}
        />
        <Input
          label={"Degree"}
          placeholder={"i.e Bachelor's"}
          containerClassName={styles["Input-margin"]}
          value={inputs.Degree}
          onChange={handleChange}
          name={"Degree"}
        />
        <Input
          label={"Major Subject"}
          placeholder={"i.e Computer Science"}
          containerClassName={styles["Input-margin"]}
          value={inputs.majorSubject}
          onChange={handleChange}
          name={"majorSubject"}
        />
        <Input
          label={"Grade"}
          placeholder={"i.e A+"}
          containerClassName={styles["Input-margin"]}
          value={inputs.grade}
          onChange={handleChange}
          name={"grade"}
        />
        <Input
          label={"Start date"}
          type="date"
          containerClassName={styles["Input-margin"]}
          value={inputs.fromDate}
          onChange={handleChange}
          name={"fromDate"}
        />
        <div className={styles["checkOption"]}>
          <input
            type="checkbox"
            id="current"
            onChange={handleChange}
            name={"current"}
          />
          <label htmlFor="current">Current</label>
        </div>
        <Input
          label={"End date"}
          type="date"
          value={inputs.toDate}
          onChange={handleChange}
          name={"toDate"}
        />
      </div>
    </OffCanvas>
  );
};

export default EducationDrawer;
