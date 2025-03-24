"use client";
import React, { useState } from "react";
// import "./styles.css"; // Import CSS

// Define venue type
interface Venue {
    id: number;
    name: string;
    location: string;
    price: string;
    capacity: string;
}

// Mock data for venues
const mockVenues: Venue[] = [
    {
        id: 1,
        name: "Grand Hall",
        location: "City Center",
        price: "₹2000/hr",
        capacity: "500",
    },
    {
        id: 2,
        name: "Skyline Auditorium",
        location: "Downtown",
        price: "₹3000/hr",
        capacity: "800",
    },
];

const RemoveVenue = () => {
    const [venues, setVenues] = useState<Venue[]>(mockVenues);
    const [message, setMessage] = useState<string>("");

    // Handle venue removal
    const handleRemove = (id: number) => {
        const updatedVenues = venues.filter((venue) => venue.id !== id);
        setVenues(updatedVenues);
        setMessage("Venue removed successfully!");
    };

    return (
        <div className="venue-container">
            <h2 className="venue-title">Remove Venue</h2>
            {message && <p className="success-message">{message}</p>}
            {venues.length === 0 ? (
                <p className="no-venues">No venues available to remove.</p>
            ) : (
                <ul className="venue-list">
                    {venues.map((venue) => (
                        <li key={venue.id} className="venue-item">
                            <div className="venue-details">
                                <strong>{venue.name}</strong>
                                <p>Location: {venue.location}</p>
                                <p>Price: {venue.price}</p>
                                <p>Capacity: {venue.capacity}</p>
                            </div>
                            <button onClick={() => handleRemove(venue.id)} className="btn-remove">
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RemoveVenue;
