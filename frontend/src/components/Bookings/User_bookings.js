import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadMyBookings } from "../../store/bookings";

const UserBookings = () => {
  
  const bookings = useSelector((state) => state.bookings.bookings); // Retrieve bookings from Redux store
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMyBookings());
  }, [dispatch]);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(date).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  return (
    <div>
      <h2>Your Current Bookings</h2>
      {bookings &&
        bookings.map((booking) => (
          <div key={booking.id}>
            <img
              className="spot-card-image"
              src={booking.Spot.previewImage}
            ></img>
            <h3>Booking ID: {booking.id}</h3>
            <p>Spot Name: {booking.Spot.name}</p>
            <p>Address: {booking.Spot.address}</p>
            <p>City: {booking.Spot.city}</p>
            <p>State: {booking.Spot.state}</p>
            <p>Country: {booking.Spot.country}</p>
            <p>Start Date: {formatDate(booking.startDate)}</p>
            <p>End Date: {formatDate(booking.endDate)}</p>
          </div>
        ))}
    </div>
  );
};

export default UserBookings;
