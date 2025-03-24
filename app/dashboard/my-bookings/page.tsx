// "use client";
// import React from "react";

// const MyBookings = () => {
//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-lg font-bold mb-4">My Bookings</h2>
//             <p>Welcome to your dashboard! Here you can manage your bookings.</p>
//         </div>
//     );
// };

// export default MyBookings;

// "use client";
// import React, { useState, useEffect } from "react";

// interface Booking {
//     id: number;
//     venue: string;
//     date: string;
//     timeSlot: string;
//     status: string;
// }
// // Dummy mock data for past and current bookings
// const mockBookings = [
//     {
//         id: 1,
//         venue: "Grand Palace Hall",
//         date: "2025-03-10",
//         timeSlot: "3:00 PM - 6:00 PM",
//         status: "Upcoming",
//     },
//     {
//         id: 2,
//         venue: "Sunset Banquet",
//         date: "2025-02-12",
//         timeSlot: "12:00 PM - 4:00 PM",
//         status: "Completed",
//     },
//     {
//         id: 3,
//         venue: "City View Hall",
//         date: "2025-04-15",
//         timeSlot: "1:00 PM - 5:00 PM",
//         status: "Upcoming",
//     },
//     {
//         id: 4,
//         venue: "Ocean Breeze Hall",
//         date: "2025-01-05",
//         timeSlot: "10:00 AM - 1:00 PM",
//         status: "Completed",
//     },
// ];

// const MyBookings = () => {
//     const [currentBookings, setCurrentBookings] = useState<Booking[]>([]);
//     const [pastBookings, setPastBookings] = useState<Booking[]>([]);

//     useEffect(() => {
//         // Get today's date to separate current and past bookings
//         const today = new Date().toISOString().split("T")[0];

//         // Split bookings into past and current/upcoming
//         const upcoming = mockBookings.filter((booking) => {
//             const bookingDate = new Date(booking.date);
//             const todayDate = new Date(today);
//             return bookingDate >= todayDate; // ✅ Correctly compares dates
//         });

//         const past = mockBookings.filter((booking) => {
//             const bookingDate = new Date(booking.date);
//             const todayDate = new Date(today);
//             return bookingDate < todayDate; // ✅ Correctly compares past dates
//         });


//         setCurrentBookings(upcoming);
//         setPastBookings(past);
//     }, []);

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

//             {/* Current/Upcoming Bookings */}
//             <section className="mb-8">
//                 <h3 className="text-xl font-semibold mb-2">📅 Upcoming Bookings</h3>
//                 {currentBookings.length > 0 ? (
//                     <div className="booking-list">
//                         {currentBookings.map((booking) => (
//                             <div key={booking.id} className="booking-card">
//                                 <h3 className="font-bold">{booking.venue}</h3>
//                                 <p>Date: {booking.date}</p>
//                                 <p>Time Slot: {booking.timeSlot}</p>
//                                 <p>Status: 🟢 {booking.status}</p>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <p className="text-gray-500">No upcoming bookings.</p>
//                 )}
//             </section>

//             {/* Past/Completed Bookings */}
//             <section>
//                 <h3 className="text-xl font-semibold mb-2">📚 Past Bookings</h3>
//                 {pastBookings.length > 0 ? (
//                     <div className="booking-list">
//                         {pastBookings.map((booking) => (
//                             <div key={booking.id} className="booking-card">
//                                 <h3 className="font-bold">{booking.venue}</h3>
//                                 <p>Date: {booking.date}</p>
//                                 <p>Time Slot: {booking.timeSlot}</p>
//                                 <p>Status: 🔴 {booking.status}</p>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <p className="text-gray-500">No past bookings available.</p>
//                 )}
//             </section>
//         </div>
//     );
// };

// export default MyBookings;

// "use client";
// import React, { useState, useEffect } from "react";

// // Define Booking Type
// interface Booking {
//     id: number;
//     venue: string;
//     date: string;
//     timeSlot: string;
//     status: string;
// }

// // Dummy mock data for past and current bookings
// const mockBookings: Booking[] = [
//     {
//         id: 1,
//         venue: "Grand Palace Hall",
//         date: "2025-03-10",
//         timeSlot: "3:00 PM - 6:00 PM",
//         status: "Upcoming",
//     },
//     {
//         id: 2,
//         venue: "Sunset Banquet",
//         date: "2025-02-12",
//         timeSlot: "12:00 PM - 4:00 PM",
//         status: "Completed",
//     },
//     {
//         id: 3,
//         venue: "City View Hall",
//         date: "2025-04-15",
//         timeSlot: "1:00 PM - 5:00 PM",
//         status: "Upcoming",
//     },
//     {
//         id: 4,
//         venue: "Ocean Breeze Hall",
//         date: "2025-01-05",
//         timeSlot: "10:00 AM - 1:00 PM",
//         status: "Completed",
//     },
// ];

// const MyBookings = () => {
//     const [currentBookings, setCurrentBookings] = useState<Booking[]>([]);
//     const [pastBookings, setPastBookings] = useState<Booking[]>([]);

//     useEffect(() => {
//         // Get today's date correctly formatted
//         const today = new Date().toISOString().split("T")[0];

