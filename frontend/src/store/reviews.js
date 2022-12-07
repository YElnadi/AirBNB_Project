import { csrfFetch } from "./csrf";
//ACTIONS/////////////////
const LOAD_REVIEWS = 'GET/ReviewsBySpotId'
const DELETE_REVIEW = 'DELETE/Review'
const CREATE_REVIEW = 'POST/Review'


export const loadReviews = reviews =>({
    type:LOAD_REVIEWS,
    reviews
})

export const deleteReview = reviewId =>({
    type:DELETE_REVIEW,
    reviewId
})

export const actionCreateReview = (review)=>({
    type:CREATE_REVIEW,
    review,
    
})
console.log('action create review',actionCreateReview.review)

//THUNK ACTIONS ////////////
export const getReviewsBySpotId = (spotId) => async (dispatch) =>{ //console.log('get all reviews by spot id')
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if(response.ok){
        const reviews = await response.json()
        ///console.log('reviews from db', reviews)
        dispatch(loadReviews(reviews))
        return reviews
    }else 
    return console.log('no reviews for this spot')
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

export const thunkCreateReview = (spotId, payload,user)=> async (dispatch) =>{

    //console.log('payload',payload)
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(payload)
        
    })
    //console.log('crate review thunk response', response)

    if(response.ok){
        const newReview = await response.json()
        //console.log('newReview response', newReview)
        newReview.User=user

        dispatch(actionCreateReview(newReview))
        //console.log('newReview from thunk',newReview)
        return newReview
    }
}



//REDUCERS///////////////
let initalState = {spot:{}, user:{}}
export default function reviewReducers(state={spot:{}, user:{}}, action){
    switch (action.type) {
        case LOAD_REVIEWS:{
            //console.log("In LOAD_REVIEWS, state: ", state)
            //console.log('actionreviews+++++',action.reviews)
            let newState=
            {
                 
                spot:{},
                user:{}
            }

            action.reviews.Reviews.forEach(review => {
                newState.spot[review.id] = review
            })
            //console.log("In LOAD_REVIEWS, newState: ", newState)
           return newState;
        }

        case DELETE_REVIEW:{
            //console.log("In DELETE_REVIEW, state: ", state)
            const newState=
            {
                ...state, 
                spot:{...state.spot},
                user:{...state.user}
            }
            delete newState.user[action.reviewId]
            delete newState.spot[action.reviewId]
            //console.log("In DELETE_REVIEW, action: ", action)
            //console.log("In DELETE_REVIEW, newState: ", newState)
            return newState;

        }
         case CREATE_REVIEW:{
             //console.log('in create review reducer')
             const newState = {
                 ...state,
                 spot:{...state.spot},
                 user:{...state.user}
                }
                newState.spot[action.review.id] = action.review
                
                return newState
         }
            
            
    
        default:
            return state;
    }
}