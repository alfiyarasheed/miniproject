"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import "../../../styles/globals.css"
// Define types for form data
interface VenueData {
    name: string;
    location: string;
    price: string;
    capacity: string;
    amenities: string;
    images: File[];
}

const AddVenue = () => {
    const [formData, setFormData] = useState<VenueData>({
        name: "",
        location: "",
        price: "",
        capacity: "",
        amenities: "",
        images: [],
    });

    const [showForm, setShowForm] = useState<boolean>(false);

    // Handle input change
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle image upload
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setFormData({ ...formData, images: files });
        }
    };

    // Handle form submission
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Venue added successfully!");
        console.log(formData); // For backend integration
    };

    return (
        <div className="venue-container">
            <h2 className="venue-title">Add/Remove Venues</h2>
            <div className="venue-actions">
                <button onClick={() => setShowForm(true)} className="btn-add">
                    Add Venue
                </button>
                {/* <button
                    onClick={() => (window.location.href = "/manager-dashboard/remove-venue")}
                    className="btn-remove"
                >
                    Remove Venue
                </button> */}


                <button
                    onClick={() => setShowForm(false)} // Hide form and show remove section
                    className="btn-remove"
                >
                    Remove Venue
                </button>

            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="venue-form">
                    <h3 className="form-title">Add Venue</h3>
                    <input
                        type="text"
                        name="name"
                        placeholder="Venue Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price Per Hour"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="capacity"
                        placeholder="Capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="amenities"
                        placeholder="Other Amenities"
                        value={formData.amenities}
                        onChange={handleChange}
                    />
                    <input
                        type="file"
                        name="images"
                        multiple
                        onChange={handleFileChange}
                        required
                    />
                    <button type="submit" className="btn-submit">
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
};

export default AddVenue;
