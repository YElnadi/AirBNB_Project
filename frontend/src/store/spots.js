import { csrfFetch } from './csrf';

//ACTIONS------------------
const LOAD_SPOTS ='GET/spots';
const ADDSPOT = 'POST/spot';
const SINGLESPOT ='GET/SingleSpotbyId';
const LOAD_USERSPOTS= 'GET/userSpots';
const UPDATE_SPOT ='PUT/spot'
const DELETE = 'DELETE/spot'
const ADD_IMAGE = 'POST/imageBySpotId'
const DELETE_IMAGE = 'DELETE/spotImageById'

export const loadSpots = (spots) =>({
    type:LOAD_SPOTS,
    spots
})


export const addSpot = spot =>({
    type:ADDSPOT,
    spot
})

export const singleSpotDetails = spotDetails =>({
    type:SINGLESPOT,
    spotDetails
})

export const loadUserSpots = spots =>({
    type:LOAD_USERSPOTS,
    spots
})

export const updateSpot = spot =>({
    type:UPDATE_SPOT,
    spot
})

export const deleteSpot = spotId =>({
    type:DELETE,
    spotId
})

export const addImage = image =>({
    type:ADD_IMAGE,
    image
})

export const deleteImage = imageId =>({
    type:DELETE_IMAGE,
    imageId
})




//ACTION THUNKS -------------------------------------

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
        const res = await csrfFetch(`/api/spots/${newAddedSpot.id}/images`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json' 
            },
            body:JSON.stringify({url:newSpot.imageUrl, preview:true})
        })
        if(res.ok){
            //newAddedSpot.previewImage
        console.log('newAddedSpot:',newAddedSpot)
        dispatch(addSpot(newAddedSpot));
        return newAddedSpot;
        }
    }
}

export const fetchSingleSpot = (spotId) => async dispatch =>{
    const response = await csrfFetch(`/api/spots/${spotId}`)
    if(response.ok){
        const spotDetails = await response.json()
        dispatch(singleSpotDetails(spotDetails))
    }
}

export const getCurrentUserSpots = () =>async dispatch =>{
    const response = await csrfFetch(`/api/spots/current`)
    if(response.ok){
        const data = await response.json()
        dispatch(loadSpots(data.Spots))
        return data
    }

}

export const updateASpot = (spot, spotId) =>async dispatch =>{
    const response = await csrfFetch(`/api/spots/${spotId}`,{
        method:'PUT',
        header:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(spot)
    })
    if(response.ok){
        const updatedSpot = await response.json()
        dispatch(updateASpot(updatedSpot))
        return updatedSpot;
        
    }
}

export const deleteASpot = (spotId) => async (dispatch) =>{
    const response = await  csrfFetch(`/api/spots/${spotId}`,{
        method:'DELETE'
    })
    if(response.ok){
        //const deletedSpot = await response.json()
        dispatch(deleteSpot(spotId))
    }
}

export const addImageBySpotId = (image,spotId) => async (dispatch) =>{
    const response = await csrfFetch(`/api/spots/${spotId}/images`,{
        method:'POST',
            headers:{
            'Content-Type': 'application/json' 
            },
            body:JSON.stringify(image)
    })
    if(response.ok){
        const newImage = response.json()
        dispatch(addImageBySpotId(newImage))
        return newImage
    }
}

export const deleteSpotImageById = (imageId) =>  async(dispatch) =>{
    const response = await csrfFetch(`/api/spot-images/${imageId}`,{
        method:'DELETE'
    })
    if(response.ok){
        const deletedImage = await response.json();
        dispatch(deleteImage(deleteImage))
        return deletedImage;
    }
}






//REDUCERS--------------------
const initState = {spots:{}, singleSpot:{}}
export default function SpotsReducers (state=initState, action){
    switch(action.type){

        case LOAD_SPOTS:
            const newState={spots:{}, singleSpot:{} }
            action.spots.forEach(spot =>{
                newState.spots[spot.id] = spot
            });
            return newState;

        case ADDSPOT:{
            const newState = {...state}
            newState.spots[action.spot.id] = action.spot
            return newState;   
            }
        case SINGLESPOT:
            return {
                spots:{},
                singleSpot:action.spotDetails
            }
        case UPDATE_SPOT:{
            const newState = {...state}
            newState.singleSpot = action.spot
            return newState;
        }
        case DELETE:{
            const newState = {
                ...state,
                spots:{...state.spots},
                singleSpot:{...state.singleSpot}
            };
            delete newState.spots[action.spotId]
             newState.singleSpot = {}
            return newState;
        }
            
       
        default:
            return state; 
    }}