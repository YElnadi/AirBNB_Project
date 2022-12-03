import { csrfFetch } from './csrf';
//ACTIONS
const LOAD_SPOTS = 'GET/allSpots';
const SINGLE_SPOT = 'GET/singleSpotById'





export const loadSpots = (spots) =>({
    type:LOAD_SPOTS,
    spots
})

export const singleSpotDetails = (spotDetails) => ({
    type:SINGLE_SPOT,
    spotDetails
})
//THUNK ACTIONS
export const getAllSpots =() => async(dispatch) =>{
    const response = await csrfFetch('/api/spots')
    console.log('response from getAllSpots', response)
    if(response.ok){
        const spotsList = await response.json();
        dispatch(loadSpots(spotsList.Spots))
        return spotsList;
    }
}

export const getSingleSpotDetails = (spotId) =>async (dispatch) => {
    const response = await csrfFetch (`/api/spots/${spotId}`)
    if(response.ok){
        const data = await response.json()
        dispatch(singleSpotDetails(data))
        return data;
    }
}

//REDUCERS
const initialState = {spots:{}, singleSpot:{}}
export default function spotReducers (state = initialState, action){
    switch (action.type) {
        case LOAD_SPOTS:{
            const newState = {
                spots:{}, 
                singleSpot:{}
            }
            action.spots.forEach(spot =>{
                newState.spots[spot.id] = spot
            });
            return newState
        }

        case SINGLE_SPOT:{
            const newState={
                spots:{},
                singleSpot:action.spotDetails
            }
            return newState
        }
        default:
            return state;
    }
}