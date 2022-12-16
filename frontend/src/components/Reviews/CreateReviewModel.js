import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkCreateReview } from "../../store/reviews";
import { getReviewsBySpotId } from "../../store/reviews";
import { getSingleSpotDetails } from "../../store/spots";
import './Reviews.css'
import '../Common/FormCommon.css'

const CreateReviewModel = ({ spotId }) => {
  const [review, setReview] = useState('')
  const [stars, setStars] = useState('')
  //const {spotId} = useParams();
  //console.log('###spotId###',spotId)
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmited] = useState(false)
  const { closeModal } = useModal();
  const sessionUser = useSelector(state => state.session.user);
  //console.log('sessionuser', sessionUser)
  const spot = useSelector(state => state.spots.singleSpot)
  //console.log('####spot###', spot)

  useEffect(() => {
    // dispatch(getReviewsBySpotId(spotId))
    let errors = [];
    if (!review) errors.push('Please tell us your experiance')
    if (review.length < 10) errors.push('Please your review must be longer than 10 characters')
    if (!stars) errors.push('Review must have a rating stars')
    if (stars > 5 || stars < 1) errors.push('Please enter a value between 1 and 5 ')
    setErrors(errors)
  }, [review, stars])

  // useEffect(()=>{
  //   dispatch(getSingleSpotDetails(spotId))
  // },[spotId, dispatch])

  const onSubmit = async (e) => {
    e.preventDefault();
    setHasSubmited(true)
    if (errors.length > 0) return;

    const payload = {
      review,
      stars
    }
    let newReview
    newReview = await dispatch(thunkCreateReview(spotId, payload, sessionUser))
    //if(newReview){
    dispatch(getReviewsBySpotId(spotId))
    dispatch(getSingleSpotDetails(spotId))
    closeModal()
    // .catch(
    //   async (res) => {
    //     const data = await res.json();
    //     window.alert('Not able to submit' + " "+ data.message)
    //   }
    // )
    //history.push(`/spots/${spotId}`)


    //}

  }


  return (
    <>
      <div className='yasbnb-modal-main-div'>
        <h1 className='yasbnb-form-title'>Leave a review</h1>

        <form className='yasbnb-form' style={{height:'200px'}} onSubmit={onSubmit}>

        {hasSubmitted && errors.length > 0 && (
            <div>
             <span style={{fontFamily: 'Geneva, Verdana, sans-serif'}}>The following errors were found:</span>
              <ul style={{fontFamily: 'Geneva, Verdana, sans-serif'}}>
                {/* {errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
                {errors.map(error => (<li key={error}>{error}</li>))}
              </ul>
            </div>
          )}

        
          <div className="yasbnb-inputs-div">

            <textarea className='yasbnb-input'
              type='text'
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
              placeholder="Descripe your experiance with Yasbnb ..."
            />
          
          

          
            <input className='yasbnb-input'
              type='number'
              value={stars}
              max={5}
              min={1}
              onChange={(e) => setStars(e.target.value)}
              placeholder='Stars'
              required
            />
          </div>

          
          <div className="yasbnb-btns-div">
          <button className='yasbnb-btn' type='submit'>Save</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateReviewModel;
