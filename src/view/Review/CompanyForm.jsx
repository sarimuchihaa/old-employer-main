"use client";
import React, { useEffect, useRef, useState } from "react";
import Input from "../../dump/Input";
import Button from "../../dump/Button";
import Flag from "react-world-flags";
import Dropdown from "../../dump/Dropdown";
import styles from "../../style/pageStyle/reviewStyle/company.module.scss";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { updateCompany } from "../../services/company";
import { useRouter, useSearchParams } from "next/navigation";
import { UploadsIcon } from "../../icon";

const CompanyForm = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const searchParams = useSearchParams();
  const [inputs, setInputs] = useState({
    name: "",
    logo: {},
    web_url: "",
    industry: "",
    email: "",
    country: "",
    city: "",
    size: "",
    phone: "",
    updatedBy: 0
  });
  const [countrySearchText, setCountrySearchText] = useState("");
  const [citySearchText, setCitySearchText] = useState("");

  const handleInputChange = (e) => {
    console.log("Input changed:", e.target.name, e.target.value);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

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
        cities.filter((city) => city.country_name === inputs.country.name)
      );
    }
  }, [inputs.country, cities]);

  const handleCountrySelect = (value) => {
    console.log("Selected country:", value);
    setInputs({ ...inputs, country: value, city: "" });
  };


  const handleCitySelect = (value) => {
    setInputs({ ...inputs, city: value });
  };

  const handleIndustrySelect = (value) => {
    setInputs((prev) => ({
      ...prev,
      industry: value.name
    }));
  };

  const handleSizeSelect = (value) => {
    setInputs((prev) => ({
      ...prev,
      size: value.name
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const logoData = {
          originalname: file.name,
          mimetype: file.type,
          size: file.size,
        };

        setInputs((prevInputs) => ({
          ...prevInputs,
          logo: file,
          logoPreview: reader.result,
          logoData: logoData,
        }));
        console.log("Logo uploaded:", file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const data = searchParams.get('data');
    const companyName = searchParams.get('companyName');

    if (companyName) {
      setInputs((prev) => ({
        ...prev,
        name: companyName,
      }));
    }

    if (data) {
      try {
        const companyData = JSON.parse(decodeURIComponent(data));
        console.log("Company data parsed:", companyData);

        setInputs((prev) => ({
          ...prev,
          ...companyData,
        }));

        setCountrySearchText(companyData.country || "");
        setCitySearchText(companyData.city || "");

        if (companyData.logo) {
          try {
            const logoData = JSON.parse(companyData.logo);
            console.log("Parsed Logo Data:", logoData);

            // Ensure you correctly set the logoData based on existing logo
            setInputs((prev) => ({
              ...prev,
              logo: null, // Keep logo null initially
              logoPreview: `/assets/images/${logoData.originalname}`, // Update with correct path
              logoData: logoData, // Ensure this is set to keep existing logo info
            }));

          } catch (logoError) {
            console.error("Failed to parse logo data:", logoError);
          }
        }

      } catch (error) {
        console.error("Failed to parse company data:", error);
      }
    }
  }, [searchParams]);

  const handleUpdate = async () => {
    try {
      const companyId = searchParams.get('id');
      if (!companyId) {
        throw new Error("Company ID not found in the URL");
      }
      else {
        console.log(companyId);
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User token not found. Please log in.");
      }

      const user = JSON.parse(token);
      const currentUserId = user.id;
      console.log("userid", currentUserId);

      // Building the payload for update
      const payload = {
        name: inputs.name || "",
        city: typeof inputs.city === 'object' ? inputs.city.name || '' : inputs.city || "",
        country: typeof inputs.country === 'object' ? inputs.country.name || '' : inputs.country || "",
        email: inputs.email || "",
        industry: inputs.industry || "",
        web_url: inputs.web_url || "",
        size: inputs.size || "",
        phone: inputs.phone || "",
        updatedBy: currentUserId,
        logo: inputs.logo
          ? {
            originalname: inputs.logo.name,
            mimetype: inputs.logo.type,
            size: inputs.logo.size,
          }
          : inputs.logoData
            ? {
              originalname: inputs.logoData.originalname,
              mimetype: inputs.logoData.mimetype,
              size: inputs.logoData.size,
            }
            : null
      };

      console.log("Payload before sending:", payload);
      const responseData = await updateCompany(companyId, payload);

      if (responseData) {
        router.push(`/review?companyId=${companyId}`);
        toast.success("Company details updated successfully!");
      } else {
        throw new Error("Update failed or response does not reflect the updated data.");
      }
    } catch (err) {
      console.error("Error during company update operation:", err);
      toast.error(err.message || "An error occurred during the update");
    }
  };

  return (
    <div className={styles["Main-Register"]}>
      <div className={`${styles["form-container"]}`}>
        {inputs.name && (
          <>
            <h3 className={`${styles["header-title"]} ${styles["h3"]}`}>
              {inputs.name}
            </h3>
            <p className={`${styles["header-subtitle"]} ${styles["p"]}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod incididunt ut labore et dolore magna aliqua.
            </p>
          </>
        )}
        <div className={`${styles["form-content"]}`}>
          <div className={styles["upload"]} onClick={handleUploadClick}>
            {inputs.logoPreview ? (
              <img
                src={inputs.logoPreview}
                alt="Company Logo"
                className={styles["uploaded-logo"]}
                onClick={(e) => {
                  e.stopPropagation();
                  handleUploadClick();
                }}
              />
            ) : (
              <>
                <UploadsIcon />
                <p>Upload company logo</p>
              </>
            )}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className={`${styles["input-group"]}`}>
            <Input
              label={"Web URL"}
              placeholder={"Example: www.domain.com"}
              containerClassName={`${styles["input-width"]}`}
              value={inputs.web_url}
              onChange={handleInputChange}
              name={"web_url"}
            />
          </div>
          <div className={`${styles["input-group"]}`}>
            <div className={`${styles["input-width"]}`}>
              <label htmlFor="country" className={`${styles["dropdown-label"]}`}>
                Size
              </label>
              <div className={`${styles["dropdown-container"]}`}>
                <Dropdown
                  items={[
                    { label: "11-20", value: { name: "11-20" } },
                    { label: "101-200", value: { name: "101-200" } },
                    { label: "200-500", value: { name: "200-500" } },
                  ]}
                  label={
                    <div className={`${styles["dropdown-selected"]}`}>
                      <span>{inputs.size || "Select Size"}</span>
                    </div>
                  }
                  onSelect={handleSizeSelect}
                />
              </div>
            </div>
            <div className={`${styles["input-width"]}`}>
              <label htmlFor="country" className={`${styles["dropdown-label"]}`}>
                Industry
              </label>
              <div className={`${styles["dropdown-container"]}`}>
                <Dropdown
                  items={[
                    { label: "Technology", value: { name: "Technology" } },
                    { label: "Healthcare", value: { name: "Healthcare" } },
                    { label: "Finance", value: { name: "Finance" } },
                  ]}
                  label={
                    <div className={`${styles["dropdown-selected"]}`}>
                      <span>{inputs.industry || "Select an Industry"}</span>
                    </div>
                  }
                  onSelect={handleIndustrySelect}
                />
              </div>
            </div>
          </div>

          <div className={`${styles["input-group"]}`}>
            <div className={`${styles["input-width"]}`}>
              <label htmlFor="country" className={`${styles["dropdown-label"]}`}>
                Country
              </label>
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
                        setCountrySearchText(e.target.value); // Update the search text
                      }}
                      placeholder="Select a country"
                      className={styles["dropdown-input"]}
                      autoFocus
                    />
                  }
                  onSelect={(value) => {
                    handleCountrySelect(value);
                    setCountrySearchText(value.name); // Update the input to reflect the selected country
                  }}
                />
              </div>
            </div>

            <div className={`${styles["input-width"]}`}>
              <label htmlFor="city" className={`${styles["dropdown-label"]}`}>
                City
              </label>
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
                        setCitySearchText(e.target.value); // Update the search text
                      }}
                      placeholder="Select a city"
                      className={styles["dropdown-input"]}
                      autoFocus
                    />
                  }
                  onSelect={(value) => {
                    handleCitySelect(value);
                    setCitySearchText(value.name); // Update the input to reflect the selected city
                  }}
                />
              </div>
            </div>
          </div>
          <div className={`${styles["input-group"]}`}>
            <Input
              label={"Company email address"}
              placeholder={"Enter your Email"}
              containerClassName={`${styles["input-width"]}`}
              value={inputs.email}
              onChange={handleInputChange}
              name={"email"}
              type="email"
            />
            <Input
              label={"Company Phone Number"}
              placeholder={"123-456-7836"}
              containerClassName={styles["input-width"]}
              value={inputs.phone}
              onChange={handleInputChange}
              name={"phone"}
              type="tel"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            />
          </div>
          <Button
            text={"Continue"}
            classes={styles["btn-join"]}
            onClick={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyForm;
