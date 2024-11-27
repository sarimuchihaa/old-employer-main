import http from "../utils/http"; // Ensure this path is correct
import { review } from "../api/apiRoutes"; // Correctly import review

const addReview = async (reviewData) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token || !token.token) {
        throw new Error("No access token found");
    }

    http.setAccessToken(token.token);

    try {
        const response = await http.post(review.add, reviewData);
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error adding review:", error);
        throw error;
    }
};

const verifyReview = async (verification_doc, reviewId) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token || !token.token) {
        throw new Error("No access token found");
    }

    http.setAccessToken(token.token);

    const payload = {
        verification_doc,
        is_verified: true,
    };

    try {
        const response = await http.patch(`${review.verify}?id=${reviewId}`, payload);
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error verifying review:", error);
        throw error;
    }
};

const getReviewData = async (companyId) => {
    const token = JSON.parse(localStorage.getItem("token"));
    http.setAccessToken(token.token);

    try {
        // Use backticks to properly interpolate the companyId into the URL
        const response = await http.get(`/review/?companyId=${companyId}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching review data:", error);
        throw error;
    }
};

const getReviewDataByUser = async (userId) => {
    const token = JSON.parse(localStorage.getItem("token"));
    http.setAccessToken(token.token);

    try {
        // Use backticks to properly interpolate the companyId into the URL
        const response = await http.get(`/reviewbyuser/?id=${userId}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching review data:", error);
        throw error;
    }
};

const endowsReview = async (reviewData) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token || !token.token) {
        throw new Error("No access token found");
    }

    http.setAccessToken(token.token);

    try {
        const response = await http.post(review.endows, reviewData);
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error adding review:", error);
        throw error;
    }
};

const getEndowsData = async (companyId) => {
    const token = JSON.parse(localStorage.getItem("token"));
    http.setAccessToken(token.token);

    try {
        const response = await http.get(`${review.endows}?companyId=${companyId}`);
        console.log("Endows data:", response);
        return response.data;
    } catch (error) {
        console.error("Error fetching endows data:", error);
        throw error;
    }
};


export { addReview, verifyReview, getReviewData, getReviewDataByUser, endowsReview, getEndowsData };
