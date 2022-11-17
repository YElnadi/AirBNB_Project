import { csrfFetch } from "./csrf";

const GET_REVIEWS = 'GET/UserReviews'
const CREATE_REVIEW = 'POST/CreateReview'
const DELETE_REVIEW = 'DELETE/Review'
const LOAD_REVIEWS = 'GET/ReviewsBySpotId'





//ACTION
export const getReviews = userId =>({
    type:GET_REVIEWS,
    userId
})

export const createReview = review =>({
    type:CREATE_REVIEW,
    review
})

export const deleteReview = reviewId =>({
    type:DELETE_REVIEW,
    reviewId
})

export const loadReviews = reviews =>({
    type:LOAD_REVIEWS,
    reviews
})




//THUNK
export const getUserReviews = () =>async (disPatch) =>{
    const response = await csrfFetch(`/api/reviews/current`)
    if(response.ok){
        const reviews = await response.json()
        disPatch(getReviews(reviews))
    }
}

export const createSpotReview = (spotId, payload) => async (dispatch) =>{
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(payload)
    })
    if(response.ok){
    const newReview = await response.json()
    console.log('newReview', newReview)
    dispatch(createReview(newReview))
    return newReview;
    }

}

export const deleteSpotReview = (reviewId) => async (dispatch) =>{
    const response = await csrfFetch(`/api/reviews/${reviewId}`,{
        method:'DELETE'
    });
    if(response.ok){
        const deletedReview = await response.json();
        dispatch(deleteReview(deletedReview))
        return deletedReview
    }
}

export const getReviewsBySpotId = (spotId) => async (dispatch) =>{
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if(response.ok){
        const reviews = await response.json()
        dispatch(loadReviews(reviews))
        return reviews
    }else 
    return console.log('no reviews for this spot')
}





//REDUCERS
let initState = {spot:{}, user:{}}
export default function ReviewReducers (state=initState, action){
    switch (action.type) {
        case GET_REVIEWS:{
            const newState = {
                user:{}
            };
            action.userId.forEach(review => {
                newState.user[review.id] = review
            })
            return newState;
        }
        case CREATE_REVIEW:{
            const newState = {
                ...state, 
                Spot:{...state.spot},
                User:{...state.user}
            }
            newState.Spot[action.review.id] = action.review
            newState.User[action.review.id] = action.review
            return newState;

        }
        case DELETE_REVIEW:{
            const newState=
            {
                ...state, 
                spot:{...state.spot},
                user:{...state.user}
            }
            delete newState.user[action.reviewId]
            delete newState.spot[action.reviewId]
            return newState;

        }
        case LOAD_REVIEWS:{
            const newState=
            {
                 
                spot:{},
                user:{}
            }
            action.reviews.forEach(review =>{
                newState.spot[review.id] = review
            })
            if(!action.reviews) return newState.review
            return newState;

        }
            
            
    
        default:
            return state;
    }
}