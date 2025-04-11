"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase"; // Import Firebase config

const AdminRegisterForm: React.FC = () => {
    const router = useRouter();

    // State to store admin's credentials
    const [adminData, setAdminData] = useState({
        email: "",
        password: "",
    });

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAdminData({ ...adminData, [e.target.name]: e.target.value });
    };

    // Handle admin registration
    const handleAdminRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // Enforce admin-specific email and password
        if (
            adminData.email !== "admin@venueease.com" || // ✅ Admin email
            adminData.password !== "admin123" // ✅ Admin password
        ) {
            alert("Invalid admin credentials. Please try again.");
            return;
        }

        try {
            // Create admin user
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                adminData.email,
                adminData.password
            );
            const user = userCredential.user;

            // Add admin data to Firestore
            await setDoc(doc(db, "users", user.uid), {
                email: adminData.email,
                role: "admin", // ✅ Assign role as "admin"
            });

            alert("Admin registered successfully!");
            router.push("/admin"); // Redirect to admin dashboard
        } catch (error) {
            console.error("Error registering admin:", error);
            alert("Failed to register admin. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <h2>Admin Registration</h2>
            <form onSubmit={handleAdminRegister}>
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
                <button type="submit">Register as Admin</button>
            </form>
        </div>
    );
};

export default AdminRegisterForm;
