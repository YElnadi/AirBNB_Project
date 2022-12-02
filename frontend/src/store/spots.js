import { csrfFetch } from './csrf';
//ACTIONS
const LOAD_SPOTS = 'GET/allSpots';





export const loadSpots = (spots) =>({
    type:LOAD_SPOTS,
    spots
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

//REDUCERS
const initialState = {spots:{}, singleSpot:{}}
export default function spotReducers (state = initialState, action){
    switch (action.type) {
        case LOAD_SPOTS:
            const newState = {
                spots:{}, 
                singleSpot:{}
            }
            action.spots.forEach(spot =>{
                newState.spots[spot.id] = spot
            });
            return newState
    
        default:
            return state;
    }
}