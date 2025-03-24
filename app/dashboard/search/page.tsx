
"use client"
import { useState } from "react";
import Link from "next/link";
import "../../../styles/globals.css";

interface Venue {
    id: number;
    name: string;
    location: string;
    image: string;
    availableSlots: { [date: string]: string | string[] }; // Allow both string and string[]
    availableSlot?: string | string[];
    rating: number;
}


export default function SearchPage() {
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [venues, setVenues] = useState<Venue[] | null>(null);

    const mockVenues: Venue[] = [
        {
            id: 1,
            name: "Grand Palace Hall",
            location: "New York",
            image: "https://images.unsplash.com/photo-1610561884947-bbc39d2e7536?w=600&auto=format&fit=crop&q=60",
            availableSlots: {
                "2025-03-10": ["10:00 AM - 2:00 PM", "3:00 PM - 6:00 PM"],
                "2025-03-11": "3:00 PM - 6:00 PM"
            },
            rating: 4.5
        },
        {
            id: 2,
            name: "Sunset Banquet",
            location: "Los Angeles",
            image: "https://images.unsplash.com/photo-1610561884947-bbc39d2e7536?w=600&auto=format&fit=crop&q=60",
            availableSlots: {
                "2025-03-10": "12:00 PM - 4:00 PM",
                "2025-03-11": "5:00 PM - 9:00 PM"
            },
            rating: 4.2
        }
    ];

    const fetchVenues = () => {
        if (!location || !date) {
            setVenues(null);
            return;
        }

        const filteredVenues = mockVenues
            .filter((venue) =>
                venue.location.toLowerCase().includes(location.toLowerCase()) &&
                venue.availableSlots[date]
            )
            .map((venue) => ({
                ...venue,
                availableSlot: venue.availableSlots[date]
            }));

        setVenues(filteredVenues);
    };

    return (
        <div className="search-page">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="🔍 Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="search-input"
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="search-input"
                />
                <button className="search-btn" onClick={fetchVenues}>
                    Find Venues
                </button>
            </div>

            {venues !== null && (
                venues.length > 0 ? (
                    <>
                        <h2 className="available-venues-title">Available Venues</h2>
                        <div className="venues-grid">
                            {venues.map((venue) => (
                                <div key={venue.id} className="venue-card">
                                    <img src={venue.image} alt={venue.name} className="venue-img" />
                                    <p><strong>Name:</strong> <span className="venue-data">{venue.name}</span></p>
                                    <p><strong>Location:</strong> <span className="venue-data">{venue.location}</span></p>

                                    <p><strong>Available Slot:</strong></p>
                                    <div className="venue-data">
                                        {Array.isArray(venue.availableSlot) ? (
                                            venue.availableSlot.map((slot, index) => (
                                                <p key={index}>{slot}</p> // ✅ Display each slot in a new line
                                            ))
                                        ) : (
                                            <p>{venue.availableSlot}</p> // ✅ Show a single slot normally
                                        )}
                                    </div>


                                    <p><strong>Rating:</strong> <span className="venue-data">⭐ {venue.rating}</span></p>
                                    <Link href={`/venue/${venue.id}?date=${date}`}>
                                        <button className="book-now-btn">
                                            Book Now
                                        </button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="no-venues">No venues available for the selected date and location.</p>
                )
            )}
        </div>
    );
}
