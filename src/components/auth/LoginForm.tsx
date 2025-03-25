// "use client"
// import React, { useState } from "react";
// import "../../../styles/globals.css"; // Import form styles


// const LoginForm: React.FC = () => {
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         console.log("User logged in:", formData);
//     };

//     return (
//         <div className="auth-container">
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
//                 <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
//                 <button type="submit">Login</button>
//             </form>
//             <p>{"Don't have an account?"} <a href="/auth/register">Register</a></p>
//         </div>
//     );
// };

// export default LoginForm;

// "use client";
// import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../../src/firebase"; // Import auth from firebaseConfig
// import "../../../styles/globals.css";

// const LoginForm: React.FC = () => {
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
//             console.log("User logged in:", userCredential.user);
//             alert("Login successful!");
//         } catch (error) {
//             console.error("Login error:", error);
//             alert("Failed to log in. Please check your credentials.");
//         }
//     };

//     return (
//         <div className="auth-container">
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
//                 <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
//                 <button type="submit">Login</button>
//             </form>
//             <p>{"Don't have an account?"} <a href="/auth/register">Register</a></p>
//         </div>
//     );
// };

// export default LoginForm;

"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../src/firebase"; // Import auth and firestore
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import "../../../styles/globals.css";

const LoginForm: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle login
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Sign in with email and password
            const userCredential = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = userCredential.user;

            // Get user role from Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));

            if (userDoc.exists()) {
                const userData = userDoc.data();
                if (userData.role === "manager") {
                    router.push("/manager"); // Redirect to manager dashboard
                } else {
                    router.push("/dashboard/user"); // Redirect to user dashboard
                }
            } else {
                console.error("No such user found!");
                alert("Error fetching user data.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Failed to log in. Please check your credentials.");
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={handleChange}
                />
                <button type="submit">Login</button>
            </form>

            <p> Don&apos;t have an account? <a href="/auth/register">Register</a></p>
        </div >
    );
};

export default LoginForm;
