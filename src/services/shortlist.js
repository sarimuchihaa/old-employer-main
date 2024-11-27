import http from "../utils/http";
import { shortlist } from "../api/apiRoutes";

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

const addToShortlist = async (userId, category) => {
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

        // Send POST request to add the candidate to the shortlist
        const response = await http.post(shortlist.add, {
            candidateId: userId, // Pass userId in the request body
            category
        });

        return response.data; // Return the backend response
    } catch (error) {
        console.error("Error adding to shortlist:", error);
        throw error; // Rethrow error to handle in calling function
    }
};

// const removeFromShortlist = async (userId) => {
//     try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//             throw new Error("User token not found. Please log in.");
//         }

//         const decodedToken = parseJwt(JSON.parse(token).token);
//         const currentUserId = decodedToken ? decodedToken.id : null;

//         if (!currentUserId) {
//             throw new Error("User ID not found in token. Please log in again.");
//         }

//         http.setAccessToken(JSON.parse(token).token);

//         // Send DELETE request to remove the candidate from the shortlist
//         const response = await http.delete(`${shortlist.add}?id=${userId}`);

//         return response.data;
//     } catch (error) {
//         console.error("Error removing from shortlist:", error);
//         throw error;
//     }
// };

const removeFromShortlist = async (userId, category) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("User token not found. Please log in.");
        }

        const decodedToken = parseJwt(JSON.parse(token).token);
        const currentUserId = decodedToken ? decodedToken.id : null;

        if (!currentUserId) {
            throw new Error("User ID not found in token. Please log in again.");
        }

        http.setAccessToken(JSON.parse(token).token);

        // Send DELETE request to remove the candidate from the shortlist
        const response = await http.patch(`${shortlist.add}?id=${userId}&category=${category}`);

        return response.data; // Ensure this returns an object with a `message` property
    } catch (error) {
        console.error("Error removing from shortlist:", error);
        throw error;
    }
};

const getCategories = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("User token not found. Please log in.");
        }

        const response = await http.get(shortlist.add);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

const getCandidatesByCategory = async (category) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("User token not found. Please log in.");
        }

        // Encode the category to handle special characters
        const encodedCategory = encodeURIComponent(category);

        // Set token for authenticated requests
        http.setAccessToken(JSON.parse(token).token);

        // Send a GET request with the category parameter
        const response = await http.get(`${shortlist.view}?category=${encodedCategory}`);

        return response.data;
    } catch (error) {
        console.error("Error fetching candidates by category:", error);
        throw error;
    }
};


const removeCandidatesByCategory = async (category) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("User token not found. Please log in.");
        }

        http.setAccessToken(JSON.parse(token).token);

        // Send DELETE request to remove the candidate from the shortlist by category
        const response = await http.delete(`${shortlist.add}?category=${category}`);

        return response.data;
    } catch (error) {
        console.error("Error removing from shortlist:", error);
        throw error;
    }
};


export { addToShortlist, removeFromShortlist, getCategories, removeCandidatesByCategory, getCandidatesByCategory };
