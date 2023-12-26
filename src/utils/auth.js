import { decodeToken } from "react-jwt";

// Store tokens in localStorage after logging in
export const setAccessToken = (token) => {
    localStorage.setItem("access_token", token);
};

// Get tokens from localStorage when needed
export const getAccessToken = () => {
    return localStorage.getItem("access_token");
};

// Check if the user is logged in
export const isLoggedIn = () => {
    const token = getAccessToken();
    return !!token;
};

// Remove token from localStorage when logging out
export const removeAccessToken = () => {
    localStorage.removeItem("access_token");
};

// Decode tokens
export const getDecodedToken = () => {
    const token = getAccessToken();
    if (token) {
        try {
            const decodedToken = decodeToken(token);
            return decodedToken;
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    }
    return null;
};
