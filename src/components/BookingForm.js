"use client";
import React, { useState } from "react";
import "../../styles/globals.css";

const BookingForm = ({ venue, selectedDate, closeForm }) => {
  const [formData, setFormData] = useState({
    guests: "",
    date: selectedDate || "",
    timeSlots: [],
  });

  const [errors, setErrors] = useState({
    guests: "",
    timeSlots: "",
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "timeSlots") {
      let updatedSlots = [...formData.timeSlots];

      if (checked) {
        updatedSlots.push(value);
      } else {
        updatedSlots = updatedSlots.filter((slot) => slot !== value);
      }

      setFormData({ ...formData, timeSlots: updatedSlots });
    } else {
      let updatedValue = value;

      if (name === "guests") {
        updatedValue = value === "" ? "" : parseInt(value, 10); // ✅ Convert to number

        if (!updatedValue || updatedValue < 15) {
          setErrors((prev) => ({
            ...prev,
            guests: "⚠ Minimum 15 guests required.",
          }));
        } else if (updatedValue > parseInt(venue.capacity, 10)) {
          setErrors((prev) => ({
            ...prev,
            guests: `⚠ Maximum ${venue.capacity} guests allowed.`,
          }));
        } else {
          setErrors((prev) => ({ ...prev, guests: "" })); // ✅ Clear error if valid
        }
      }

      setFormData({ ...formData, [name]: updatedValue });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = { guests: "", timeSlots: "" };

    // ✅ Convert guests to number for correct validation
    const numGuests = parseInt(formData.guests, 10);
    if (!numGuests || numGuests < 15) {
      newErrors.guests = "⚠ Minimum 15 guests required.";
    } else if (numGuests > parseInt(venue.capacity, 10)) {
      newErrors.guests = `⚠ Maximum ${venue.capacity} guests allowed.`;
    }

    // ✅ Validate time slot selection
    if (!formData.timeSlots || formData.timeSlots.length === 0) {
      newErrors.timeSlots = "⚠ Please select at least one time slot.";
    }

    // ✅ If errors exist, prevent form submission
    if (newErrors.guests || newErrors.timeSlots) {
      setErrors(newErrors);
      return;
    }

    console.log("Booking Submitted:", formData);
    alert("Booking confirmed! A confirmation email has been sent.");
    closeForm();
  };

  return (
    <div className="overlay">
      <div className="booking-form-container">
        <h2>Book the Venue</h2>
        <form onSubmit={handleSubmit}>
          <label>Number of Guests</label>
          <input
            type="number"
            name="guests"
            placeholder="Enter number of guests"
            value={formData.guests}
            onChange={handleChange}
            min="15"
            max={venue.capacity}
            required
          />
          {errors.guests && <p className="error-message">{errors.guests}</p>}

          <label>Date</label>
          <input type="text" name="date" value={formData.date} readOnly />

          <label>Available Time Slots</label>
          <div className="time-slot-options">
            {venue.availableSlots[selectedDate]?.length > 0 ? (
              venue.availableSlots[selectedDate].map((slot, index) => (
                <div key={index} className="time-slot-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="timeSlots"
                      value={slot}
                      checked={formData.timeSlots.includes(slot)}
                      onChange={handleChange}
                    />
                    {slot}
                  </label>
                </div>
              ))
            ) : (
              <p>No available slots</p>
            )}
          </div>
          {errors.timeSlots && (
            <p className="error-message">{errors.timeSlots}</p>
          )}

          <div className="button-group">
            <button type="submit" className="proceed-booking">
              Proceed Booking
            </button>
            <button type="button" className="cancel" onClick={closeForm}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
