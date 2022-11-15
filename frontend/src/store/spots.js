import { csrfFetch } from './csrf';

//ACTIONS------------------
const GETSPOTS ='get/SPOTS';
const ADDSPOT = 'create/SPOT'

// export const getAllSpots =(spots)=>({
//     type:GETSPOTS,
//     spots
// })

export const addSpot = (spot) =>({
    type:ADDSPOT,
    spot
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
















const sortList = (spots) =>{
    return spots.sort((spotA, spotB)=>{
        return spotA.number - spotB.number;
    }).map((spot)=>spot.id)
}



//REDUCERS--------------------
const initState = {spots:[]}
export default function SpotsReducers (state=initState, action){
    switch(action.type){
        case ADDSPOT:
            if(!state[action.spot.id]){
                const newState = {
                    ...state, 
                    [action.spot.id]:action.spot
                };
                const spotList = newState.spots.map(id=>newState[id]);
                spotList.push(action.spot)
                newState.spots = sortList(spotList)
                return newState;
            }
            return {
                ...state,
                [action.spot.id]:{
                    ...state[action.spot.id],
                    ...action.spot
                }
            }
        default:
            return state; 
    }}