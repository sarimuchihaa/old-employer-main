"use client";
import { useState, useEffect } from "react";
import styles from "../../style/pageStyle/reviewStyle/reviewCards.module.scss";
import Input from "../../dump/Input";
import { addToShortlist, removeFromShortlist, removeCandidatesByCategory, getCategories } from '../../services/shortlist';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

const CategoryModal = ({ isOpen, onClose, onContinue, userId }) => {
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isShortlisted, setIsShortlisted] = useState({});
    const router = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await getCategories();
                console.log("Data shortlisted:", categoriesData);

                // Get unique categories
                const uniqueCategories = Array.from(new Set(categoriesData.map(cat => cat.category)));
                setCategories(uniqueCategories.map(cat => ({ category: cat })));

                // Map each category to its shortlisted status
                const shortlistedStatus = uniqueCategories.reduce((acc, cat) => {
                    const isShortlisted = categoriesData.some(item => {
                        const matchesCategory = item.category === cat;
                        const matchesUserId = String(item.candidateId) === String(userId);

                        // Log to see what's happening in each iteration
                        console.log(`Category: ${cat}, CandidateId: ${item.candidateId}, UserId: ${userId}, Matches: ${matchesCategory && matchesUserId}`);

                        return matchesCategory && matchesUserId;
                    });

                    acc[cat] = isShortlisted;
                    return acc;
                }, {});

                setIsShortlisted(shortlistedStatus);
                console.log("Unique categories:", uniqueCategories);
                console.log("Shortlisted status:", shortlistedStatus);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, [userId, category]);



    const handleAddToShortlist = async () => {
        try {
            const categoryToUse = selectedCategory || category;

            if (!categoryToUse) {
                toast.error("Please select or enter a category.");
                return;
            }

            const response = await addToShortlist(userId, categoryToUse);
            console.log("Response from addToShortlist:", response);

            if (response.message) {
                toast.success(response.message);
                onClose();
                onContinue();
                router.push(`/candidateProfile?id=${userId}&category=${category}`);
            } else {
                toast.error("Failed to add to shortlist.");
            }
        } catch (error) {
            console.error("Error adding to shortlist:", error);
            toast.error(error.message || "Error adding to shortlist");
        }
    };

    const removeFromShortlistSingle = async (userId, category) => {
        try {
            const encodedCategory = encodeURIComponent(category);  // Encode category here
            const response = await removeFromShortlist(userId, encodedCategory);

            // Check if response is an object and contains the message
            if (response && response.message) {
                toast.success(response.message);
                setSelectedCategory(""); // Reset selected category
                // Filter out the deleted category from the list
                setCategories(categories.filter(cat => cat.category !== category));
            } else {
                toast.error("Failed to remove from shortlist.");
            }
        } catch (error) {
            console.error("Error removing from shortlist:", error);
            toast.error(error.message || "Error removing from shortlist.");
        }
    };


    const handleRemoveCategory = async (categoryToRemove) => {
        try {
            const response = await removeCandidatesByCategory(categoryToRemove);

            if (response.message) {
                toast.success(response.message);
                setSelectedCategory("");
                setCategories(categories.filter(cat => cat.category !== categoryToRemove)); // Update categories list
            } else {
                toast.error("Failed to remove candidates.");
            }
        } catch (error) {
            console.error("Error removing category:", error);
            toast.error(error.message || "Error removing category");
        }
    };


    return (
        isOpen && (
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <button className={styles.closeButton} onClick={onClose}>
                        &times;
                    </button>
                    <h2><b>Shortlist Candidate</b></h2>

                    <div className={styles["input-group"]}>
                        <label className={styles.Label}>
                            Add new
                            <input
                                type="text"
                                placeholder="Shortlist Category"
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                    setSelectedCategory(null);
                                }}
                                className={styles.input}
                                required
                                aria-label="Category input"
                            />
                        </label>
                    </div>

                    <div className={styles.categoryList}>
                        <div className={styles.list}>
                            {categories.map((cat) => (
                                <button
                                    key={cat.category}
                                    className={`${styles.categoryItem} ${selectedCategory === cat.category ? styles.selected : ""}`}
                                    onClick={() => {
                                        setSelectedCategory(cat.category);
                                        setCategory("");
                                    }}
                                >
                                    <div className={styles.categoryInfo}>
                                        <span>{cat.category}</span>
                                        {isShortlisted[cat.category] && (
                                            <div
                                                className={styles.shortlistedText}
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevents the button click from firing
                                                    removeFromShortlistSingle(userId, cat.category); // Pass userId and category
                                                }}
                                            >
                                                Remove from this shortlist.
                                            </div>
                                        )}
                                    </div>

                                    <span
                                        className={styles.removeIcon}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveCategory(cat.category);
                                        }}
                                    >
                                        &times;
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>


                    <button className={styles.continueButton} onClick={handleAddToShortlist}>
                        Submit
                    </button>
                </div>
            </div>
        )
    );
};

export default CategoryModal;
