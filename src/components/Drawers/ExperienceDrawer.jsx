import React from "react";
import OffCanvas from "../../dump/OffCanvas";
import Input from "../../dump/Input";
import { jobTypes } from "../../constants";

const ExperienceDrawer = ({
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
          label={"Job title"}
          placeholder={"Job title"}
          containerClassName={"mb-3"}
          value={inputs.jobTitle}
          onChange={handleChange}
          name={"jobTitle"}
        />
        <Input
          label={"Company name"}
          placeholder={"Company name"}
          containerClassName={"mb-3"}
          value={inputs.company}
          onChange={handleChange}
          name={"company"}
        />
        <div className="flex flex-col mb-4">
          <label
            htmlFor="type"
            className="mb-2.5 text-sm text-[#585858] font-medium"
          >
            Job Type
          </label>
          <select
            id="type"
            className="rounded-lg border px-3 py-4 focus:outline-none"
            value={inputs.jobType}
            onChange={handleChange}
            name={"jobType"}
          >
            <option>Select Job Type</option>
            {jobTypes.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <Input
          label={"Start date"}
          type="date"
          containerClassName={"mb-3"}
          value={inputs.fromDate}
          onChange={handleChange}
          name={"fromDate"}
        />
        <div className="flex gap-3 items-center mb-3 text-sm px-3 text-[#585858] font-medium">
          <input
            type="checkbox"
            id="current"
            onChange={handleChange}
            name={"current"}
          />
          <label htmlFor="current">Currently Working here</label>
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

export default ExperienceDrawer;
