import { csrfFetch } from "./csrf";
//ACTIONS
const CREATE_BOOKING = "POST/creatBookingForSingleSpot";
const LOAD_BOOKINGS = "GET/allBookingsForCurrentUser";
const DELETE_BOOKING = "DELETE/bookingById";
const UPDATE_BOOKING = "PUT/bookingById";

export const actionLoadBookings = (bookings) => ({
  type: LOAD_BOOKINGS,
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
export const getAllBookingsForCurrentUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/bookings");
  if (response.ok) {
    const bookingsList = await response.json();
    dispatch(actionLoadBookings(bookingsList.Bookings));
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

/////REDUCERS
let initalState = {
  spot: {},
  user: {},
};

export default function bookingReducers(
  state = { spot: {}, user: {}, booking: {} },
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
    default:
      return state;
  }
}
