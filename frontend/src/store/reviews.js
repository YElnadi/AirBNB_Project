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
        disPatch(getReviews(reviews.Reviews))
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
        dispatch(deleteReview(reviewId))
        return deletedReview
    }
}

export const getReviewsBySpotId = (spotId) => async (dispatch) =>{ console.log('get all reviews by spot id')
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if(response.ok){
        const reviews = await response.json()
        console.log('reviews from db', reviews)
        dispatch(loadReviews(reviews))
        return reviews
    }else 
    return console.log('no reviews for this spot')
}





//REDUCERS
let initState = {spot:{}, user:{}}
export default function ReviewReducers (state= {spot:{}, user:{}}, action){
    switch (action.type) {
        case GET_REVIEWS:{
            console.log('GET_REVIEWS')
            const newState = {
               user:{}
            };
            action.userId.forEach(review => {
                newState.user[review.id] = review
            })
            return newState;
        }
        case CREATE_REVIEW:{
            console.log("In CREATE_REVIEW, state: ", state)
            const newState = {
                ...state, 
                spot:{...state.spot},
                user:{...state.user}
            }
            newState.spot[action.review.id] = action.review
            newState.user[action.review.id] = action.review
            console.log("In CREATE_REVIEW, newState: ", newState)
            return newState;

        }
        case DELETE_REVIEW:{
            console.log("In DELETE_REVIEW, state: ", state)
            const newState=
            {
                ...state, 
                spot:{...state.spot},
                user:{...state.user}
            }
            delete newState.user[action.reviewId]
            delete newState.spot[action.reviewId]
            console.log("In DELETE_REVIEW, action: ", action)
            console.log("In DELETE_REVIEW, newState: ", newState)
            return newState;

        }

        case LOAD_REVIEWS:
            console.log("In LOAD_REVIEWS, state: ", state)
            console.log('actionreviews+++++',action.reviews)
            let newState=
            {
                 
                spot:{},
                user:{}
            }

            action.reviews.Reviews.forEach(review => {
                newState.spot[review.id] = review
            })
            console.log("In LOAD_REVIEWS, newState: ", newState)
           return newState;
            
        
            
            
    
        default:
            return state;
    }
}