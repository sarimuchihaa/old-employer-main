"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../style/pageStyle/searchStyle/search.module.scss";
import Input from "../../dump/Input";
import Button from "../../dump/Button";
import Flag from "react-world-flags";
import Dropdown from "../../dump/Dropdown";
import { searchCompany, saveNotFoundCompany } from '../../services/company';
import { searchUsers } from '../../services/user';
import useLocation from "../../components/Topbar/Location";
import RatingsCardContainer from "../../components/Search/RatingsCardContainer";
import SectionHeader from "../../components/Search/SectionHeader";
import TextFirstSection from "../../components/Search/TextFirstSection";
import { HeaderIcon, HeaderIcon0, HeaderIcon1 } from "../../icon";
import CompanySignup from "../../components/Search/CompanySignup";
import CompanyReviews from "../../components/Search/CompanyReviews"; // Add this import
import JoinWithSocialMedia from "../../components/Search/JoinWithSocialMedia"; // Add this import
import HowItWorks from "../../components/Search/HowItWorks"; // Add this import

const SearchView = () => {
    const router = useRouter();
    const { city: locationCity, country: locationCountry } = useLocation();
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [inputs, setInputs] = useState({
        searchText: "",
        country: "",
        city: "",
        role: "Employer"
    });

    const roles = [
        { label: "Employer", value: "Employer" },
        { label: "Employee", value: "Employee" },
    ];

    const [countrySearchText, setCountrySearchText] = useState("");
    const [citySearchText, setCitySearchText] = useState("");
    const [companies, setCompanies] = useState([]);
    useEffect(() => {
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
            setFilteredCities(
                cities.filter((city) => city.country_name === inputs.country)
            );
        } else {
            setFilteredCities([]);
        }
    }, [inputs.country, cities]);

    const handleCountrySelect = (value) => {
        console.log("Selected country:", value);
        setInputs({ ...inputs, country: value.name, city: "" });
    };

    const handleCitySelect = (value) => {
        setInputs({ ...inputs, city: value.name });
    };


    const handleInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };
    const handleRoleSelect = (role) => {
        setInputs({ ...inputs, role });
    };

    const handleSearch = async () => {
        const { role, searchText, country, city } = inputs;
        const finalCountry = country || locationCountry;
        const finalCity = city || locationCity;
        try {
            if (role === "Employee") {
                const params = {
                    country: finalCountry || '',
                    city: finalCity || '',
                    searchText: searchText,
                    overallRating: 0,
                    skills: '',
                    industry: "",
                    size: ""
                };
                const userData = await searchUsers(params);
                console.log(userData);
                console.log(typeof '/employeeSearch');
                console.log(params);
                router.push(`/employeeSearch?${new URLSearchParams(params).toString()}`);
            } else if (role === "Employer") {
                const params = {
                    country: country || '',
                    city: city || '',
                    searchText: searchText,
                    overallRating: 0,
                };
                const companyData = await searchCompany(params);
                console.log(companyData);
                if (companyData.length === 0 && searchText) {
                    await saveNotFoundCompany(searchText); // Call a separate function to save the name
                }
                console.log(typeof '/employerSearch');
                console.log(params);
                router.push(`/employerSearch?${new URLSearchParams(params).toString()}`);
                setCompanies(companyData);

            }
        } catch (error) {
            console.error('Error during search:', error);

        }
    };

    return (
        <div className={styles.search}>
            <div className={styles["content-container"]}>
                <div className={styles["header"]}>
                    <h3 className={`${styles["header-title"]} ${styles["h3"]}`}>
                        Look Inside any Company
                    </h3>
                    <p className={`${styles["header-subtitle"]} ${styles["p"]}`}>
                        Read reviews and discover great companies!<br />Write reviews & help others discover the right job & great companies.
                    </p>
                </div>
                <div className={`${styles["form-container"]}`}>
                    <div className={`${styles["form-content"]}`}>
                        <div className={`${styles["input-group"]}`}>
                            <Input
                                containerClassName={`${styles["input-width"]}`}
                                placeholder={"Search Company/Employer or Keyword"}
                                inputContainerClass={`${styles["input-div"]}`}
                                value={inputs.searchText}
                                onChange={handleInputChange}
                                name={"searchText"}
                            />
                            <div className={`${styles["dropdown-container"]}`}>
                                <Dropdown
                                    items={countries
                                        .filter((country) =>
                                            country.name.toLowerCase().includes(countrySearchText.toLowerCase())
                                        )
                                        .map((country) => ({
                                            label: (
                                                <div className={`${styles["dropdown-item"]}`}>
                                                    <Flag code={country.iso2} width="25" />
                                                    <span>{country.name}</span>
                                                </div>
                                            ),
                                            value: country,
                                        }))}
                                    label={
                                        <input
                                            type="text"
                                            value={countrySearchText}
                                            onChange={(e) => {
                                                setCountrySearchText(e.target.value);
                                            }}
                                            placeholder="Select a country"
                                            className={styles["dropdown-input"]}
                                            autoFocus
                                        />
                                    }
                                    onSelect={(value) => {
                                        handleCountrySelect(value);
                                        setCountrySearchText(value.name);
                                    }}
                                />
                            </div>
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
                                        }))}
                                    label={
                                        <input
                                            type="text"
                                            value={citySearchText}
                                            onChange={(e) => {
                                                setCitySearchText(e.target.value);
                                            }}
                                            placeholder="Select a city"
                                            className={styles["dropdown-input"]}
                                            autoFocus
                                        />
                                    }
                                    onSelect={(value) => {
                                        handleCitySelect(value);
                                        setCitySearchText(value.name);
                                    }}
                                />
                            </div>
                            <div className={`${styles["dropdown-container"]}`}>
                                <Dropdown
                                    items={roles.filter((role) => role.value !== inputs.role)}
                                    label={inputs.role}
                                    onSelect={handleRoleSelect}
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
                <div className={styles["more-container"]}>
                    <div className={styles["section-2"]}>
                        <RatingsCardContainer />
                    </div>
                    <div className={styles["section-5"]} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <CompanySignup />
                    </div>
                    <div className={styles["section-3"]}>
                        <SectionHeader
                            title="How can look inside any company"
                            description="The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 also reproduced in their exact original form, accompanied by English versions"
                            icon={<HeaderIcon />} />
                        <TextFirstSection
                            title="THow can look in side in any company"
                            description="The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 falso reproduced in their exactoriginal form, accompanied by English versions"
                            icon={<HeaderIcon0 />}
                        />
                        <SectionHeader
                            title="How can look in side in any company"
                            description="The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 falso reproduced in their exactoriginal form, accompanied by English versions"
                            icon={<HeaderIcon1 />}
                        />
                        <TextFirstSection
                            title="Companies Rating"
                            description="The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 falso reproduced in their exactoriginal form, accompanied by English versions"
                            icon={<CompanyReviews />}
                        />
                    </div>
                    <div className={styles["section-4"]}>
                        <CompanySignup />
                    </div>
                    <div className={styles["section-6"]}>
                        <JoinWithSocialMedia />
                    </div>
                    <div className={styles["section-7"]}>
                        <HowItWorks />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchView;
