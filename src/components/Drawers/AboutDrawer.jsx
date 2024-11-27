import React from "react";
import OffCanvas from "../../dump/OffCanvas";

const AboutDrawer = ({
  title,
  buttonText,
  toggleMenu,
  isOpen,
  value,
  onChange,
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
      <p>
        You can write about your years of experience, industry, or skills.
        People also talk about their achievements or previous job experiences.
      </p>
      <div className="mt-4">
        <label className="text-black text-sm font-bold">About</label>
        <textarea
          className="w-full mt-1 p-2 border rounded resize-none focus:outline-none"
          rows="5"
          placeholder="About content..."
          value={value}
          onChange={onChange}
        ></textarea>
      </div>
    </OffCanvas>
  );
};

export default AboutDrawer;