//         // ✅ Correctly filter upcoming and past bookings
//         const upcoming = mockBookings.filter((booking) => {
//             const bookingDate = new Date(booking.date);
//             const todayDate = new Date(today);
//             return bookingDate >= todayDate;
//         });

//         const past = mockBookings.filter((booking) => {
//             const bookingDate = new Date(booking.date);
//             const todayDate = new Date(today);
//             return bookingDate < todayDate;
//         });

//         setCurrentBookings(upcoming);
//         setPastBookings(past);
//     }, []);

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
//             {/* Current/Upcoming Bookings */}
//             < section className="mb-8" >
//                 <h3 className="text-xl font-semibold mb-2">📅 Upcoming Bookings</h3>
//                 {
//                     currentBookings.length > 0 ? (
//                         <div className="booking-list">
//                             {currentBookings.map((booking) => (
//                                 <div key={booking.id} className="booking-card">
//                                     <h3 className="font-bold">{booking.venue}</h3>
//                                     <p>Date: {booking.date}</p>
//                                     <p>Time Slot: {booking.timeSlot}</p>
//                                     {/* ✅ Correct status for upcoming */}
//                                     <p>Status: 🟢 Upcoming</p>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <p className="text-gray-500">No upcoming bookings.</p>
//                     )
//                 }
//             </section >

//             {/* Past/Completed Bookings */}
//             < section >
//                 <h3 className="text-xl font-semibold mb-2">📚 Past Bookings</h3>
//                 {
//                     pastBookings.length > 0 ? (
//                         <div className="booking-list">
//                             {pastBookings.map((booking) => (
//                                 <div key={booking.id} className="booking-card">
//                                     <h3 className="font-bold">{booking.venue}</h3>
//                                     <p>Date: {booking.date}</p>
//                                     <p>Time Slot: {booking.timeSlot}</p>
//                                     {/* ✅ Correct status for past */}
//                                     <p>Status: 🔴 Completed</p>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <p className="text-gray-500">No past bookings available.</p>
//                     )
//                 }
//             </section >
//         </div >
//     );
// };

// export default MyBookings;

"use client";
import React, { useState, useEffect } from "react";

// Define Booking Type
interface Booking {
    id: number;
    venue: string;
    date: string;
    timeSlot: string;
    status: string;
}

// Dummy mock data for past and current bookings
const mockBookings: Booking[] = [
    {
        id: 1,
        venue: "Grand Palace Hall",
        date: "2025-03-10",
        timeSlot: "3:00 PM - 6:00 PM",
        status: "Upcoming",
    },
    {
        id: 2,
        venue: "Sunset Banquet",
        date: "2025-02-12",
        timeSlot: "12:00 PM - 4:00 PM",
        status: "Completed",
    },
    {
        id: 3,
        venue: "City View Hall",
        date: "2025-04-15",
        timeSlot: "1:00 PM - 5:00 PM",
        status: "Upcoming",
    },
    {
        id: 4,
        venue: "Ocean Breeze Hall",
        date: "2025-01-05",
        timeSlot: "10:00 AM - 1:00 PM",
        status: "Completed",
    },
];

const MyBookings = () => {
    const [currentBookings, setCurrentBookings] = useState<Booking[]>([]);
    const [pastBookings, setPastBookings] = useState<Booking[]>([]);

    useEffect(() => {
        // Get today's date correctly formatted
        const today = new Date().toISOString().split("T")[0];

        // ✅ Correctly filter upcoming and past bookings
        const upcoming = mockBookings.filter((booking) => {
            const bookingDate = new Date(booking.date);
            const todayDate = new Date(today);
            return bookingDate >= todayDate;
        });

        const past = mockBookings.filter((booking) => {
            const bookingDate = new Date(booking.date);
            const todayDate = new Date(today);
            return bookingDate < todayDate;
        });

        setCurrentBookings(upcoming);
        setPastBookings(past);
    }, []);

    return (
        <div className="container" style={{ marginTop: "70px", padding: "16px" }}>
            <h2 className="heading">My Bookings</h2>

            {/* Booking Sections Side by Side */}
            <div className="bookings-container">
                {/* Upcoming Bookings (Left) */}
                <section className="bookings-section">
                    <h3 className="section-heading">📅 Upcoming Bookings</h3>
                    {currentBookings.length > 0 ? (
                        <div className="booking-list">
                            {currentBookings.map((booking) => (
                                <div key={booking.id} className="booking-card">
                                    <h3 className="font-bold">{booking.venue}</h3>
                                    <p>Date: {booking.date}</p>
                                    <p>Time Slot: {booking.timeSlot}</p>
                                    <p>Status: 🟢 Upcoming</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No upcoming bookings.</p>
                    )}
                </section>

                {/* Past Bookings (Right) */}
                <section className="bookings-section">
                    <h3 className="section-heading">📚 Past Bookings</h3>
                    {pastBookings.length > 0 ? (
                        <div className="booking-list">
                            {pastBookings.map((booking) => (
                                <div key={booking.id} className="booking-card">
                                    <h3 className="font-bold">{booking.venue}</h3>
                                    <p>Date: {booking.date}</p>
                                    <p>Time Slot: {booking.timeSlot}</p>
                                    <p>Status: 🔴 Completed</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No past bookings available.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default MyBookings;
