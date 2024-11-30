"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../../style/pageStyle/searchStyle/employerSearch.module.scss";
import Input from "../../dump/SearchInput";
import Button from "../../dump/Button";
import Dropdown from "../../dump/Dropdown";
import { searchCompany } from '../../services/company';
import { getCompanyData } from "../../services/company";
import { DislikeIcon, GridIcon, LikeIcon, ListIcon, LocationIcon, SearchIcon } from "../../icon";
import Pagination from "../../dump/Pagination";


const EmployeeSearches = () => {
    const router = useRouter();
    const industries = ['IT', 'Finance', 'Healthcare', 'Education', 'Retail'];
    const sizes = ['1-10', '11-50', '51-100', '101-200', '200-500', '500-1000', '1000+'];
    const ratings = [1, 2, 3, 4, 5];
    const searchParams = useSearchParams();
    const [error, setError] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [citySearchText, setCitySearchText] = useState("");
    const [filteredCities, setFilteredCities] = useState([]);
    const [inputs, setInputs] = useState({
        searchText: "",
        country: "",
        city: "",
        industry: "",
        size: "",
        overallRating: 0,
    });

    const [viewType, setViewType] = useState("grid"); // Toggle b/w grid and list views.
    const totalPages = 4;

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleViewTypeChange = (type) => {
        setViewType(type);
    };

    const handleCompanyClick = (companyId) => {
        router.push(`/employerProfile?companyId=${companyId}`);
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
            size: "",
            overallRating: 0,
        });

        if (cityName) {
            setCitySearchText(cityName);
        }
    }, [searchParams]);

    const getCompanyData = async () => {
        const response = await fetch("http://localhost:8000/company/all-companies");
        console.log("getCompanyData Response:", response);
        return response;
    };



    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await getCompanyData();
                console.log("Fetched Response:", response);

                if (!response || !response.ok) {
                    throw new Error(`HTTP error! Status: ${response?.status || "No response"}`);
                }

                const data = await response.json();
                setCompanies(data);
                console.log("Response Data:", data);
            } catch (err) {
                console.error("Error fetching companies:", err.message);
                setError(err.message);
            }
        };

        fetchCompanies();
    }, []);
    console.log("Companies data:", companies);

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
                ? prevInputs.industry.filter((i) => i !== industry)
                : [...prevInputs.industry, industry];

            return { ...prevInputs, industry: selectedIndustries };
        });
    };

    const handleSizeSelect = (size) => {
        setInputs((prevInputs) => {
            const selectedSizes = prevInputs.size.includes(size)
                ? prevInputs.size.filter((s) => s !== size)
                : [...prevInputs.size, size];

            return { ...prevInputs, size: selectedSizes };
        });
    };

    const handleOverallRatingChange = (value) => {
        setInputs((prev) => ({
            ...prev,
            overallRating: value,
        }));
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

    const handleRemoveSize = (sizeToRemove) => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            size: prevInputs.size.filter(size => size !== sizeToRemove),
        }));
    };

    const handleRemoveRating = () => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            overallRating: 0,
        }));
    };

    useEffect(() => {
        handleSearch();
    }, [inputs]);

    const handleSearch = async () => {
        const { searchText, country, city, industry, size, overallRating } = inputs;

        const params = {
            country: country || '',
            city: city || '',
            industry: industry.length > 0 ? industry : '',
            size: size.length > 0 ? size : '',
            overallRating: overallRating,
            searchText: searchText,
        };

        // If all filter fields are empty, don't fetch any data or show all records.
        if (!params.country && !params.city && !params.industry && !params.size && !params.searchText && overallRating === 0) {
            setCompanies([]); // Clear results when no filters are applied.
            return;
        }

        try {
            const companyData = await searchCompany(params);
            setCompanies(companyData);
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
                    // className={`${styles["search-button"]}`}
                    />
                </div>
                <div className={styles["columns-container"]}>
                    <div className={styles["left-column"]}>
                        <div className={styles["filter-group"]}>
                            <label className={styles["filters-search"]}>
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
                                {inputs?.size?.length > 0 && inputs.size.map((size, index) => (
                                    <span key={index} className={styles["filter-pill"]}>
                                        {size}
                                        <span className={styles["remove-filter"]} onClick={() => handleRemoveSize(size)}>✕</span>
                                    </span>
                                ))}
                                {inputs.overallRating > 0 && (
                                    <span className={styles["filter-pill"]}>
                                        {`${inputs.overallRating}`}
                                        <span className={styles["remove-filter"]} onClick={() => handleRemoveRating()}>
                                            ✕
                                        </span>
                                    </span>
                                )}
                            </label>
                        </div>
                    </div>
                    <div className={styles["right-column"]}>
                        <div className={styles["filtered-companies"]}>
                            <div className={styles["list-icons"]}>
                                <h3>Showing: {companies.length} Filtered Startups</h3>
                                <div className={styles["icons"]}>
                                    <div className={`${styles["icon"]} ${viewType === "grid" ? styles["active"] : ""}`}
                                        onClick={() => handleViewTypeChange("grid")}><GridIcon /></div>
                                    <div className={`${styles["icon"]} ${viewType === "list" ? styles["active"] : ""}`}
                                        onClick={() => handleViewTypeChange("list")}><ListIcon /></div>
                                </div>
                            </div>
                            <div className={styles["companies-cards"]}>
                                {companies.length > 0 ? (
                                    companies.map((company) => {
                                        const logoData = company.logo ? JSON.parse(company.logo) : null;
                                        let logoUrl = "/assets/images/logo-1.png";
                                        if (logoData) {
                                            logoUrl = `/assets/images/${logoData.originalname}`;
                                        }

                                        const stars = Array.from({ length: 5 }, (_, index) => (
                                            <span
                                                key={index}
                                                onClick={() => onRatingChange(index + 1)}
                                                style={{
                                                    cursor: "pointer",
                                                    color: index < company.calculatedOverallRating ? "#FC9823" : "#ccc"
                                                }}
                                            >
                                                ★
                                            </span>
                                        ));

                                        return viewType === "grid" ? (
                                            <>
                                                <div key={company.id} className={styles["company-card"]} onClick={() => handleCompanyClick(company.id)}>
                                                    <div className={styles["company-logo"]}>
                                                        <img src={logoUrl} alt="Logo" />
                                                        <h4>{company.name}</h4>
                                                        <div className={styles["stars"]}>{stars}</div>
                                                    </div>
                                                    <div className={styles["company-info"]}>
                                                        <div>
                                                            <LikeIcon />
                                                            <p>{company.goodCount}</p>
                                                        </div>
                                                        <div>
                                                            <DislikeIcon />
                                                            <p>{company.notGoodCount}</p>
                                                        </div>
                                                        <p>{company.country}</p>
                                                        <div className={styles["ratings"]}>
                                                            <button className={styles["rating-button"]}>{company.calculatedOverallRating}</button>
                                                            <p>Overall Rating</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles["ad-card"]} style={{ backgroundColor: '#1C9596', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <p style={{ textAlign: 'center' }}>Add here</p>
                                                </div>
                                            </>

                                        ) : (
                                            <>
                                                <div key={company.id} className={styles["review-card"]} onClick={() => handleCompanyClick(company.id)}>
                                                    <div className={styles["content"]}>
                                                        <div className={styles["company-logo"]}>
                                                            <img src={logoUrl} alt="Logo" />
                                                        </div>
                                                        <div className={styles.name}>
                                                            <p>{company.name || "Company Name Not Available"}</p>
                                                            <div className={styles["stars"]}>
                                                                {stars}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={styles.actions}>
                                                        <div className={styles.ratings}>
                                                            <div className={styles.ratingItem}>
                                                                <p>{company.country}</p>
                                                            </div>
                                                            <div className={styles.ratingItem}>
                                                                <button className={styles["rating-button"]}>{company.calculatedOverallRating}</button>
                                                                <p>Overall Ratings</p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <LikeIcon />
                                                            <p>{company.goodCount}</p>
                                                        </div>
                                                        <div>
                                                            <DislikeIcon />
                                                            <p>{company.notGoodCount}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles["vertical-ad-card"]}>
                                                    <p>Add here...</p>
                                                </div>
                                            </>
                                        );
                                    })
                                ) : (
                                    <p>No companies found based on the search criteria.</p>
                                )}

                                <Pagination />

                                <div className={styles["vertical-ad-card"]}>
                                    <p>Add here...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeSearches;
