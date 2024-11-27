"use client";
import Button from "../../dump/Button";
import Dropdown from "../../dump/Dropdown";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { getUserData } from "../../services/user";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
// styles file
import styles from "../../style/componentStyle/topbar.module.scss";
import navstyles from "../../style/componentStyle/navbar.module.scss"
import CompanyNameModal from "../../view/Review/Popups/CompanyName";
import useLocation from "./Location";
import { AvatarIcon, NotificationIcon } from "../../icon";

const Navbar = () => {
    const [avatar, setAvatar] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [role, setRole] = useState("");
    const menuOptions = [{ label: "Profile", value: "profile" }, { label: "Settings", value: "settings" }, { label: "Logout", value: "logout" }];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    const { city, country } = useLocation();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    setIsLoggedIn(true);
                    const userData = await getUserData();

                    // Check if userData exists and handle Profile data carefully
                    if (userData) {
                        setFirstName(userData.firstname);
                        setLastName(userData.lastname);
                        setRole(userData.role);

                        // Check if the Profile data exists before accessing avatar
                        if (userData.Profile) {
                            const avatarData = JSON.parse(userData.Profile.avatar);
                            const avatarURL = `/assets/images/${avatarData.originalname}`;
                            setAvatar(avatarURL);
                            console.log(avatarURL);
                        } else {
                            setAvatar(null); // or a default avatar if desired
                        }
                    } else {
                        console.error("Profile data not available");
                    }
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                toast.error("Failed to load user data");
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserProfile();
    }, []);


    const handleMenuSelect = (value) => {
        if (value === "profile") {
            router.push("/profile");
        } else if (value === "settings") {
            router.push("/settings");
        } else if (value === "logout") {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            router.push("/login");
        }
    };
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleContinue = (companyName) => {
        console.log("Company Name:", companyName);
    };

    const links = [
        { label: "Home", link: "/search" },
        role === "employer" ? { label: "Employes", link: "/employees" } : { label: "Companies", link: "/companies" },
        { label: "Hall of fame", link: "/hallOfFameShame" },
        { label: "Blogs", link: "/blogs" },
    ];
    return (
        <>
            <div className={navstyles.navbar}>
                <div style={{ position: 'relative' }}>
                    {city && country && (
                        <div className={navstyles.location}>
                            {country}
                        </div>
                    )}
                    <Image
                        src={"/assets/images/logo.png"}
                        className={navstyles["navbar-image"]}
                        width={200}
                        height={100}
                    />

                </div>
                {isLoggedIn ? (
                    <div className={navstyles["navbar-links"]}>
                        {links.map((item, idx) => (
                            <Link href={item.link} key={idx}>
                                {item.label}
                            </Link>
                        ))}
                        <Button
                            onClick={handleOpenModal}
                            text={"Add Review"}
                            varient="primary"
                            classes={navstyles["navbar-button"]}
                        />
                        <CompanyNameModal
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            onContinue={handleContinue}
                        />
                        <NotificationIcon />
                        <div className={styles["profile-section"]}>
                            {avatar ? (
                                <Image
                                    src={avatar}
                                    alt="profile-pic"
                                    width={30}
                                    height={30}
                                    className={styles["profile-image"]}
                                />
                            ) : (
                                <AvatarIcon width={30} height={20} />
                            )}

                            <Dropdown
                                label={`${firstname} ${lastname}`}
                                items={menuOptions}
                                labelClasses={styles["dropdown-label"]}
                                onSelect={handleMenuSelect} // Handle menu selection
                            />
                        </div>
                    </div>
                ) : (
                    // Show only Signin button if not logged in
                    <Button text={"Signin"} onClick={() => router.push("/login")} classes={navstyles["navbar-button"]} />
                )}
            </div>

        </>
    );
};

export default Navbar;
