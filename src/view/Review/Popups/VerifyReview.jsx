"use client";
import { useState } from "react";
import styles from "../../../style/pageStyle/reviewStyle/reviewCards.module.scss";
import { FiUpload } from "react-icons/fi";
import { UnverifiedIcon, VerifiedIcon } from "../../../icon";

const VerificationModal = ({ isOpen, onClose, onContinue }) => {
    const [verification_doc, setVerificationDoc] = useState(null);

    const handleFileChange = (e) => {
        setVerificationDoc(e.target.files[0]);
    };

    const handleContinue = async () => {
        if (verification_doc) {
            await onContinue(verification_doc);
            onClose();
        } else {
            alert("Please upload a verification document.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                <h2>Verification</h2>
                <div className={styles.svgs}>
                    <UnverifiedIcon />
                    <VerifiedIcon />
                </div>
                <p>
                    Please upload a verification document to proceed. The document could
                    be in PDF, Word, or an image format.
                </p>

                <label className={styles.fileUploadLabel}>
                    Upload
                    <div className={styles.uploadField}>
                        <FiUpload className={styles.uploadIcon} />
                        <input
                            type="text"
                            className={styles.inputField}
                            value={verification_doc ? verification_doc.name : ''}
                            placeholder="Upload Document"
                            readOnly
                        />
                        <button type="button" className={styles.browseButton}>
                            Browse
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx,.jpeg,.png"
                                onChange={handleFileChange}
                                className={styles.fileInput}
                            />
                        </button>
                    </div>
                </label>
                <button className={styles.continueButton} onClick={handleContinue}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default VerificationModal;
