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
import './CreateReviews.css'


const CreateReviewForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { spotId } = useParams()
    console.log('spotId', spotId)
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [validationErrors, setValidationErrors] = useState([])

    const sessionUser = useSelector(state => state.session.user)

    if (!sessionUser) {
        window.alert('Must be logged in')
        history.push(`/spots/${spotId}`)
    }


    const spot = useSelector(state => Object.values(state.spotStates.spots))
    console.log('spotss', spot)

    const reset = () => {
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
        if (newReview) {
            dispatch(getReviewsBySpotId(spotId))
            dispatch(fetchSingleSpot(spotId))
            history.push(`/spots/${spotId}`)

            //    window.alert('cant submit review')

        }
    }

    useEffect(() => {
        dispatch(getReviewsBySpotId(spotId))
        let errors = []
        if (!review) errors.push('Please enter a review')
        setValidationErrors(errors)
    }, [review])

    return (
        <div className='main-container' >
            <form onSubmit={submitForm}>
                <ul>
                    {validationErrors.map(e => (<li>{e}</li>))}
                </ul>
                <div className='row'>
                    <div className='label'>
                        <label>Review</label>
                    </div>
                    <div className='col-75'>
                        <textarea style={{ height: 200, width: 600 }}
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder='Your review...'
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='label'>
                        <label style={{marginLeft:20}}>Stars</label>
                    </div>
                    {/* <div style={{ display: 'flex' }}>
                    <i class="fa-solid fa-star" ></i>
                    </div> */}
                    <div className='col-75'>
                        <input
                            max={5}
                            min={1}
                            type='number'
                            value={stars}
                            onChange={(e) => setStars(e.target.value)}
                        />
                    </div>
                    <div style={{display:'inline-flex'}}>
                    <button className='button'>Submit</button>                   
                     </div>
                </div>
            </form>

        </div>

    );
}

export default CreateReviewForm;
