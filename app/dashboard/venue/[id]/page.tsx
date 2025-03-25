
"use client";
import { useParams, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import BookingForm from "../../../../src/components/BookingForm"; // ✅ Correct path to BookingForm
import "../../../../styles/globals.css"; // ✅ Correct path to CSS file

// ✅ Temporary mock data (simulates backend response)
const mockVenues = [
    {
        id: "1",
        name: "Grand Palace Hall",
        images: [
            "https://images.unsplash.com/photo-1596522354195-e84ae3c98731?w=600&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1596522354195-e84ae3c98731?w=600&auto=format&fit=crop&q=60",
        ],
        description: "A grand hall with modern amenities, best for corporate events and large gatherings.",
        location: "New York",
        availableSlots: {

            "2025-03-10": ["10:00 AM - 2:00 PM", "3:00 PM - 6:00 PM"],
            "2025-03-11": ["3:00 PM - 6:00 PM"]

        },
        pricing: "$750 per hour",
        capacity: "700 guests",
        amenities: "Projector, Catering, Parking, AC",
        rating: 4.5,
    },
    {
        id: "2",
        name: "Sunset Banquet",
        images: [
            "https://images.unsplash.com/photo-1610561884947-bbc39d2e7536?w=600&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1596522354195-e84ae3c98731?w=600&auto=format&fit=crop&q=60",
        ],
        description: "A spacious and luxurious banquet hall perfect for weddings, corporate events, and parties.",
        location: "Los Angeles",
        availableSlots: {
            "2025-03-10": ["12:00 PM - 4:00 PM"],
            "2025-03-11": ["5:00 PM - 9:00 PM"],
        },
        pricing: "$500 per hour",
        capacity: "500 guests",
        amenities: "WiFi, AC, Parking, Catering",
        rating: 4.2,
    },
];

const VenueDetails = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const id = params?.id;

    const [venue, setVenue] = useState<null | {
        id: string;
        name: string;
        images: string[];
        description: string;
        location: string;
        availableSlots: Record<string, string[]>;
        pricing: string;
        capacity: string;
        amenities: string;
        rating: number;
    }>(null);

    const [isBookingOpen, setBookingOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(searchParams.get("date") || "No date selected");

    useEffect(() => {
        setSelectedDate(searchParams.get("date") || "No date selected");
    }, [searchParams]);

    // ✅ Simulating API call by fetching from mockVenues
    useEffect(() => {
        if (id) {
            const venueData = mockVenues.find((v) => v.id === id);
            setVenue(venueData || null);

        }
    }, [id]);

    if (!venue) {
        return <h1 className="text-center text-red-500 mt-10 text-2xl font-semibold">Venue not found!</h1>;
    }

    return (
        <div className="venue-container">
            <h1 className="venue-name">{venue.name}</h1>

            <div className="venue-images">
                {venue.images.map((img, index) => (
                    <img key={index} src={img} alt={`Venue ${index + 1}`} />
                ))}
            </div>

            <div className="venue-details">
                <h2>Venue Details</h2>
                <p>{venue.description}</p>
                <p><strong>Location:</strong> {venue.location}</p>
                <p><strong>Available Date:</strong> {selectedDate}</p>
                <p><strong>Available Slots:</strong></p>
                {venue.availableSlots[selectedDate] ? (
                    <ul>
                        {venue.availableSlots[selectedDate].map((slot, index) => (
                            <li key={index}>{slot}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No slots available for this date.</p>
                )}
                <p><strong>Pricing:</strong> {venue.pricing}</p>
                <p><strong>Capacity:</strong> {venue.capacity}</p>
                <p><strong>Amenities:</strong> {venue.amenities}</p>
                <p><strong>Rating:</strong> {venue.rating}</p>
                <button className="book-now" onClick={() => setBookingOpen(true)}>Book Now</button>
            </div>

            {isBookingOpen && (
                <BookingForm venue={venue} selectedDate={selectedDate} closeForm={() => setBookingOpen(false)} />
            )}
        </div>
    );
};

export default VenueDetails;
