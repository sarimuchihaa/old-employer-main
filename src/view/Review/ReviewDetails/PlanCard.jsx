import React from 'react';
import styles from '../../../style/pageStyle/reviewStyle/ReviewDetails/PlanCard.module.scss';

const PlanCard = ({ profilePic }) => {
    return (
        <div className={styles['plan-card']}>
            <div className={styles['plan-content']}>
                <img
                    src={profilePic}
                    alt="Profile"
                    className={styles['logo']}
                />
                <div className={styles['plan-details']}>
                    <h3>Premium Individual</h3>
                    <p>$12/month</p>
                </div>
            </div>
            <div className={styles['plan-update']}>
                <button className={styles['update-btn']}>Update Plan</button>
            </div>
        </div>
    );
};

export default PlanCard;