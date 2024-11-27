"use client";
import React from "react";
import styles from "../../../style/pageStyle/reviewStyle/ReviewDetails/commonCard.module.scss";
import RattingCard from "./RattingCard";

const PublicReviewCard = ({ title, Icon, publicReview, verified, compensation, work_balance, cutlers, career_opportunities }) => {

    return (
        <div className={styles["status-card"]}>
            <div>{verified}</div>
            <div className={styles["header"]}>
                {Icon && (
                    <div>
                        <Icon />
                    </div>
                )}
                <div className={styles["sub-header"]}>
                    <p className={styles["title"]}>{title}</p>
                </div>
            </div>
            <div className={styles.description}>
                <p>{publicReview}</p>
                {/* <textarea
                    className={styles.textarea}
                    placeholder={"Write here..."}
                    value={public_review}
                    onChange={handleStatusChange}
                    rows={5}
                /> */}
                <RattingCard
                    compensation={compensation}
                    work_balance={work_balance}
                    career_opportunities={career_opportunities}
                    cutlers={cutlers} />
            </div>
        </div>
    );
};

export default PublicReviewCard;
