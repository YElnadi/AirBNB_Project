import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadMyBookings } from "../../store/bookings";

const UserBookings = () => {
  const sessionUser = useSelector((state) => state.session.user.id);
  const spot = useSelector((state)=>state.spot)
  const bookings = useSelector((state) => state.bookings.bookings); // Retrieve bookings from Redux store
  console.log("booking", bookings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMyBookings());
  }, [dispatch]);

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
            <p>Start Date: {booking.startDate}</p>
            <p>End Date: {booking.endDate}</p>
          </div>
        ))}
    </div>
  );
};

export default UserBookings;
