import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBookingsForCurrentUser } from '../../store/bookings';

const UserBookings = () => {
  const sessionUser = useSelector(state => state.session.user.id);
  const bookings = useSelector(state => state.bookings); // Retrieve bookings from Redux store
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBookingsForCurrentUser(sessionUser));
  }, [dispatch, sessionUser]);

  return (
    <div>
      <h2>Your Current Bookings</h2>
      {/* {bookings && bookings.map(booking => (
        <div key={booking.id}>
          <h3>Booking ID: {booking.id}</h3>
          <p>Spot Name: {booking.Spot.name}</p>
          <p>Address: {booking.Spot.address}</p>
          <p>City: {booking.Spot.city}</p>
          <p>State: {booking.Spot.state}</p>
          <p>Country: {booking.Spot.country}</p>
          <p>Start Date: {booking.startDate}</p>
          <p>End Date: {booking.endDate}</p>
        </div>
      ))} */}
    </div>
  );
};

export default UserBookings;