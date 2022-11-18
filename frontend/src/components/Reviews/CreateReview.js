import './CreateReviews.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { createSpotReview } from '../../store/reviews';
import { useSelector } from 'react-redux';
import { getReviewsBySpotId } from '../../store/reviews';
import { fetchSingleSpot, getCurrentUserSpots } from '../../store/spots';
import { deleteSpotReview } from '../../store/reviews';
import ReviewsCard from './ReviewsCard';

const CreateReview = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { spotId } = useParams()
    console.log('spotId', spotId)
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [validationErrors, setValidationErrors] = useState([])
    //const [comments, setComments] = useState([])
    //const sessionUser = useSelector(state => state.session.user)
    //console.log('sessionUserId',sessionUser)
    
    const spot = useSelector(state=>Object.values(state.spotStates.spots))
    console.log('spotss', spot)
   const allReviews = useSelector(state=>Object.values(state.reviews.spot))
   console.log('AllReviews',allReviews)
   //console.log('allReviews', allReviews)

    const reset = ()=>{
        setReview('')
        setStars('')
    }
    const submitForm = async (e) => {
        e.preventDefault();
        const payload = {
            review,
            stars
        }
        let newReview 
        newReview = await dispatch(createSpotReview(spotId, payload))
        reset();
        if(!newReview){
           window.alert('cant submit review')
        }
    }

    useEffect(()=>{
        let errors =[]
        if(!review) errors.push('Please enter a review')
        setValidationErrors(errors)
    },[review])

    return (
        <div >
            <form onSubmit={submitForm}>
                <ul>
                {validationErrors.map(e=>(<li>{e}</li>))}
                </ul>
                <h2>Review</h2>
                <textarea
                    value={review}
                    onChange={(e)=>setReview(e.target.value)}
                />
                <h2>Stars</h2>
                <input
                max={5}
                min={1}
                type='number'
                value={stars}
                onChange={(e)=>setStars(e.target.value)}
                />
                <button  disabled={validationErrors.length>0}>Submit</button>
            </form>

        </div>
    );
}
export default CreateReview;
