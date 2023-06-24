import { csrfFetch } from './csrf';

////ACTIONS////
const SET_START_DATE = 'GET/startDate'

export const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    payload: startDate,
  });


///REDUCERS
const initialState = {startDate: ''}

export default function dateReducers (state = {startDate: ''}, action) 
{
    switch (action.type) {
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.payload,
      };
    default:
      return state;
  }
};

