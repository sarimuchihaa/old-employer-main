"use client";
import { useState } from "react";
// import { useRouter } from "next/navigation";
import styles from "../../style/pageStyle/searchStyle/verifiyCompany.module.scss";
import { verifyCompany } from "../../services/company";
import Input from "../../dump/Input";
import { FiUpload } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CompanyVerifyModal = ({ isOpen, onClose, onContinue }) => {
    const [inputs, setInputs] = useState({
        claim_by: "",
        company_email: "",
        phone: "",
        designation: "",
        verification_doc: {}
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // const router = useRouter();
    const searchParams = useSearchParams(); // Initialize searchParams
    const companyId = searchParams.get("companyId");


    const handleContinue = async () => {
        const { company_email, claim_by, designation, phone } = inputs;
        const verificationDoc = {
            originalname: inputs.verification_doc.name,
            mimetype: inputs.verification_doc.type,
            size: inputs.verification_doc.size,
        };

        if (!companyId) return;

        try {
            const response = await verifyCompany(companyId, company_email, verificationDoc, claim_by, designation, phone);
            console.log("response", response);
            toast.success(response.message);
            onClose();
        } catch (error) {
            console.error("Error verifying company:", error);
            setError(
                error.response && error.response.status === 500
                    ? "Internal server error. Please try again later."
                    : "Error finding or creating company. Please check your input or try again later."
            );
        } finally {
            setIsLoading(false);
        }
    };


    const handleInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setInputs({ ...inputs, verification_doc: file });
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    &times;
                </button>
                <h2>Claim Company</h2>
                <p className={styles.headerContent}>
                    To claim the company “Andropple Lab,” please provide the
                    information below and upload a verified ownership document
                    (e.g., NTN, registered document, etc.).
                </p>
                <div className={`${styles['input-group']}`}>
                    <Input
                        label={"Full Name"}
                        placeholder={"John"}
                        containerClassName={`${styles['input-width']}`}
                        value={inputs.claim_by}
                        onChange={handleInputChange}
                        name={"claim_by"}
                    />
                    {/* {error && <span className={styles.error}>{error}</span>} */}

                    <Input
                        type="email"
                        label={"Official Email Address"}
                        placeholder={"Email address"}
                        containerClassName={`${styles['input-width']}`}
                        value={inputs.company_email}
                        onChange={handleInputChange}
                        name={"company_email"}
                        required
                    />
                    {/* {error && <span className={styles.error}>{error}</span>} */}
                    <Input
                        label={"Phone Number"}
                        placeholder={"+01 123 456 7890"}
                        containerClassName={`${styles['input-width']}`}
                        value={inputs.phone}
                        onChange={handleInputChange}
                        name={"phone"}
                    />
                    {/* {error && <span className={styles.error}>{error}</span>} */}
                    <Input
                        label={"Designation"}
                        placeholder={"CEO"}
                        containerClassName={`${styles['input-width']}`}
                        value={inputs.designation}
                        onChange={handleInputChange}
                        name={"designation"}
                    />
                    {/* {error && <span className={styles.error}>{error}</span>} */}
                </div>

                <label className={styles.fileUploadLabel}>
                    Verification Document
                    <div className={styles.uploadField}>
                        <FiUpload className={styles.uploadIcon} />
                        <input
                            type="text"
                            className={styles.inputField}
                            value={inputs.verification_doc ? inputs.verification_doc.name : ""}
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
                    {/* {error && <span className={styles.error}>{error}</span>} */}
                </label>

                <button
                    type="button" // Change this to prevent default form submission
                    className={styles.continueButton}
                    onClick={handleContinue}
                    disabled={isLoading}
                    aria-label="Continue to next step"
                >
                    {isLoading ? "Loading..." : "Submit"}
                </button>

            </div>
        </div>
    );
};

export default CompanyVerifyModal;
