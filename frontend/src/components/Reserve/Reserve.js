import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { thunkCreateNewBooking } from "../../store/bookings";

const Reserve = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user.id);
  console.log("user id reserve", sessionUser);
  const { spotId } = useParams();
  //console.log("spotId reserve", spotId);

  const { startDate } = useParams();
  //console.log("startdate reserve", startDate);

  const { endDate } = useParams();
  //console.log("enddate reserve", endDate);

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    const bookingDetails = {
      startDate,
      endDate,
    };
    await dispatch(thunkCreateNewBooking(spotId, bookingDetails, sessionUser));

  };

  return (
    <div className="reserve_container">
      <h1>Request to Book</h1>
      <h2>Your Trip</h2>
      <h3>Dates</h3>
      <p>{startDate}</p>
      <p>{endDate}</p>
      <button onClick={handleConfirmBooking}>Confirm Your Booking</button>
    </div>
  );
};

export default Reserve;
