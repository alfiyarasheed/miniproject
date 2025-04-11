

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase"; // Correctly import your firebase configuration

// Define form data type
interface FormDataType {
    name: string;
    email: string;
    password: string;
    role: "user" | "manager" | "admin";
}

// Define admin credentials
const adminEmail = "alfiyava4@gmail.com"; // ✅ Set your admin email here
const adminPassword = "123456"; // ✅ Set a strong admin password here

const RegisterForm: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<FormDataType>({
        name: "",
        email: "",
        password: "",
        role: "user", // Default role
    });

    // Handle input changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle user registration
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check password length
        if (formData.password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        try {
            // Check if it's the admin email and password
            let assignedRole = formData.role;

            if (
                formData.email === adminEmail &&
                formData.password === adminPassword
            ) {
                assignedRole = "admin"; // ✅ Assign admin role if credentials match
            }

            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = userCredential.user;

            // Add user data to Firestore with role
            await setDoc(doc(db, "users", user.uid), {
                name: formData.name,
                email: formData.email,
                role: assignedRole, // Role is set dynamically
            });

            alert("User registered successfully!");

            // Redirect to the appropriate dashboard
            if (assignedRole === "admin") {
                router.push("/dashboard/admin");
            } else if (assignedRole === "manager") {
                router.push("/dashboard/manager");
            } else {
                router.push("/dashboard/user");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.message.includes("auth/email-already-in-use")) {
                    alert("This email is already registered. Please log in instead.");
                    router.push("/auth/login");
                } else {
                    console.error("Error registering user:", error);
                    alert("Failed to register. Please try again.");
                }
            }
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                </select>
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <a href="/auth/login">Login</a>
            </p>
        </div>
    );
};

export default RegisterForm;


// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from "@/firebase"; // Correctly import your firebase configuration

// // Define form data type
// interface FormDataType {
//     name: string;
//     email: string;
//     password: string;
//     role: "user" | "manager";
// }

// const RegisterForm: React.FC = () => {
//     const router = useRouter();
//     const [formData, setFormData] = useState<FormDataType>({
//         name: "",
//         email: "",
//         password: "",
//         role: "user", // Default role
//     });

//     // Handle input changes
//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//     ) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // Handle user registration
//     const handleRegister = async (e: React.FormEvent) => {
//         e.preventDefault();

//         // Check password length
//         if (formData.password.length < 6) {
//             alert("Password must be at least 6 characters long.");
//             return;
//         }

//         try {
//             // Create user with email and password
//             const userCredential = await createUserWithEmailAndPassword(
//                 auth,
//                 formData.email,
//                 formData.password
//             );
//             const user = userCredential.user;

//             // Add user data to Firestore with role
//             await setDoc(doc(db, "users", user.uid), {
//                 name: formData.name,
//                 email: formData.email,
//                 role: formData.role, // Only allow "user" or "manager"
//             });

//             alert("User registered successfully!");

//             // Redirect to the appropriate dashboard based on role
//             if (formData.role === "manager") {
//                 router.push("/dashboard/manager"); // ✅ Manager dashboard
//             } else {
//                 router.push("/dashboard/user"); // ✅ User dashboard
//             }
//         } catch (error: unknown) {
//             if (error instanceof Error) {
//                 if (error.message.includes("auth/email-already-in-use")) {
//                     alert("This email is already registered. Please log in instead.");
//                     router.push("/auth/login");
//                 } else {
//                     console.error("Error registering user:", error);
//                     alert("Failed to register. Please try again.");
//                 }
//             }
//         }
//     };

//     return (
//         <div className="auth-container">
//             <h2>Register</h2>
//             <form onSubmit={handleRegister}>
//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="Full Name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                 />
//                 <select name="role" value={formData.role} onChange={handleChange}>
//                     <option value="user">User</option>
//                     <option value="manager">Manager</option>
//                 </select>
//                 <button type="submit">Register</button>
//             </form>
//             <p>
//                 Already have an account? <a href="/auth/login">Login</a>
//             </p>
//         </div>
//     );
// };

// export default RegisterForm;
