import http from "../utils/http";
import { user } from "../api/apiRoutes";

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

// Utility function to get the userId from the token
const getUserId = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const decodedToken = parseJwt(token.token);
  const currentUserId = decodedToken ? decodedToken.id : null;
  return currentUserId;
};

const addOrUpdateAbout = async (about) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token || !token.token) {
    throw new Error("No access token found");
  }

  http.setAccessToken(token.token);

  try {
    const response = await http.post(`/user/`, { about });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error updating about section:", error);
    throw error;
  }
};

const getUserData = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  http.setAccessToken(token.token);

  try {
    const response = await http.get(user.about);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

const getUserById = async (userId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  http.setAccessToken(token.token);

  try {
    const response = await http.get(`/user/user-details?id=${userId}`);
    return response.data;

  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

const searchUsers = async ({ country, city, skills, industry, searchText }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  http.setAccessToken(token.token);

  const queryParams = new URLSearchParams({
    country,
    city,
    skills,
    industry,
    searchText,
  });
  console.log("data:", country, city, skills, industry, searchText);

  try {
    const response = await http.get(`${user.search}?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error("Error searching for users:", error);
    throw error;
  }
};

const addToWatchlist = async (companyId) => {
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

    console.log("Sending:", { currentUserId, companyId }); // Log the payload being sent
    const response = await http.post(`/user/watchlist?id=${currentUserId}`, { // Fixed backticks
      companyId,
    });

    return response.data; // Return response data if needed
  } catch (error) {
    console.error("Error adding to watchlist & followers:", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

const removeFromWatchlist = async (companyId) => {
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

    http.setAccessToken(JSON.parse(token).token);
    console.log("Sending:", { currentUserId, companyId });

    const response = await http.delete(`/user/followers?id=${currentUserId}&companyId=${companyId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing from watchlist & followers:", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

const addToFollow = async (userId) => {
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

    // Send POST request to follow the target user
    const response = await http.post(`/user/follow?id=${currentUserId}`, {
      targetUserId: userId,  // Pass targetUserId in the request body
    });

    return response.data; // Return the backend response
  } catch (error) {
    console.error("Error adding to followers:", error);
    throw error; // Rethrow error to handle in calling function
  }
};

const removeFromFollowing = async (userId) => {
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

    // Send DELETE request with query parameter and body
    const response = await http.delete(`/user/following?id=${currentUserId}`, {
      data: { targetUserId: userId } // Send targetUserId in the request body
    });

    return response.data;
  } catch (error) {
    console.error("Error removing from followers:", error);
    toast.error(error.message || "Error removing from followers");
  }
};


export { addOrUpdateAbout, getUserData, searchUsers, getUserById, addToWatchlist, removeFromWatchlist, addToFollow, removeFromFollowing, getUserId };
