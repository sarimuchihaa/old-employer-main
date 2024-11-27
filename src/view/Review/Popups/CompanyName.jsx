"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../style/pageStyle/reviewStyle/reviewCards.module.scss";
import { createCompany, fetchCompanySuggestions } from "../../../services/company"; // Import the new API function

const CompanyNameModal = ({ isOpen, onClose, onContinue }) => {
    const [name, setCompanyName] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!name || name.trim() === "") {
                setSuggestions([]);
                return;
            }
            try {
                const results = await fetchCompanySuggestions(name);
                // Ensure that the selected name is not included in the suggestions
                setSuggestions(results.filter((suggestion) => suggestion !== name));
                console.log("Suggestions set:", results);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        };
        fetchSuggestions();
    }, [name]);

    const handleSuggestionClick = (suggestion) => {
        setCompanyName(suggestion);
        // Clear suggestions after selecting
        setSuggestions([]); // Clear suggestions to prevent showing the selected one
        console.log("Selected suggestion:", suggestion);
    };

    const handleContinue = async () => {
        if (name.trim()) {
            setError("");
            setIsLoading(true);
            try {
                const response = await createCompany(name);
                if (response.existed) {
                    const companyData = encodeURIComponent(JSON.stringify(response.companyData));
                    router.push(`/company?id=${response.id}&data=${companyData}`);
                } else {
                    router.push(`/company?id=${response.id}&companyName=${encodeURIComponent(name)}`);
                }
                onContinue(name, response.id);
                onClose();
            } catch (error) {
                console.error("Error creating company:", error);
                setError(error.response && error.response.status === 500 ?
                    "Internal server error. Please try again later." :
                    "Error finding or creating company. Please check your input or try again later."
                );
            } finally {
                setIsLoading(false);
            }
        } else {
            setError("Please enter a company name.");
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
                <h2>Enter Company Name</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    incididunt ut labore et dolore magna aliqua.
                </p>
                <div className={`${styles['input-group']}`}>
                    <input
                        type="text"
                        placeholder="Company Name"
                        value={name}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className={styles.input}
                        required
                        aria-label="Company name input"
                    />
                    {suggestions.length > 0 && (
                        <ul className={styles.suggestionsList}>
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className={styles.suggestionItem}
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button
                    className={styles.continueButton}
                    onClick={handleContinue}
                    disabled={isLoading}
                    aria-label="Continue to next step"
                >
                    {isLoading ? "Loading..." : "Continue"}
                </button>
            </div>
        </div>
    );
};

export default CompanyNameModal;

