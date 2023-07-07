import React from "react";
import { useEffect, useState, useRef } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  thunkCreateNewBooking,
  thunkUpdateBooking,
} from "../../store/bookings";
import SearchDate from "../SearchDate";
import { useModal } from "../../context/Modal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import "./Reserve.css"

const Reserve = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user.id);
  const spot = useSelector((state) => state.spots.singleSpot);
  console.log("spott in reserve", spot);
  //const bookingId = useSelector(state => state.bookings.booking.id)
  // console.log('booking id reserve', bookingId)
  // console.log('user id reserve', sessionUser)
  const { spotId } = useParams();
  console.log("spotId reserve", spotId);

  const { startDate } = useParams();
  console.log("startdate reserve", startDate); //06-03-2027
  const { endDate } = useParams();

  const startDay = new Date(startDate).getDate();
  console.log("startDay#####", startDay);
  const endDay = new Date(endDate).getDate();

  const total = (endDay - startDay + 1) * spot.price;

  ///////////////////////Modal//////////////
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);
  const closeMenu = () => setShowMenu(false);
  /////////////////////////////////////////////////

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    const bookingDetails = {
      startDate,
      endDate,
    };
    try {
      let newBooking = await dispatch(
        thunkCreateNewBooking(spotId, bookingDetails, sessionUser)
      );

      if (newBooking) {
        window.alert("Congrats");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { message, errors } = error.response.data;
        const errorMessage = message || "An error occurred";
        setError(errorMessage);
        console.log("errorrrrrr", errorMessage);

        if (errors) {
          // Handle specific errors
          console.error("Errors:", errors);
        }
      } else {
        setError("An error occurred");
      }
    }
  };

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

  return (
    <div>
      {/* {error && <p className="error-message">{error}</p>} */}
      <div >
        <div className='res_container'>
          <NavLink exact to={`/spots/${spotId}`}>
            <i className="fa-solid fa-chevron-left icon"></i>
          </NavLink>
          <h1 style={{fontFamily: "Geneva, Verdana, sans-serif"}}>Request to Book</h1>
        </div>
      </div>
      <h2 style={{marginLeft:'80px', fontFamily: "Geneva, Verdana, sans-serif"}}>Your Trip</h2>
      <div>
        {/* {spot && spot.SpotImages.length > 0 && (
          <div>
            <img
              className="user_bookings"
              src={spot.SpotImages[0].url}
              alt="Spot Image"
            />
          </div>
        )} */}
        <div style={{marginLeft:'80px', fontFamily: "Geneva, Verdana, sans-serif"}}>
          <h3 >Dates</h3>
          <p>{formatDate(startDate, endDate)}</p>
          <h3>Price Details</h3>
          <p>
            {spot.price} * {endDay - startDay} nights
          </p>
          <p>${total}</p>
          <div>
            <button className='confirm-btn'onClick={handleConfirmBooking}>Confirm Your Booking</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
