"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase"; // Correctly import Firebase config

const AdminLoginForm: React.FC = () => {
    const router = useRouter();

    // State to manage admin login credentials
    const [adminData, setAdminData] = useState({
        email: "",
        password: "",
    });

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAdminData({ ...adminData, [e.target.name]: e.target.value });
    };

    // Handle admin login
    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if email and password match the admin credentials
        if (
            adminData.email !== "admin@venueease.com" || // ✅ Admin email
            adminData.password !== "admin123" // ✅ Admin password
        ) {
            alert("Invalid admin credentials. Please try again.");
            return;
        }

        try {
            // Sign in admin
            await signInWithEmailAndPassword(auth, adminData.email, adminData.password);

            alert("Admin logged in successfully!");
            router.push("/admin"); // Redirect to admin dashboard
        } catch (error) {
            console.error("Error logging in admin:", error);
            alert("Failed to login as admin. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <h2>Admin Login</h2>
            <form onSubmit={handleAdminLogin}>
                <input
                    type="email"
                    name="email"
                    placeholder="Admin Email"
                    value={adminData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Admin Password"
                    value={adminData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login as Admin</button>
            </form>
        </div>
    );
};

export default AdminLoginForm;
