"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../../style/pageStyle/searchStyle/employerSearch.module.scss";
import Input from "../../dump/SearchInput";
import Button from "../../dump/Button";
import Dropdown from "../../dump/Dropdown";
import { searchUsers } from '../../services/user';
import skillsStyles from "../../style/pageStyle/profileStyle/skillCard.module.scss";
import { AvatarIcon, GridIcon, ListIcon, LocationIcon, SearchIcon } from "../../icon";
import Pagination from "../../dump/Pagination";
const EmployeeSearch = () => {
    const router = useRouter();
    const industries = ['IT', 'Finance', 'Healthcare', 'Education', 'Retail'];
    const skills = ['PHP', 'Laravel', 'Dot Net', 'Python', 'JS', 'Web Development', 'Mobile Development'];
    const searchParams = useSearchParams(); // Get query params from the URL
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [citySearchText, setCitySearchText] = useState("");
    const [filteredCities, setFilteredCities] = useState([]);
    const [users, setUsers] = useState([]);
    const [inputs, setInputs] = useState({
        searchText: "",
        country: "",
        city: "",
        industry: "",
        skills: "",
    });

    const [viewType, setViewType] = useState("grid"); // State to toggle between grid and list views
    const totalPages = 4;

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleViewTypeChange = (type) => {
        setViewType(type);
    };

    const handleUserClick = (userId) => {
        router.push(`/profile?id=${userId}`);
    };

    console.log("Current Inputs:", inputs);

    useEffect(() => {
        // Load cities and countries data
        const loadData = async () => {
            const cityList = await import("../../constants/cities.json");
            const countryList = await import("../../constants/countries.json");
            setCities(cityList.default);
            setCountries(countryList.default);
        };

        loadData();
    }, []);

    useEffect(() => {
        if (inputs.country) {
            const filtered = cities.filter((city) => city.country_name === inputs.country);
            setFilteredCities(filtered);
        } else {
            setFilteredCities([]);
        }
    }, [inputs.country, cities]);

    useEffect(() => {
        const searchText = searchParams.get('searchText') || "";
        const countryNames = searchParams.get('country') ? searchParams.get('country').split(', ') : [];
        const cityName = searchParams.get('city') || "";

        setInputs({
            searchText,
            country: countryNames[0] || "",
            city: cityName || "",
            industry: "",
            skills: "",
        });

        if (cityName) {
            setCitySearchText(cityName);
        }
    }, [searchParams]);

    const handleInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleCountrySelect = (country) => {
        console.log("Selected country:", country.name);
        setInputs((prevInputs) => ({
            ...prevInputs,
            country: country.name,
            city: "",
        }));
        setCitySearchText("");
    };

    const handleCitySelect = (city) => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            city: city.name,
        }));
        setCitySearchText(city.name);
    };

    const handleIndustrySelect = (industry) => {
        setInputs((prevInputs) => {
            const selectedIndustries = prevInputs.industry.includes(industry)
                ? prevInputs.industry.filter((i) => i !== industry) // Deselect
                : [...prevInputs.industry, industry]; // Select

            return { ...prevInputs, industry: selectedIndustries };
        });
    };

    const handleSkillsSelect = (skill) => {
        setInputs((prevInputs) => {
            const selectedSkills = prevInputs.skills.includes(skill)
                ? prevInputs.skills.filter((s) => s !== skill) // Deselect the skill
                : [...prevInputs.skills, skill]; // Add the selected skill

            return { ...prevInputs, skills: selectedSkills };
        });
    };

    const handleRemoveCountry = (countryToRemove) => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            country: "",
            city: "",
        }));
        setCitySearchText("");
    };

    const handleRemoveIndustry = (industryToRemove) => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            industry: prevInputs.industry.filter(industry => industry !== industryToRemove),
        }));
    };

    const handleRemoveSkills = (skillsToRemove) => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            skills: prevInputs.skills.filter(skills => skills !== skillsToRemove),
        }));
    };


    useEffect(() => {
        handleSearch();
    }, [inputs]);

    const handleSearch = async () => {
        const { searchText, country, city, industry, skills } = inputs;

        const params = {
            country: country || '',
            city: city || '',
            skills: skills || '',
            industry: industry || '',
            searchText: searchText,
        };

        if (!params.country && !params.city && !params.industry && !params.skills && !params.searchText === 0) {
            setUsers([]);
            return;
        }

        try {
            const userData = await searchUsers(params);
            console.log(userData);
            setUsers(userData);
        } catch (error) {
            console.error('Error during search:', error);
        }
    };


    return (
        <div className={styles.search}>
            <div className={styles["content-container"]}>
                <div className={`${styles["form-container"]}`}>
                    <div className={`${styles["form-content"]}`}>
                        <div className={`${styles["input-group"]}`}>
                            <SearchIcon />
                            <Input
                                placeholder={"Search Company/Employer or Keyword"}
                                containerClassName={`${styles["input-width"]}`}
                                value={inputs.searchText}
                                onChange={handleInputChange}
                                name={"searchText"}
                            />
                            <div className={styles.divider}></div>
                            <LocationIcon />
                            <div className={`${styles["dropdown-container"]}`}>
                                <Dropdown
                                    items={filteredCities
                                        .filter((city) =>
                                            city.name.toLowerCase().includes(citySearchText.toLowerCase())
                                        )
                                        .map((city) => ({
                                            label: (
                                                <div className={`${styles["dropdown-item"]}`}>
                                                    <span>{city.name}</span>
                                                </div>
                                            ),
                                            value: city,
                                        }))
                                    }
                                    label={
                                        <input
                                            type="text"
                                            value={citySearchText}
                                            onChange={(e) => setCitySearchText(e.target.value)}
                                            placeholder="Choose Location"
                                            className={styles["dropdown-input"]}
                                            autoFocus
                                        />
                                    }
                                    onSelect={(value) => handleCitySelect(value)}
                                />
                            </div>
                        </div>
                    </div>
                    <Button
                        text={"Search"}
                        classes={styles["btn-join"]}
                        onClick={handleSearch}
                    />
                </div>
                <div className={styles["columns-container"]}>
                    <div className={styles["left-column"]}>
                        <div className={styles["filter-group"]}>
                            <h3>Clear all Filters</h3>
                            <label>
                                {inputs?.country && (
                                    <span className={styles["filter-pill"]}>
                                        {inputs.country}
                                        <span className={styles["remove-filter"]} onClick={() => handleRemoveCountry(inputs.country)}>✕</span>
                                    </span>
                                )}

                                {inputs?.industry?.length > 0 && inputs.industry.map((industry, index) => (
                                    <span key={index} className={styles["filter-pill"]}>
                                        {industry}
                                        <span className={styles["remove-filter"]} onClick={() => handleRemoveIndustry(industry)}>✕</span>
                                    </span>
                                ))}
                                {inputs?.skills?.length > 0 && inputs.skills.map((skills, index) => (
                                    <span key={index} className={styles["filter-pill"]}>
                                        {skills}
                                        <span className={styles["remove-filter"]} onClick={() => handleRemoveSkills(skills)}>✕</span>
                                    </span>
                                ))}
                            </label>
                            <hr></hr>
                            <div >
                                <label>Country</label>
                                <div className={styles["scrollable-container"]}>
                                    {countries.map((country) => (
                                        <div key={country.iso2}>
                                            <input
                                                type="checkbox"
                                                value={country.name}
                                                checked={inputs.country === country.name}
                                                onChange={() => handleCountrySelect(country)}
                                            />
                                            <label>{country.name}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <hr></hr>
                            <h3>Industry</h3>
                            <div className={styles["scrollable-container"]}>
                                {industries.map((industry) => (
                                    <div key={industry}>
                                        <input
                                            type="checkbox"
                                            value={industry}
                                            checked={inputs.industry.includes(industry)}
                                            onChange={() => handleIndustrySelect(industry)}
                                        />
                                        <label>{industry}</label>
                                    </div>
                                ))}

                            </div>

                            <hr></hr>
                            <h3>Skills</h3>
                            <div className={styles["scrollable-container"]}>
                                {skills.map((skill) => (
                                    <div key={skill}>
                                        <input
                                            type="checkbox"
                                            value={skill}
                                            checked={inputs.skills.includes(skill)}
                                            onChange={() => handleSkillsSelect(skill)}
                                        />
                                        <label>{skill}</label>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                    <div className={styles["right-column"]}>
                        <div className={styles["filtered-companies"]}>
                            <div className={styles["list-icons"]}>
                                <h3>Showing: {users.length} Filtered Users</h3>
                                <div className={styles["icons"]}>
                                    <div className={`${styles["icon"]} ${viewType === "grid" ? styles["active"] : ""}`}
                                        onClick={() => handleViewTypeChange("grid")}
                                    ><GridIcon /></div>
                                    <div className={`${styles["icon"]} ${viewType === "list" ? styles["active"] : ""}`}
                                        onClick={() => handleViewTypeChange("list")}><ListIcon /></div>
                                </div>
                            </div>
                            <div className={styles["companies-cards"]}>
                                {users.length > 0 ? (
                                    users.map((user) => {
                                        const { firstname, lastname, avatar, skills, Experience, designation } = user;
                                        const skillArray = skills ? skills.split(",") : [];
                                        const avatarUrl = avatar ? avatar : <AvatarIcon />;
                                        const experienceList = Experience?.length > 0
                                            ? Experience.map((exp, idx) => <p key={idx}>{exp.designation}</p>)
                                            : <p>No experience listed</p>;

                                        return viewType === "grid" ? (
                                            <>
                                                <div key={user.id} className={styles["profile-card"]} onClick={() => handleUserClick(user.id)}>
                                                    <img
                                                        src={`/assets/images/${avatarUrl}`}
                                                        alt="Avatar"
                                                        className={styles["profile-image"]}
                                                    />
                                                    <h3>{firstname} {lastname}</h3>
                                                    <div className={styles["profile-content"]}>
                                                        <p className={styles["subtitle"]}>{designation}</p>
                                                        <div className={styles["separator"]}></div>
                                                        <p className={styles["subtitle"]}>{user.country}, {user.city}</p>
                                                    </div>
                                                    <div className={styles["tags"]}>
                                                        {skillArray.length > 0 ? (
                                                            skillArray.map((skill, idx) => (
                                                                <p key={idx} className={styles["tag"]}>
                                                                    {skill}
                                                                </p>
                                                            ))
                                                        ) : (
                                                            <p>No skills listed</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className={styles["ad-card"]} style={{ backgroundColor: '#1C9596', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <p style={{ textAlign: 'center' }}>Add here</p>
                                                </div>
                                            </>
                                            // Grid View Profile Card

                                        ) : (
                                            <>
                                                <div key={user.id} className={styles["vertical-profile-card"]} onClick={() => handleUserClick(user.id)}>
                                                    <img
                                                        src={`/assets/images/${avatarUrl}`}
                                                        alt="Avatar"
                                                        className={styles["profile-image"]}
                                                    />
                                                    <div className={styles["profile-details"]}>
                                                        <div className={styles["name-location"]}>
                                                            <h3>{firstname} {lastname}</h3>
                                                            <p>{user.country}, {user.city}</p>
                                                        </div>
                                                        <p className={styles["role"]}>{designation}</p>
                                                        <div className={styles["tags"]}>
                                                            {skillArray.length > 0 ? (
                                                                skillArray.map((skill, idx) => (
                                                                    <p key={idx} className={styles["tag"]}>
                                                                        {skill}
                                                                    </p>
                                                                ))
                                                            ) : (
                                                                <p>No skills listed</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className={styles["view-profile"]}>
                                                        <span>View Profile</span>
                                                    </div>
                                                </div>
                                                <div className={styles["ad-card"]} style={{ backgroundColor: '#1C9596', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <p style={{ textAlign: 'center' }}>Add here</p>
                                                </div>
                                            </>
                                            // List View Vertical Profile Card

                                        );

                                    })

                                ) : (
                                    <p>No User found based on the search criteria.</p>
                                )}

                                <Pagination />
                                <div className={styles["vertical-ad-card"]}>
                                    <p>Add here...</p>
                                </div>
                            </div >

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeSearch;
