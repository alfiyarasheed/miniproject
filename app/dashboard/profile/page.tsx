// "use client";
// import React from "react";

// const Profile = () => {
//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-lg font-bold mb-4">Profile</h2>
//             <p>Update your profile information here.</p>
//         </div>
//     );
// };

// export default Profile;

"use client";
import React, { useState } from "react";

// Define User Data Type
interface UserData {
    name: string;
    email: string;
}

// Dummy user data for now (can be replaced with API data later)
const initialUserData: UserData = {
    name: "MahinSala",
    email: "mahinsala123456789@gmail.com",

};

const Profile = () => {
    // State to manage user details
    const [userData] = useState<UserData>(initialUserData);

    // Placeholder function for Edit button
    // const handleEdit = () => {
    //     alert("Edit functionality will be implemented later!");
    // };

    return (
        <div className="profile-container">
            {/* Welcome Message */}
            <h2 className="welcome-text">Welcome, {userData.name}! 🎉</h2>

            {/* User Details Section */}
            <div className="user-details">
                <div className="detail">
                    <strong>Name:</strong> {userData.name}
                </div>
                <div className="detail">
                    <strong>Email:</strong> {userData.email}
                </div>
                {/* <div className="detail">
                    <strong>Phone:</strong> {userData.phone}
                </div> */}
            </div>

            {/* Edit Button */}
            {/* <button className="edit-btn" onClick={handleEdit}>
                Edit
            </button> */}
        </div>
    );
};

export default Profile;
