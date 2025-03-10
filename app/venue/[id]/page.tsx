

// "use client";
// import { useParams } from "next/navigation";
// import React from "react";


// const mockVenues = [
//   {
//     id: "2",
//     name: "Sunset Banquet",
//     images: [
//       "https://images.unsplash.com/photo-1610561884947-bbc39d2e7536?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
//       "https://images.unsplash.com/photo-1596522354195-e84ae3c98731?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
//     ],
//     description:
//       "A spacious and luxurious banquet hall perfect for weddings, corporate events, and parties.",
//     location: "Los Angeles",
//     availableSlot: "12:00 PM - 4:00 PM",
//     pricing: "$500 per hour",
//     capacity: "500 guests",
//     amenities: "WiFi, AC, Parking, Catering",
//     rating: 4.2,
//   },
//   {
//     id: "1",
//     name: "Grand Palace Hall",
//     images: [
//       "https://images.unsplash.com/photo-1596522354195-e84ae3c98731?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
//       "https://images.unsplash.com/photo-1596522354195-e84ae3c98731?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
//     ],
//     description:
//       "A grand hall with modern amenities, best for corporate events and large gatherings.",
//     location: "New York",
//     availableSlot: "3:00 PM - 7:00 PM",
//     pricing: "$750 per hour",
//     capacity: "700 guests",
//     amenities: "Projector, Catering, Parking, AC",
//     rating: 4.5,
//   },
// ];

// const VenueDetails = () => {
//   const params = useParams();
//   const id = params?.id; // Retrieve the venue ID correctly
//   const venue = mockVenues.find((v) => v.id === id);

//   if (!venue) {
//     return (
//       <h1 className="text-center text-red-500 mt-10 text-2xl font-semibold">
//         Venue not found!
//       </h1>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-lg shadow-md">
//       {/* Venue Name */}
//       <h1 className="venue-name">
//         {venue.name}
//       </h1>

//       {/* Venue Images */}
//       <div className="venue-images grid grid-cols-2 gap-4 mb-6">
//         {venue.images.map((img, index) => (
//           <img
//             key={index}
//             src={img}
//             alt={`Venue ${index + 1}`}
//             className="w-full h-52 object-cover rounded-md shadow-sm"
//           />
//         ))}
//       </div>

//       {/* Venue Details */}
//       <div className="venue-details bg-white p-6 rounded-lg shadow-md">
//         <h2 >Venue Details</h2>
//         <p className="">
//           {venue.description}
//         </p>

//         <div>
//           <p><strong>Location:</strong> {venue.location}</p>
//           <p><strong>Available Slot:</strong> {venue.availableSlot}</p>
//           <p><strong>Pricing:</strong> {venue.pricing}</p>
//           <p><strong>Capacity:</strong> {venue.capacity}</p>
//           <p><strong>Amenities:</strong> {venue.amenities}</p>
//           <p><strong>Rating:</strong> {venue.rating}</p>

//         </div>


//         {/* Book Now Button */}

//         <button className="book-now" >
//           Book Now
//         </button>
//       </div>
//     </div >
//   );
// };

// export default VenueDetails;


"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import BookingForm from "../../../src/components/BookingForm"; // Import BookingForm component

const mockVenues = [
  {
    id: "2",
    name: "Sunset Banquet",
    images: [
      "https://images.unsplash.com/photo-1610561884947-bbc39d2e7536?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1596522354195-e84ae3c98731?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    description:
      "A spacious and luxurious banquet hall perfect for weddings, corporate events, and parties.",
    location: "Los Angeles",
    availableSlot: "12:00 PM - 4:00 PM",
    pricing: "$500 per hour",
    capacity: "500 guests",
    amenities: "WiFi, AC, Parking, Catering",
    rating: 4.2,
  },
  {
    id: "1",
    name: "Grand Palace Hall",
    images: [
      "https://images.unsplash.com/photo-1596522354195-e84ae3c98731?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1596522354195-e84ae3c98731?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    description:
      "A grand hall with modern amenities, best for corporate events and large gatherings.",
    location: "New York",
    availableSlot: "3:00 PM - 7:00 PM",
    pricing: "$750 per hour",
    capacity: "700 guests",
    amenities: "Projector, Catering, Parking, AC",
    rating: 4.5,
  },
];

const VenueDetails = () => {
  const params = useParams();
  const id = params?.id; // Retrieve the venue ID correctly
  const venue = mockVenues.find((v) => v.id === id);
  const [showBookingForm, setShowBookingForm] = useState(false); // State to toggle booking form

  if (!venue) {
    return (
      <h1 className="text-center text-red-500 mt-10 text-2xl font-semibold">
        Venue not found!
      </h1>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-lg shadow-md">
      {/* Venue Name */}
      <h1 className="venue-name">
        {venue.name}
      </h1>

      {/* Venue Images */}
      <div className="venue-images grid grid-cols-2 gap-4 mb-6">
        {venue.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Venue ${index + 1}`}
            className="w-full h-52 object-cover rounded-md shadow-sm"
          />
        ))}
      </div>

      {/* Venue Details */}
      <div className="venue-details bg-white p-6 rounded-lg shadow-md">
        <h2>Venue Details</h2>
        <p>{venue.description}</p>

        <div>
          <p><strong>Location:</strong> {venue.location}</p>
          <p><strong>Available Slot:</strong> {venue.availableSlot}</p>
          <p><strong>Pricing:</strong> {venue.pricing}</p>
          <p><strong>Capacity:</strong> {venue.capacity}</p>
          <p><strong>Amenities:</strong> {venue.amenities}</p>
          <p><strong>Rating:</strong> {venue.rating}</p>
        </div>

        {/* Book Now Button */}
        <button className="book-now" onClick={() => setShowBookingForm(!showBookingForm)}>
          {showBookingForm ? "Close Booking" : "Book Now"}
        </button>

        {/* Conditionally render the booking form */}
        {showBookingForm && <BookingForm venue={venue} />}
      </div>
    </div>
  );
};

export default VenueDetails;
