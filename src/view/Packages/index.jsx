"use client"; // Add this line at the top

import React from "react";
import styles from "../../style/pageStyle/registerStyle/Form.module.scss";
import Card from "./Card"; // Import Card component
import PlanCard from "../Review/ReviewDetails/PlanCard"; // Import PlanCard component
import FAQAccordion from "./FAQAccordion"; // Import FAQAccordion component
import { PlusPlanIcon, ProPlanIcon, EnterprisePlanIcon } from "../../icon"; // Import icons

const PackageView = () => {
  return (
    <div className={styles["Main-Register"]}>
      <div className="payment-plan-section">
        <div className="card-container">
          <Card
            icon={<PlusPlanIcon />}
            name="Plus"
            price="$15/"
            discount="15% Discount"
            period="month"
            description="For growing Business"
            features={[
              "Access more than 1000 Employees",
              "1 Moderator allowed",
              "Allow comments",
              "Save searches",
              "10 persons allowed as shortlist",
            ]}
          />
          <Card
            icon={<ProPlanIcon />}
            name="Pro"
            price="$30/"
            discount="15% Discount"
            period="month"
            description="For Scaling Business"
            features={[
              "Access more than 3000 Employees",
              "2 Moderators allowed",
              "Allow comments",
              "Save searches",
              "30 persons allowed as shortlist",
            ]}
          />
          <Card
            icon={<EnterprisePlanIcon />}
            name="Enterprise"
            price="$45/"
            discount="15% Discount"
            period="month"
            description="For large scale organization"
            features={[
              "Access Unlimited Employees",
              "10 Moderators allowed",
              "Allow comments",
              "Save searches",
              "Unlimited persons allowed as shortlist",
            ]}
          />
        </div>
      </div>
      <div className="faq-section">
        <FAQAccordion />
      </div>
    </div>
  );
};

export default PackageView;