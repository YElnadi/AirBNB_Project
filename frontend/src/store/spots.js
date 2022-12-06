import { csrfFetch } from './csrf';
//ACTIONS
const LOAD_SPOTS = 'GET/allSpots';
const SINGLE_SPOT = 'GET/singleSpotById';
const CREATE_SPOT = 'POST/createSingleSpot';
const DELETE = 'DELETE/spot'





export const loadSpots = (spots) =>({
    type:LOAD_SPOTS,
    spots
})

export const singleSpotDetails = (spotDetails) => ({
    type:SINGLE_SPOT,
    spotDetails
})

export const createSpot = (newSpotDetails) =>({
    type:CREATE_SPOT,
    newSpotDetails
})

export const deleteSpot = (spotId) =>({
    type:DELETE,
    spotId
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

export const createNewSpot = (data) =>async (dispatch) =>{
    const response = await csrfFetch(`/api/spots`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
    })
    if(response.ok){
        console.log('in response ok ######')
        const newSpot = await response.json();
        const res = await csrfFetch(`/api/spots/${newSpot.id}/images`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json' 
            },
            body:JSON.stringify({url:data.previewImage, preview:true})
        })
        if(res.ok){
            //console.log('newSpot2######',newSpot)
            //console.log('in res ok ######')
            newSpot.previewImage=data.previewImage;
            dispatch(createSpot(newSpot));
            //console.log('newSpot####',newSpot)
            return newSpot;
        }
    }
}


export const deleteSpotbySpotId = (spotId) =>async(dispatch) =>{
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method:'DELETE'
    })
    if(response.ok){
        dispatch(deleteSpot(spotId))
    }
}

//REDUCERS
const initialState = {spots:{}, singleSpot:{}}
export default function spotReducers (state = {spots:{}, singleSpot:{}}, action){
    switch (action.type) {
        case LOAD_SPOTS:{
            const newState = {
                spots:{}, 
                singleSpot:{}
            }
            //console.log('singleSpot',state.singleSpot)
            action.spots.forEach(spot =>{
                newState.spots[spot.id] = spot
            });
            console.log('newState',newState)

            return newState
        }

        case SINGLE_SPOT:{
            const newState={
                spots:{},
                singleSpot:action.spotDetails
            }
            return newState
        }
        case CREATE_SPOT:{
            // console.log('action from create spot reducers', action.newSpotDetails)
            // console.log('spots',state.spots)
            const newState = {
                ...state,
                spots:{...state.spots},
                //singleSpot:[action.newSpotDetails]
                
            }
            console.log('newState####',newState)
            //const output = Object.assign({},state,action.newSpotDetails)
            
            // const newStateArr = [Object.values(newState)]
            // console.log('newStateArr', newStateArr)
             //console.log('newstate from reducers',newState)
           
            newState.spots[action.newSpotDetails.id] = action.newSpotDetails
            //console.log('########', newState.spots[action.newSpotDetails.id])
            // if(newState.spots[action.newSpotDetails.id].SpotImages){
            //     newState.spots[action.newSpotDetails.id].previewImage = newState.spots[action.newSpotDetails.id].SpotImages[0].url
            // }
            //console.log('output from reducer', output)
            return newState
        }
        default:
            return state;
    }
}