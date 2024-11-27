"use client";
import React from "react";
import RankCard from "./RankCard"; // Import RankCard
import LatestVisitor from "./LatestVisitor"; // Correct import path
import Activity from "./Activity"; // Correct import path
import SrdCard from "./SrdCard";
// style file 
import "../../style/pageStyle/dashboard/dashboard.scss";

const DashboardView = ({ props }) => {
  return (
    <div className="mainContainer">
      <div className="uppersection">
        <RankCard rankNumber="2814" rankChange="⬆ 6% last month" />
        <RankCard rankNumber="2814" rankChange="⬆ 6% last month" />
        <RankCard rankNumber="2814" rankChange="⬆ 6% last month" />

      </div>
      <div className="newSection">
        <div className="leftSection">
          <LatestVisitor />
        </div>
        <div className="rightSection">
          <Activity />
        </div>
      </div>
      <SrdCard />
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

export default DashboardView;
