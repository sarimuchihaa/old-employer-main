"use client";
import React, { useEffect, useState } from "react";
import styles from "../../style/pageStyle/employerProfile/profile.module.scss";
import { verifyEmail } from "../../services/company";

const EmailView = ({ props }) => {
    const [message, setMessage] = useState("Verifying your email...");
    const [isVerified, setIsVerified] = useState(false);
    useEffect(() => {
        const verifyEmails = async () => {
            try {
                const response = await verifyEmail();
                if (response.ok) {
                    const data = await response.data;
                    setMessage(data.message);
                    setIsVerified(true);
                } else {
                    const errorData = await response.data;
                    setMessage(errorData.message || "Failed to verify email.");
                }
            } catch (error) {
                setMessage("An error occurred");
            }
        };
        verifyEmails();
    }, []);

    return (
        <div className={styles.profile}>
            <div className={styles['content-container']}>
                <div className={styles['verify-column']}>
                    <strong><h1>Email Verification</h1>
                        <p>{message}</p>
                        {isVerified && <p>Your email has been verified successfully!</p>}</strong>
                </div>
            </div>
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

export default EmailView;
