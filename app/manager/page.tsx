
"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import AdminNavbar from "@/components/AdminNavbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

// Define types
interface Venue {
    id: string;
    name: string;
    location: string;
    price: string;
    capacity: string;
    image?: string;
}

interface TimeSlot {
    id: number;
    venue: string;
    date: string;
    slot: string;
}

interface Review {
    id: number;
    venue: string;
    user: string;
    comment: string;
    rating: number;
}

interface Booking {
    id: number;
    venue: string;
    date: string;
    timeSlots: [];
}

// Mock Data
const mockVenues: Venue[] = [
    { id: "1", name: "Sunset Banquet", location: "Los Angeles", price: "$500 per hour", capacity: "500" },

];

const mockTimeSlots: TimeSlot[] = [
    { id: 1, venue: "Sunset Banquet", date: "2025-03-10", slot: "12 am - 4 pm" },
    { id: 2, venue: "Sunset Banquet", date: "2025-03-10", slot: "10 am - 12 pm" }

];

const mockReviews: Review[] = [
    { id: 1, venue: "Sunset Ballroom", user: "John Doe", comment: "Amazing experience!", rating: 4.2 },
    { id: 2, venue: "Grand Hall", user: "Jane Smith", comment: "Good venue, but a bit pricey.", rating: 4.0 },
];


