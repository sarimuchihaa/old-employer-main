// useLocation.js
import { useEffect, useState } from "react";
import axios from "axios";

const useLocation = () => {
    const [location, setLocation] = useState({ city: "", country: "" });

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                // Fetch the user's IP
                const ipResponse = await axios.get("https://api.ipify.org?format=json");
                const ip = ipResponse.data.ip;

                // Fetch location based on IP
                const locationResponse = await axios.get(`https://ipapi.co/${ip}/json/`);

                if (locationResponse.data) {
                    setLocation({
                        city: locationResponse.data.city || "",
                        country: locationResponse.data.country_name || "" // Use country_name for full name
                    });
                }
            } catch (error) {
                console.error("Error fetching location:", error);
            }
        };

        fetchLocation();
    }, []);

    return location;
};

export default useLocation;
