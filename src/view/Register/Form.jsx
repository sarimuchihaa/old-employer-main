"use client";
import React, { useEffect, useState } from "react";
import Input from "../../dump/Input";
import Button from "../../dump/Button";
import Flag from "react-world-flags";
import Dropdown from "../../dump/Dropdown";
import styles from "../../style/pageStyle/registerStyle/Form.module.scss"
import { toast } from "react-toastify";
import { register } from "../../services/auth";
import { useRouter } from "next/navigation";


const Form = () => {
  const router = useRouter()
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    country: {},
    city: "",
    phone: "",
    industry: "",
    watchlist: []
  });

  const handleInputChange = (e) => {
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

  const handleCountrySelect = (value) => {
    setInputs({ ...inputs, country: value });
  };

  const handleRegisterBtn = async () => {
    if (
      inputs.city !== "" ||
      inputs.country.name !== undefined ||
      inputs.email !== "" ||
      inputs.firstname !== "" ||
      inputs.industry !== "" ||
      inputs.lastname !== "" ||
      inputs.password !== ""
    ) {
      const reqBody = {
        ...inputs,
        country: inputs.country.name,
        phone:
          inputs.phone !== "" ? inputs.country.phone_code + inputs.phone : "",
      };
      const resp = await register(reqBody);
      if (resp.status === 201) {
        toast.success("Register successfully")
        router.push('/login');
      }
    } else {
      toast.error("Excluding phone all fields are required");
    }
  };

  return (
    <div className={`${styles['form-container']}`}>
      <h3 className={`${styles['header-title']} ${styles['h3']}`}>
        Join the OldEmployer Family!
      </h3>
      <p className={`${styles['header-subtitle']} ${styles['p']}`}>
      Join the OldEmployer Family and take your career to new heights with trusted opportunities and the growth.
      </p>
      <div className={`${styles['form-content']}`}>
        <div className={`${styles['input-group']}`}>
          <Input
            label={"First name"}
            placeholder={"Example: Johan"}
            containerClassName={`${styles['input-width']}`}
            value={inputs.firstname}
            onChange={handleInputChange}
            name={"firstname"}
          />
          <Input
            label={"Last name"}
            placeholder={"Example: Smith"}
            containerClassName={`${styles['input-width']}`}
            value={inputs.lastname}
            onChange={handleInputChange}
            name={"lastname"}
          />
        </div>

        <div className={`${styles['input-group']}`}>
          <Input
            label={"Email address"}
            placeholder={"Enter your email"}
            containerClassName={`${styles['input-width']}`}
            value={inputs.email}
            onChange={handleInputChange}
            name={"email"}
            type="email"
          />
          <Input
            label={"Enter Password"}
            placeholder={"********"}
            containerClassName={`${styles['input-width']}`}
            value={inputs.password}
            onChange={handleInputChange}
            name={"password"}
            type="password"
          />
        </div>
        <div className={`${styles['input-group']}`}>
          <div className={`${styles['input-width']}`}>
            <label htmlFor="country" className={`${styles['dropdown-label']}`}>
              Select Country
            </label>
            <div className={`${styles['dropdown-container']}`}>
              <Dropdown
                items={countries.map((country) => ({
                  label: (
                    <div className={`${styles['dropdown-item']}`}>
                      <Flag code={country.iso2} width="25" />
                      <span>+{country.phone_code}</span>
                    </div>
                  ),
                  value: country,
                }))}
                label={
                  <div className={`${styles['dropdown-selected']}`}>
                    <Flag
                      code={inputs.country.iso2 || countries[0]?.iso2}
                      width="25"
                    />
                    <span>
                      +{inputs.country.phone_code || countries[0]?.phone_code}
                    </span>
                  </div>
                }
                onSelect={handleCountrySelect}
              />
              <Input
                placeholder={"123-456-7836"}
                containerClassName={styles["inputContainer"]}
                inputContainerClass={`${styles['number-input']} ${styles['inputBar']}`}
                value={inputs.phone}
                onChange={handleInputChange}
                name={"phone"}
                type="tel"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              />
            </div>
          </div>

          <div className={`${styles['input-width']}`}>
            <label htmlFor="city" className={`${styles['dropdown-label']}`}>
              Select City
            </label>
            <select
              id="city"
              name="city"
              value={inputs.city}
              onChange={handleInputChange}
              className={`${styles['select-component']}`}
            >
              <option >Select your city...</option>
              {cities
                .filter((city) => city.country_name === inputs.country.name)
                .map((city) => (
                  <option value={city.name}>{city.name}</option>
                ))}
            </select>
          </div>
        </div>
        <div className={`${styles['input-group']}`}>
          <Input
            label={"Industry"}
            placeholder={"Enter your industry"}
            containerClassName={`${styles['input-width']}`}
            value={inputs.industry}
            onChange={handleInputChange}
            name={"industry"}
          />
        </div>
        <Button
          text={"Join Now"}
          classes={styles["btn-join"]}
          onClick={handleRegisterBtn}
        />
      </div>
    </div>
  );
};

export default Form;
