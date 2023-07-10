import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadMyBookings } from "../../store/bookings";
import { deleteBookingByIdThunk } from "../../store/bookings";
import { useHistory } from "react-router-dom";
import { getSingleSpotDetails } from "../../store/spots";
import "./User_bookings.css";

const UserBookings = () => {
  const user = useSelector((state)=>state.session.user)
  const bookings = useSelector((state) => state.bookings.bookings); // Retrieve bookings from Redux store
  console.log("user id", user)
  console.log("bookings", bookings);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(loadMyBookings());
  }, [dispatch]);

  const formatDate = (startDate, endDate) => {
    const startOptions = { month: "long", day: "numeric" };
    const endOptions = { day: "numeric" };
    const formattedStartDate = new Date(startDate).toLocaleDateString(
      undefined,
      startOptions
    );
    const formattedEndDate = new Date(endDate).toLocaleDateString(
      undefined,
      endOptions
    );

    return `${formattedStartDate}-${formattedEndDate}, ${new Date(
      endDate
    ).getFullYear()}`;
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

  // const backToSpot = async (spotId) => {
  //   await dispatch(getSingleSpotDetails(spotId)).then(
  //     history.push(`/spots/${spotId}`)
  //   );
  // };

  return (
    <div>
      <h2
        style={{
          fontFamily: "Geneva, Verdana, sans-serif",
          marginLeft: "50px",
        }}
      >
        Trips
      </h2>

      <div className="trips">
        {bookings && bookings.length === 0 ? (<p style={{
          fontFamily: "Geneva, Verdana, sans-serif",
          
        }}>No trips booked...yet!
</p>):(

        
        bookings && bookings.map((booking) => (
          <div key={booking.id} className="trips_data">
            <div>
              <img
                className="user_bookings"
                src={booking.Spot.previewImage}
              ></img>
            </div>
            <div>
              <p>{booking.Spot.city}</p>
              <p>{formatDate(booking.startDate, booking.endDate)}</p>
              <p>
                Total Cost for{" "}
                {calculateNights(booking.startDate, booking.endDate)} nights: $
                {calculateTotalCost(
                  booking.Spot.price,
                  calculateNights(booking.startDate, booking.endDate)
                )}
              </p>
              <button
                className="cancel-booking"
                style={{ cursor: "pointer" }}
                onClick={() => deleteBooking(booking.id)}
              >
                Cancel Booking
              </button>
            </div>
          </div>
        )))}
      </div>
    </div>
  );
};

export default UserBookings;
