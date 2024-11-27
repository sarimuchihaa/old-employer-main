import React from "react";

const SkillDetails = ({ idx }) => {
  return (
    <div
      className={`flex flex-col gap-[5px] py-4 ${idx === 1 ? "border-b-0" : "border-b"
        }`}
      key={idx}
    >
      <p className="text-sm text-[#252525] font-bold">Google cloud storage</p>
      <p className="text-xs text-[#585858] font-medium">
        Principal Software Engineer at SOFT PYRAMID
      </p>
    </div>
  );
};

export default SkillDetails;
