import { UserData } from "../types/auth";

export const registerUser = async (userData: UserData) => {
    try {
        const response = await fetch("http://localhost:5000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        return await response.json();
    } catch (error) {
        console.error("Register Error:", error);
        throw error;
    }
};

export const loginUser = async (userData: UserData) => {
    try {
        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        return await response.json();
    } catch (error) {
        console.error("Login Error:", error);
        throw error;
    }
};
