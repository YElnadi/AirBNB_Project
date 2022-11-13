import { csrfFetch } from './csrf';



const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';


//ACTIONS------------------------------------------
const setUser = (user) => {
    console.log("user", user)
    return {
      type: SET_USER,
      payload: user,
    };
  };
  
  const removeUser = () => {
    return {
      type: REMOVE_USER,
    };
  };

//THUNK ACTIONS
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
      method: 'POST',
      body: JSON.stringify({
        credential,
        password,
      }),
    });
    const data = await response.json();
    console.log("in login")
    dispatch(setUser(data.user));
    return response;
  };


  export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

  export const signup = (user) => async (dispatch) => {
    console.log("in signup user")
    const { username, email, password, firstName, lastName} = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
        firstName,
        lastName
      }),
    });
    const data = await response.json();
    dispatch(setUser(data));
    console.log("response++++++:", response)
    return response;
  };

  export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
  };

  
  
  // window.store.dispatch(window.sessionActions.signup({
  //   username: 'New1User',
  //   email: 'new1@user.io',
  //   password: 'password',
  //   firstName:'Demo',
  //   lastName:'User'
  // }));



  //REDUCERS-----------------------------------------------

  const initialState = { user: null };
  
  const sessionReducer = (state = initialState, action) => {
    let newState;
    console.log("in sessionReducer", action,"\nstate", state)
    switch (action.type) {
      case SET_USER:
        newState = Object.assign({}, state);
        newState.user = action.payload;
        return newState;
      case REMOVE_USER:
        newState = Object.assign({}, state);
        newState.user = null;
        return newState;
      default:
        return state;
    }
  };
  
  export default sessionReducer;



  