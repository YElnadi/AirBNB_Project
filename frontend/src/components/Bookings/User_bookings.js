import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadMyBookings } from "../../store/bookings";
import { deleteBookingByIdThunk } from "../../store/bookings";

const UserBookings = () => {
  const bookings = useSelector((state) => state.bookings.bookings); // Retrieve bookings from Redux store
  console.log("bookings", bookings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMyBookings());
  }, [dispatch]);

  const formatDate = (startDate, endDate) => {
    const startOptions = { month: "long", day: "numeric" };
    const endOptions = { day: "numeric" };
    const formattedStartDate = new Date(startDate).toLocaleDateString(undefined, startOptions);
    const formattedEndDate = new Date(endDate).toLocaleDateString(undefined, endOptions);
  
    return `${formattedStartDate}-${formattedEndDate}, ${new Date(endDate).getFullYear()}`;
  };
  
  const calculateNights = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    const numberOfNights = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return numberOfNights;
  };

  const calculateTotalCost = (price, numberOfNights) => {
    const totalCost = price * numberOfNights;
    return totalCost;
  };

  const deleteBooking = async (bookingId) => {
    await dispatch(deleteBookingByIdThunk(bookingId));
    dispatch(loadMyBookings());
  };

  return (
    <div>
      <h2 style={{fontFamily:'Geneva, Verdana, sans-serif'}}>Trips</h2>
      {bookings &&
        bookings.map((booking) => (
          <div key={booking.id}>
            <h3 style={{fontFamily:'Geneva, Verdana, sans-serif'}}>{booking.Spot.name}</h3>
            <img
              className="user_bookings"
              src={booking.Spot.previewImage}
            ></img>
            {/* <h3>Booking ID: {booking.id}</h3> */}
            {/* <p>Address: {booking.Spot.address}</p> */}
            <p>{booking.Spot.city}</p>
            {/* <p>State: {booking.Spot.state}</p>
            <p>Country: {booking.Spot.country}</p> */}
            <p>Date: {formatDate(booking.startDate, booking.endDate)}</p>
            {/* <p>Start Date: {formatDate(booking.startDate)}</p>
            <p>End Date: {formatDate(booking.endDate)}</p> */}
            <p>
              Total Cost for{" "}
              {calculateNights(booking.startDate, booking.endDate)} nights: $
              {calculateTotalCost(
                booking.Spot.price,
                calculateNights(booking.startDate, booking.endDate)
              )}
            </p>
            <button onClick={() => deleteBooking(booking.id)}>
              Cancel Booking
            </button>
          </div>
        ))}
    </div>
  );
};

export default UserBookings;
