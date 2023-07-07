import { csrfFetch } from "./csrf";
//ACTIONS
const CREATE_BOOKING = "POST/creatBookingForSingleSpot";
const LOAD_MY_BOOKINGS = "GET/allBookingsForCurrentUser";
const DELETE_BOOKING = "DELETE/bookingById";
const UPDATE_BOOKING = "PUT/bookingById";

export const actionLoadMyBookings = (bookings) => ({
  type: LOAD_MY_BOOKINGS,
  bookings,
});

export const actionCreateBooking = (newBooking) => ({
  type: CREATE_BOOKING,
  newBooking,
});

export const actionDeleteBooking = (bookingId) => ({
  type: DELETE_BOOKING,
  bookingId,
});

export const actionUpdateBooking = (data) => ({
  type: UPDATE_BOOKING,
  data,
});

//THUNK ACTIONS
export const loadMyBookings = () => async (dispatch) => {
  const response = await csrfFetch('/api/bookings/current');
  if (response.ok) {
    const bookingsList = await response.json();
    dispatch(actionLoadMyBookings(bookingsList.Bookings));
    return bookingsList;
  }
};

export const thunkCreateNewBooking =
  (spotId, data, user) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
      method: "POST",
      headers: {
        Content_Type: "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const newBooking = await response.json();
      newBooking.User = user;
      dispatch(actionCreateBooking(newBooking));
      return newBooking;
    }
  };

export const thunkUpdateBooking = (bookingId, data) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "PUT",
    headers: {
      'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
  })
  if (response.ok){
    const updatedBooking = await response.json()
    dispatch(actionUpdateBooking(updatedBooking))
    return updatedBooking
  }
};


export const deleteBookingByIdThunk = (bookingId) =>async(dispatch) =>{
  const response = await csrfFetch(`/api/bookings/${bookingId}`,{
    method:'DELETE'
  })
  if(response.ok){
    dispatch(actionDeleteBooking(bookingId))
  }
}

/////REDUCERS
// let initalState = {
//   spot: {},
//   user: {},
// };

export default function bookingReducers(
  state = { spot: {}, user: {}, booking: {}, myBookings:{} },
  action
) {
  switch (action.type) {
    case CREATE_BOOKING: {
      const newState = {
        ...state,
        booking: { ...state.booking },
      };
      newState.booking[action.newBooking.id] = action.newBooking;
      return newState;
    }
    case UPDATE_BOOKING:{
      const newState = {
        ...state,
        booking: action.data
      }
      return newState
    }
    case LOAD_MY_BOOKINGS:{
      const newState = {
        ...state,
        bookings: action.bookings
      };
      return newState
        
    }
    default:
      return state;
  }
}
