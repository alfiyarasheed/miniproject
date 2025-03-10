// "use client";

// import { useState } from "react";
// import "../../styles/globals.css"; // Import global styles

// interface Venue {
//     id: number;
//     name: string;
//     location: string;
//     image: string;
//     availableSlots: { [date: string]: string }; // Slots based on date
//     rating: number;
// }

// export default function SearchPage() {
//     const [location, setLocation] = useState("");
//     const [date, setDate] = useState("");
//     const [venues, setVenues] = useState<Venue[] | null>(null); // Null initially

//     const mockVenues: Venue[] = [
//         {
//             id: 1,
//             name: "Grand Palace Hall",
//             location: "New York",
//             image: "https://images.unsplash.com/photo-1610561884947-bbc39d2e7536?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2VtaW5hciUyMGhhbGx8ZW58MHx8MHx8fDA%3D",
//             availableSlots: {
//                 "2025-03-10": "10:00 AM - 2:00 PM",
//                 "2025-03-11": "3:00 PM - 6:00 PM"
//             },
//             rating: 4.5
//         },
//         {
//             id: 2,
//             name: "Sunset Banquet",
//             location: "Los Angeles",
//             image: "https://images.unsplash.com/photo-1610561884947-bbc39d2e7536?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2VtaW5hciUyMGhhbGx8ZW58MHx8MHx8fDA%3D",
//             availableSlots: {
//                 "2025-03-10": "12:00 PM - 4:00 PM",
//                 "2025-03-11": "5:00 PM - 9:00 PM"
//             },
//             rating: 4.2
//         },
//         {
//             id: 3,
//             name: "Sunset Banquet",
//             location: "Los Angeles",
//             image: "https://images.unsplash.com/photo-1610561884947-bbc39d2e7536?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2VtaW5hciUyMGhhbGx8ZW58MHx8MHx8fDA%3D",
//             availableSlots: {
//                 "2025-03-10": "12:00 PM - 4:00 PM",
//                 "2025-03-11": "5:00 PM - 9:00 PM"
//             },
//             rating: 4.2
//         },
//         {
//             id: 4,
//             name: "Sunset Banquet",
//             location: "Los Angeles",
//             image: "https://images.unsplash.com/photo-1610561884947-bbc39d2e7536?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2VtaW5hciUyMGhhbGx8ZW58MHx8MHx8fDA%3D",
//             availableSlots: {
//                 "2025-03-10": "12:00 PM - 4:00 PM",
//                 "2025-03-11": "5:00 PM - 9:00 PM"
//             },
//             rating: 4.2
//         },
//         {
//             id: 5,
//             name: "Sunset Banquet",
//             location: "Los Angeles",
//             image: "https://images.unsplash.com/photo-1610561884947-bbc39d2e7536?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2VtaW5hciUyMGhhbGx8ZW58MHx8MHx8fDA%3D",
//             availableSlots: {
//                 "2025-03-10": "12:00 PM - 4:00 PM",
//                 "2025-03-11": "5:00 PM - 9:00 PM"
//             },
//             rating: 4.2
//         },
//     ];

//     const fetchVenues = () => {
//         if (!location || !date) {
//             setVenues(null); // Do not show "No venues available" message
//             return;
//         }

//         // Filter venues that match the location and have available slots for the given date
//         const filteredVenues = mockVenues
//             .filter((venue) =>
//                 venue.location.toLowerCase().includes(location.toLowerCase()) &&
//                 venue.availableSlots[date] // Ensures the venue has a slot for the selected date
//             )
//             .map((venue) => ({
//                 ...venue,
//                 availableSlot: venue.availableSlots[date]
//             }));

//         setVenues(filteredVenues);
//     };

//     return (
//         <div className="search-page">
//             {/* Search Section */}
//             <div className="search-container">
//                 <input
//                     type="text"
//                     placeholder="🔍 Enter location"
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                     className="search-input"
//                 />
//                 <input
//                     type="date"
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                     className="search-input"
//                 />
//                 <button className="search-btn" onClick={fetchVenues}>
//                     Find Venues
//                 </button>
//             </div>

//             {/* Available Venues Section */}
//             {venues !== null && (
//                 venues.length > 0 ? (
//                     <>
//                         <h2 className="available-venues-title">Available Venues</h2>
//                         <div className="venues-grid">

//                             {venues.map((venue) => (
//                                 <div key={venue.id} className="venue-card">
//                                     <img src={venue.image} alt={venue.name} className="venue-img" />
//                                     <p><strong>Name:</strong> <span className="venue-data">{venue.name}</span></p>
//                                     <p><strong>Location:</strong> <span className="venue-data">{venue.location}</span></p>
//                                     <p><strong>Available Slot:</strong> <span className="venue-data">{venue.availableSlots}</span></p>
//                                     <p><strong>Rating:</strong> <span className="venue-data">⭐ {venue.rating}</span></p>
//                                     <button className="book-now-btn">Book Now</button>
//                                 </div>
//                             ))}
//                         </div>
//                     </>
//                 ) : (
//                     <p className="no-venues">No venues available for the selected date and location.</p>
//                 )
//             )}
//         </div>
//     );
// }

"use client";

import { useState } from "react"; // Ensure React is imported
import Link from "next/link"; // Import Link for navigation
import "../../styles/globals.css"; // Import global styles

interface Venue {
    id: number;
    name: string;
    location: string;
    image: string;
    availableSlots: { [date: string]: string };
    availableSlot?: string; // Add this to fix the issue
    rating: number;
}


export default function SearchPage() {
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [venues, setVenues] = useState<Venue[] | null>(null); // Null initially

    const mockVenues: Venue[] = [
        {
            id: 1,
            name: "Grand Palace Hall",
            location: "New York",
            image: "https://images.unsplash.com/photo-1610561884947-bbc39d2e7536?w=600&auto=format&fit=crop&q=60",
            availableSlots: {
                "2025-03-10": "10:00 AM - 2:00 PM",
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
            setVenues(null); // Do not show "No venues available" message
            return;
        }

        // Filter venues that match the location and have available slots for the given date
        const filteredVenues = mockVenues
            .filter((venue) =>
                venue.location.toLowerCase().includes(location.toLowerCase()) &&
                venue.availableSlots[date] // Ensures the venue has a slot for the selected date
            )
            .map((venue) => ({
                ...venue,
                availableSlot: venue.availableSlots[date]
            }));

        setVenues(filteredVenues);
    };

    return (
        <div className="search-page">
            {/* Search Section */}
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

            {/* Available Venues Section */}
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
                                    <p><strong>Available Slot:</strong> <span className="venue-data">{venue.availableSlot}</span></p>
                                    <p><strong>Rating:</strong> <span className="venue-data">⭐ {venue.rating}</span></p>
                                    <Link href={`/venue/${venue.id}`}>
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
