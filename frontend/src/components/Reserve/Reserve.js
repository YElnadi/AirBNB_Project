import React from "react";
import { useEffect, useState, useRef } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { thunkCreateNewBooking, thunkUpdateBooking } from "../../store/bookings";
import SearchDate from "../SearchDate";
import { useModal } from "../../context/Modal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";



const Reserve = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user.id);
  const spot = useSelector(state=>state.spots.singleSpot)
  console.log('spott in reserve', spot)
  //const bookingId = useSelector(state => state.bookings.booking.id)
  // console.log('booking id reserve', bookingId)
  // console.log('user id reserve', sessionUser)
  const { spotId } = useParams();
  console.log("spotId reserve", spotId);

  const { startDate } = useParams();
  console.log("startdate reserve", startDate);  //06-03-2027 
  const startDay = startDate.split("-")[1];
  
  

  const { endDate } = useParams();
  const endDay = endDate.split("-")[1];

  //console.log("enddate reserve", endDate);

  const total = (endDay-startDay )* (spot.price)

 

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

  

  const handleConfirmBooking = async (e)=>{
    e.preventDefault();
    const bookingDetails = {
      startDate,
      endDate,
    }
    let newBooking
    newBooking = await dispatch(thunkCreateNewBooking(spotId,bookingDetails,sessionUser ))

    if(newBooking){
      window.alert('congrats')
    }
  }

  // const formateDate = (date) => {
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const day = String(date.getDate()).padStart(2, "0");

  //   return `${month}-${day}-${year}`;
  // };

  // const handleSearchDate = (ranges) => {
  //   console.log("in spot details, ranges: ", ranges);
  //   setStartDate(formateDate(ranges.selection.startDate));
  //   setEndDate(formateDate(ranges.selection.endDate));
  // };

  // const handleEdit = async (e) =>{
  //   e.preventDefault();
  //   const payload = {
  //     startDate,
  //     endDate
  //   }
  //   let updatedBooking;
  //   updatedBooking = await dispatch(thunkUpdateBooking(bookingId, payload))
  // }
   

  return (
    <div className="reserve_container">
      <div>
      <NavLink exact to= {`/spots/${spotId}`}><i className="fa-solid fa-chevron-left"></i></NavLink>
      <h1>Request to Book</h1>
      </div>
      <h2>Your Trip</h2>
      <h3>Dates</h3>
      <p>{startDate}</p>
      <p>{endDate}</p>
      <h3>Price Details</h3>
      <p>{spot.price} * {endDay - startDay} nights</p>
      <p>${total}</p>
      {/* <div>
                <OpenModalMenuItem
                  itemText={
                    <button className="search-date-btn">Edit</button>
                  }
                  onItemClick={closeMenu}
                  modalComponent={
                    <SearchDate
                      key={spotId}
                      spotId={spotId}
                      //onSearchDateChange={handleSearchDate}
                    />
                  }
                />
              </div> */}
      <div>
        <button onClick={handleConfirmBooking}>Confirm Your Booking</button>
      </div>
    </div>
  );
};

export default Reserve;