export default function ManagerDashboard() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [venues, setVenues] = useState<Venue[]>(mockVenues);
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(mockTimeSlots);
    const [reviews] = useState<Review[]>(mockReviews);
    const [bookings, setBooking] = useState<Booking[]>([]);
    const [formData, setFormData] = useState<Venue>({
        id: "0",
        name: "",
        location: "",
        price: "",
        capacity: "",
        image: "",
    });
    const [editVenue, setEditVenue] = useState<Venue | null>(null);
    const [showAction, setShowAction] = useState<"add" | "remove" | "edit" | null>(null);
    const [newSlot, setNewSlot] = useState<TimeSlot>({
        id: 0,
        venue: "",
        date: "",
        slot: "",
    });

    const router = useRouter();
    useEffect(() => {
        const bk = localStorage.getItem("booked");
        //console.log(bk)
        const mockBookings = JSON.parse(bk || "[]") as Booking;
        console.log(mockBookings)
        setBooking([mockBookings]);
        console.log(bookings)
        async function getData() {
            const vdata = (await getDocs(collection(db, "reviews"))).docs;

            const dt = vdata.map((doc) => {
                return { id: doc.id, ...doc.data() } as Venue;
            })
            setVenues(dt);
        }
        getData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        router.push("/");
    };

    // Handle input changes for Add/Edit Venue form
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle image upload
    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const imageUrl = URL.createObjectURL(e.target.files[0]);
            setFormData({ ...formData, image: imageUrl });
        }
    };

    // Handle Add Venue
    const handleAddVenue = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newVenue = { ...formData, id: `${venues.length + 1}` };
        setVenues([...venues, newVenue]);
        alert("Venue added successfully!");
        setFormData({ id: "0", name: "", location: "", price: "", capacity: "", image: "" });
    };

    // Handle Remove Venue
    const handleRemoveVenue = (id: string) => {
        setVenues(venues.filter((venue) => venue.id !== id));
        alert("Venue removed successfully!");
    };

    // Handle Edit Venue Click
    const handleEditClick = (venue: Venue) => {
        setEditVenue(venue);
        setFormData({ ...venue });
        setShowAction("edit");
    };

    // Handle Update Venue
    const handleUpdateVenue = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editVenue) {
            setVenues(venues.map((v) => (v.id === editVenue.id ? { ...formData } : v)));
            alert("Venue updated successfully!");
            setEditVenue(null);
            setShowAction(null);
        }
    };

    // Handle Slot Changes
    const handleSlotChange = (id: number, name: string, value: string) => {
        const updatedSlots = timeSlots.map((slot) =>
            slot.id === id ? { ...slot, [name]: value } : slot
        );
        setTimeSlots(updatedSlots);
    };

    // Save Updated Slot
    const handleSaveSlot = (id: number) => {
        alert(`Time slot with ID ${id} updated successfully!`);
    };

    // Handle Delete Slot
    const handleDeleteSlot = (id: number) => {
        const updatedSlots = timeSlots.filter((slot) => slot.id !== id);
        setTimeSlots(updatedSlots);
        alert(`Time slot with ID ${id} deleted successfully!`);
    };

    // Handle New Slot Changes
    const handleNewSlotChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewSlot({ ...newSlot, [name]: value });
    };

    // Add New Time Slot
    const handleAddSlot = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newSlotData = { ...newSlot, id: timeSlots.length + 1 };
        setTimeSlots([...timeSlots, newSlotData]);
        alert("New time slot added successfully!");
        setNewSlot({ id: 0, venue: "", date: "", slot: "" });
    };

    return (
        <div className="admin-dashboard">
            <AdminNavbar />
            <aside className="sidebar">
                <Button onClick={() => setActiveTab("dashboard")}>Dashboard</Button>
                <Button onClick={() => setActiveTab("manageVenue")}>Manage Venue</Button>
                <Button onClick={() => setActiveTab("slots")}>Manage Time Slots</Button>
                <Button onClick={() => setActiveTab("reviews")}>View Reviews</Button>
                <Button onClick={() => setActiveTab("bookings")}>View Bookings</Button>
                <Button onClick={handleLogout}>Logout</Button>
            </aside>

            <main className="content">
                {/* Dashboard Overview */}
                {activeTab === "dashboard" && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Manager Dashboard</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Welcome to the manager panel! Manage venues, time slots, bookings, and reviews.</p>
                        </CardContent>
                    </Card>
                )}
                {/* Manage Venue Section */}
                {activeTab === "manageVenue" && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Venue</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="button-group mb-4">
                                <Button onClick={() => setShowAction("add")} className="btn-add">Add Venue</Button>
                                <Button onClick={() => setShowAction("remove")} className="btn-remove">Remove Venue</Button>
                                <Button onClick={() => setShowAction("edit")} className="btn-edit">Edit Venue</Button>
                            </div>

                            {/* Add Venue Form */}
                            {showAction === "add" && (
                                <form onSubmit={handleAddVenue} className="venue-form space-y-4">
                                    <label>Venue Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                                    <label>Location</label>
                                    <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                                    <label>Price Per Hour</label>
                                    <input type="text" name="price" value={formData.price} onChange={handleChange} required />
                                    <label>Capacity</label>
                                    <input type="text" name="capacity" value={formData.capacity} onChange={handleChange} required />
                                    <label>Venue Image</label>
                                    <input type="file" name="image" accept="image/*" onChange={handleImageUpload} />
                                    <Button type="submit" className="btn-submit">Add Venue</Button>
                                </form>
                            )}

                            {/* Remove Venue Section */}
                            {showAction === "remove" &&
                                venues.map((venue) => (
                                    <div key={venue.id} className="p-4 border rounded-lg shadow mb-4">
                                        <p>
                                            <strong>{venue.name}</strong> - {venue.location}
                                        </p>
                                        <Button onClick={() => handleRemoveVenue(venue.id)} className="btn-remove">Remove</Button>
                                    </div>
                                ))}

                            {/* Edit Venue Section */}
                            {showAction === "edit" &&
                                venues.map((venue) => (
                                    <div key={venue.id} className="p-4 border rounded-lg shadow mb-4">
                                        <p>
                                            <strong>{venue.name}</strong> - {venue.location}
                                        </p>
                                        <Button onClick={() => handleEditClick(venue)} className="btn-edit">Edit</Button>
                                    </div>
                                ))}

                            {/* Edit Venue Form */}
                            {showAction === "edit" && editVenue && (
                                <form onSubmit={handleUpdateVenue} className="venue-form space-y-4">
                                    <label>Venue Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                                    <label>Location</label>
                                    <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                                    <label>Price Per Hour</label>
                                    <input type="text" name="price" value={formData.price} onChange={handleChange} required />
                                    <label>Capacity</label>
                                    <input type="text" name="capacity" value={formData.capacity} onChange={handleChange} required />
                                    <label>Venue Image</label>
                                    <input type="file" name="image" accept="image/*" onChange={handleImageUpload} />
                                    <Button type="submit" className="btn-submit">Update Venue</Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                )}


                {/* Manage Time Slots */}
                {activeTab === "slots" && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Time Slots</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableCell>Venue</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Slot</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {timeSlots.map((slot) => (
                                        <TableRow key={slot.id}>
                                            <TableCell>
                                                <input
                                                    type="text"
                                                    value={slot.venue}
                                                    onChange={(e) => handleSlotChange(slot.id, "venue", e.target.value)}
                                                    className="input-field"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <input
                                                    type="date"
                                                    value={slot.date}
                                                    onChange={(e) => handleSlotChange(slot.id, "date", e.target.value)}
                                                    className="input-field"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <input
                                                    type="text"
                                                    value={slot.slot}
                                                    onChange={(e) => handleSlotChange(slot.id, "slot", e.target.value)}
                                                    className="input-field"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleSaveSlot(slot.id)} className="btn-add">Save</Button>
                                                <Button onClick={() => handleDeleteSlot(slot.id)} className="btn-remove ml-2">
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {/* Add New Slot Form */}
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold mb-4">Add New Time Slot</h3>
                                <form onSubmit={handleAddSlot} className="venue-form space-y-4">
                                    <label>Venue</label>
                                    <input
                                        type="text"
                                        name="venue"
                                        value={newSlot.venue}
                                        onChange={handleNewSlotChange}
                                        className="input-field"
                                        required
                                    />
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={newSlot.date}
                                        onChange={handleNewSlotChange}
                                        className="input-field"
                                        required
                                    />
                                    <label>Slot</label>
                                    <input
                                        type="text"
                                        name="slot"
                                        value={newSlot.slot}
                                        onChange={handleNewSlotChange}
                                        className="input-field"
                                        required
                                    />
                                    <Button type="submit" className="btn-submit">
                                        Add Slot
                                    </Button>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* View Reviews */}
                {activeTab === "reviews" && (
                    <Card>
                        <CardHeader>
                            <CardTitle>View Reviews</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableCell>Venue</TableCell>
                                        <TableCell>User</TableCell>
                                        <TableCell>Review</TableCell>
                                        <TableCell>Rating</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {reviews.map((review) => (
                                        <TableRow key={review.id}>
                                            <TableCell>{review.venue}</TableCell>
                                            <TableCell>{review.user}</TableCell>
                                            <TableCell>{review.comment}</TableCell>
                                            <TableCell>{review.rating}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}

                {/* View Bookings */}
                {activeTab === "bookings" && (
                    <Card>
                        <CardHeader>
                            <CardTitle>View Bookings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableCell>Venue</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Slot</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bookings.map((booking) => (
                                        <TableRow key={booking.id}>
                                            <TableCell>{booking.venue}</TableCell>
                                            <TableCell>{booking.date}</TableCell>
                                            <TableCell>{booking.timeSlots}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div >
    );
}


// "use client"
// import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
// import { BarChart, Users, Calendar, Building2, Star } from "lucide-react";
// import { useRouter } from "next/navigation";
// import AdminNavbar from "@/components/AdminNavbar";
// import { db } from "@/firebase";
// import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from "firebase/firestore";

// // Define types
// interface Venue {
//     id: string;
//     name: string;
//     location: string;
//     price: string;
//     capacity: string;
//     image?: string;
// }

// const ManagerDashboard = () => {
//     const [activeTab, setActiveTab] = useState("dashboard");
//     const [venues, setVenues] = useState<Venue[]>([]);
//     const [showAction, setShowAction] = useState<"add" | "remove" | "edit" | null>(null);
//     const [formData, setFormData] = useState({
//         name: "",
//         location: "",
//         price: "",
//         capacity: "",
//         image: "",
//     });
//     const [editVenue, setEditVenue] = useState<Venue | null>(null);
//     const router = useRouter();

//     // Fetch venues from Firestore
//     useEffect(() => {
//         const fetchVenues = async () => {
//             const venueSnapshot = await getDocs(collection(db, "venues"));
//             const venueList = venueSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Venue));
//             setVenues(venueList);
//         };
//         fetchVenues();
//     }, []);

//     // Handle input changes for Add/Edit Venue form
//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     // Handle Add Venue
//     const handleAddVenue = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         try {
//             const docRef = await addDoc(collection(db, "venues"), formData);
//             setVenues([...venues, { id: docRef.id, ...formData }]);
//             alert("Venue added successfully!");
//             setFormData({ name: "", location: "", price: "", capacity: "", image: "" });
//         } catch (error) {
//             console.error("Error adding venue: ", error);
//         }
//     };

//     // Handle Remove Venue
//     const handleRemoveVenue = async (id: string) => {
//         try {
//             await deleteDoc(doc(db, "venues", id));
//             setVenues(venues.filter((venue) => venue.id !== id));
//             alert("Venue removed successfully!");
//         } catch (error) {
//             console.error("Error removing venue: ", error);
//         }
//     };

//     // Handle Edit Venue Click
//     const handleEditClick = (venue: Venue) => {
//         setEditVenue(venue);
//         setShowAction("edit");
//         setFormData({
//             name: venue.name,
//             location: venue.location,
//             price: venue.price,
//             capacity: venue.capacity,
//             image: venue.image || "",
//         });
//     };

//     // Handle Update Venue
//     const handleUpdateVenue = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (editVenue) {
//             try {
//                 await updateDoc(doc(db, "venues", editVenue.id), formData);
//                 setVenues(venues.map((v) => (v.id === editVenue.id ? { ...formData, id: v.id } : v)));
//                 alert("Venue updated successfully!");
//                 setEditVenue(null);
//                 setShowAction(null);
//             } catch (error) {
//                 console.error("Error updating venue: ", error);
//             }
//         }
//     };

//     return (
//         <div className="admin-dashboard">
//             <AdminNavbar />
//             <aside className="sidebar">
//                 <Button onClick={() => setActiveTab("dashboard")} className={activeTab === "dashboard" ? "active" : ""}>
//                     <BarChart /> Dashboard
//                 </Button>
//                 <Button onClick={() => setActiveTab("manageVenue")} className={activeTab === "manageVenue" ? "active" : ""}>
//                     <Building2 /> Manage Venue
//                 </Button>
//                 <Button onClick={() => setActiveTab("slots")} className={activeTab === "slots" ? "active" : ""}>
//                     <Calendar /> Manage Time Slots
//                 </Button>
//                 <Button onClick={() => setActiveTab("reviews")} className={activeTab === "reviews" ? "active" : ""}>
//                     <Star /> View Reviews
//                 </Button>
//                 <Button onClick={() => setActiveTab("bookings")} className={activeTab === "bookings" ? "active" : ""}>
//                     <Users /> View Bookings
//                 </Button>
//                 <Button onClick={() => router.push("/")} className="logout-button">
//                     Logout
//                 </Button>
//             </aside>

//             <main className="content">
//                 {activeTab === "dashboard" && (
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Manager Dashboard</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <p>Welcome to the manager panel! Manage venues, time slots, bookings, and reviews.</p>
//                         </CardContent>
//                     </Card>
//                 )}
//                 {activeTab === "manageVenue" && (
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Manage Venue</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="button-group mb-4">
//                                 <Button onClick={() => setShowAction("add")} className="btn-add">
//                                     Add Venue
//                                 </Button>
//                             </div>
//                             {showAction === "add" && (
//                                 <form onSubmit={handleAddVenue} className="venue-form space-y-4">
//                                     <label>Venue Name</label>
//                                     <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//                                     <label>Location</label>
//                                     <input type="text" name="location" value={formData.location} onChange={handleChange} required />
//                                     <label>Price Per Hour</label>
//                                     <input type="text" name="price" value={formData.price} onChange={handleChange} required />
//                                     <label>Capacity</label>
//                                     <input type="text" name="capacity" value={formData.capacity} onChange={handleChange} required />
//                                     <label>Venue Image</label>
//                                     <input type="text" name="image" value={formData.image} onChange={handleChange} />
//                                     <Button type="submit">Add Venue</Button>
//                                 </form>
//                             )}
//                             {venues.map((venue) => (
//                                 <div key={venue.id} className="venue-item">
//                                     <p>
//                                         {venue.name} - {venue.location}
//                                     </p>
//                                     <Button onClick={() => handleRemoveVenue(venue.id)} className="btn-remove">
//                                         Remove
//                                     </Button>
//                                     <Button onClick={() => handleEditClick(venue)} className="btn-edit">
//                                         Edit
//                                     </Button>
//                                 </div>
//                             ))}
//                             {showAction === "edit" && (
//                                 <form onSubmit={handleUpdateVenue} className="venue-form space-y-4">
//                                     <label>Venue Name</label>
//                                     <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//                                     <label>Location</label>
//                                     <input type="text" name="location" value={formData.location} onChange={handleChange} required />
//                                     <label>Price Per Hour</label>
//                                     <input type="text" name="price" value={formData.price} onChange={handleChange} required />
//                                     <label>Capacity</label>
//                                     <input type="text" name="capacity" value={formData.capacity} onChange={handleChange} required />
//                                     <label>Venue Image</label>
//                                     <input type="text" name="image" value={formData.image} onChange={handleChange} />
//                                     <Button type="submit">Update Venue</Button>
//                                 </form>
//                             )}
//                         </CardContent>
//                     </Card>
//                 )}
//             </main>
//         </div>
//     );
// };

// export default ManagerDashboard;
