
"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import AdminNavbar from "@/components/AdminNavbar";

// Define types
interface Venue {
    id: number;
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
    slot: string;
}

// Mock Data
const mockVenues: Venue[] = [
    { id: 1, name: "Grand Hall", location: "City Center", price: "₹2000/hr", capacity: "500" },
    { id: 2, name: "Skyline Auditorium", location: "Downtown", price: "₹3000/hr", capacity: "800" },
];

const mockTimeSlots: TimeSlot[] = [
    { id: 1, venue: "Grand Hall", date: "2025-04-01", slot: "10 am - 12 pm" },
    { id: 2, venue: "Skyline Auditorium", date: "2025-04-02", slot: "2 pm - 5 pm" },
];

const mockReviews: Review[] = [
    { id: 1, venue: "Sunset Ballroom", user: "John Doe", comment: "Amazing experience!", rating: 4.2 },
    { id: 2, venue: "Grand Hall", user: "Jane Smith", comment: "Good venue, but a bit pricey.", rating: 4.0 },
];

const mockBookings: Booking[] = [
    { id: 1, venue: "Banquet Room", date: "2025-04-01", slot: "2 pm - 8 pm" },
    { id: 2, venue: "Grand Hall", date: "2025-03-15", slot: "10 am - 2 pm" },
];

export default function ManagerDashboard() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [venues, setVenues] = useState<Venue[]>(mockVenues);
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(mockTimeSlots);
    const [reviews] = useState<Review[]>(mockReviews);
    const [bookings] = useState<Booking[]>(mockBookings);
    const [formData, setFormData] = useState<Venue>({
        id: 0,
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
        const newVenue = { id: venues.length + 1, ...formData };
        setVenues([...venues, newVenue]);
        alert("Venue added successfully!");
        setFormData({ id: 0, name: "", location: "", price: "", capacity: "", image: "" });
    };

    // Handle Remove Venue
    const handleRemoveVenue = (id: number) => {
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
                                            <TableCell>{booking.slot}</TableCell>
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
