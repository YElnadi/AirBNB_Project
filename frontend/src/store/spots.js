import { csrfFetch } from './csrf';

//ACTIONS------------------
const LOAD_SPOTS ='get/SPOTS';
const ADDSPOT = 'create/SPOT'
const CURRENTUSERSPOTS = 'get/CURRENTSPOTS'

export const loadSpots = (spots) =>({
    type:LOAD_SPOTS,
    spots
})


export const addSpot = (spot) =>({
    type:ADDSPOT,
    spot
})

export const getCurrentSpots = () =>({
    type:CURRENTUSERSPOTS
})





//ACTION THUNKS -------------------------------------

// export const getSpots = () => async dispatch =>{
//     const response = await fetch('/api/spots');
//     if(response.ok){
//         const spotList = await response.json()
//         dispatch(getAllSpots(spotList))
//         return spotList
//     }
// }

//getAllSpotsThunkAction
export const getSpots = () => async (dispatch) =>{
    const response = await csrfFetch('/api/spots')
    console.log('response',response)
    if(response.ok){
        const spotsList = await response.json();
        dispatch(loadSpots(spotsList.Spots))
        return spotsList
    }
}

export const createSpot = newSpot => async dispatch =>{
    const response = await csrfFetch('/api/spots',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(newSpot)

    })
    if(response.ok){
        const newAddedSpot = await response.json();
        dispatch(addSpot(newAddedSpot));
        return newAddedSpot;
    }
}

export const getCurrentUserSpots = () => async dispatch=>{
    const response = await csrfFetch('/api/spots/current');
    if(response.ok){
        const currentSpots = await response.json()
        dispatch(getCurrentSpots(currentSpots))
        return currentSpots;
    }
}











const sortList = (spots) =>{
    return spots.sort((spotA, spotB)=>{
        return spotA.number - spotB.number;
    }).map((spot)=>spot.id)
}
//REDUCERS--------------------
const initState = {spots:{}}
export default function SpotsReducers (state=initState, action){
    switch(action.type){

        case LOAD_SPOTS:
            const newState={spots:{}}
            action.spots.forEach(spot =>{
                newState.spots[spot.id] = spot
            });
            return newState;

        case ADDSPOT:{
            const newState = {...state, spots:{...state.spots}}
            newState.spots[action.spot.id] = action.spot
            return newState;
            // if(!state[action.spot.id]){
            //     const newState = {
            //         ...state, 
            //         [action.spot.id]:action.spot
            //     };
            //     const spotList = newState.spots.map(id=>newState[id]);
            //     spotList.push(action.spot)
            //     newState.spots = sortList(spotList)
            //     return newState;
            // }
            // return {
            //     ...state,
            //     [action.spot.id]:{
            //         ...state[action.spot.id],
            //         ...action.spot
            //     }
            }
        case CURRENTUSERSPOTS:

        default:
            return state; 
    }}