import http from "../utils/http";
import { company } from "../api/apiRoutes";

// Function to decode the JWT token
const parseJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Error decoding JWT:", error);
        return null;
    }
};

const getCompanyData = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    http.setAccessToken(token.token);

    try {
        const response = await http.get(company.view);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};

const getSingleCompanyData = async (companyId) => {
    const token = JSON.parse(localStorage.getItem("token"));
    http.setAccessToken(token.token);

    try {
        // Use backticks to properly interpolate the companyId into the URL
        const response = await http.get(`/company/single?id=${companyId}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching company data:", error);
        throw error;
    }
};

const fetchCompanySuggestions = async (name) => {
    const token = JSON.parse(localStorage.getItem("token"));
    http.setAccessToken(token.token);
    try {
        const response = await http.get(`/company/suggestions?name=${name}`);
        return response.data;
    } catch (error) {
        console.error("Error searching for companies:", error);
        throw error;
    }

};

const searchCompany = async ({ country, city, industry, size, searchText, overallRating }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    http.setAccessToken(token.token);

    const queryParams = new URLSearchParams({
        country,
        city,
        industry,
        size,
        searchText,
        overallRating,
    });

    try {
        const response = await http.get(`${company.search}?${queryParams}`);
        return response.data;
    } catch (error) {
        console.error("Error searching for companies:", error);
        throw error;
    }
};

const saveNotFoundCompany = async (searchTerm) => {
    const token = JSON.parse(localStorage.getItem("token"));
    http.setAccessToken(token.token);

    try {
        await http.post('/company/notFound', { searchTerm });
    } catch (error) {
        console.error('Error saving not found company:', error);
    }
};


const createCompany = async (companyName) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("User token not found. Please log in.");
        }

        // Decode the token to get the user ID
        const decodedToken = parseJwt(JSON.parse(token).token);
        const currentUserId = decodedToken ? decodedToken.id : null;

        if (!currentUserId) {
            throw new Error("User ID not found in token. Please log in again.");
        }

        // Set the access token for HTTP requests
        http.setAccessToken(JSON.parse(token).token);

        // Create company with createdBy field
        const response = await http.post(company.add, {
            name: companyName,
            createdBy: currentUserId,  // Include createdBy field with the extracted user ID
        });

        if (!response || !response.data) {
            throw new Error("Invalid response from server");
        }

        return response.data;
    } catch (error) {
        console.error("Error creating company:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const updateCompany = async (companyId, companyData) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("User token not found. Please log in.");
        }

        // Decode the token to get the user ID
        const decodedToken = parseJwt(JSON.parse(token).token);
        const currentUserId = decodedToken ? decodedToken.id : null;

        if (!currentUserId) {
            throw new Error("User ID not found in token. Please log in again.");
        }

        // Set the access token for HTTP requests
        http.setAccessToken(JSON.parse(token).token);

        // Add the updatedBy field to companyData
        const updatedCompanyData = {
            ...companyData,
            updatedBy: currentUserId,  // Set updatedBy to the current user ID
        };

        const response = await http.patch(`${company.add}?id=${companyId}`, updatedCompanyData);

        if (!response || !response.data) {
            throw new Error("Invalid response from server");
        }

        return response.data;
    } catch (error) {
        console.error("Error updating company:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const verifyCompany = async (companyId, company_email, verification_doc, claim_by, designation, phone) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("User token not found. Please log in.");
        }
        http.setAccessToken(JSON.parse(token).token);

        const verificationData = {
            company_email: company_email,
            verification_doc: verification_doc,
            claim_by: claim_by,
            designation: designation,
            phone: phone
        };

        // Call the API to verify the company
        const response = await http.put(`/company/verify?id=${companyId}`, verificationData);

        if (!response || !response.data) {
            throw new Error("Invalid response from server");
        }

        return response.data;
    } catch (error) {
        console.error("Error verifying company:", error.response ? error.response.data : error.message);
        throw error.response?.data?.message || "Company verification failed";
    }
};

const verifyEmail = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("User token not found. Please log in.");
        }
        http.setAccessToken(JSON.parse(token).token);

        // Call the API to verify the company
        const response = await http.get(`/company/verify-email?token=${token}`);

        if (!response || !response.data) {
            throw new Error("Invalid response from server");
        }

        return response.data;
    } catch (error) {
        console.error("Error verifying company:", error.response ? error.response.data : error.message);
        throw error.response?.data?.message || "Company verification failed";
    }
};

export { getCompanyData, getSingleCompanyData, searchCompany, createCompany, updateCompany, verifyCompany, verifyEmail, saveNotFoundCompany, fetchCompanySuggestions };