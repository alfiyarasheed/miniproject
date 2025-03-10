import React, { useState } from "react";
import "../../styles/globals.css"; // Import the CSS file

const BookingForm = ({ venue }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    timeSlot: venue.availableSlot,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Submitted:", formData);
  };

  return (
    <div className="booking-form">
      <h2>Book {venue.name}</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label>Time Slot</label>
        <select
          name="timeSlot"
          value={formData.timeSlot}
          onChange={handleChange}
        >
          <option>{venue.availableSlot}</option>
        </select>

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
