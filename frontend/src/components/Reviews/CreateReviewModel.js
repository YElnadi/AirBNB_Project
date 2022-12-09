import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkCreateReview } from "../../store/reviews";
import { getReviewsBySpotId } from "../../store/reviews";
import { getSingleSpotDetails } from "../../store/spots";

const CreateReviewModel = ({spotId}) => {
  const [review, setReview] =useState('')
  const [stars, setStars] = useState('')
  //const {spotId} = useParams();
  //console.log('###spotId###',spotId)
  const dispatch = useDispatch();
  const history = useHistory();
  const [validationErrors, setValidationErrors] = useState([])
  const [hasSubmitted, setHasSubmited] = useState(false)
  const { closeModal } = useModal();
const sessionUser = useSelector(state => state.session.user);
//console.log('sessionuser', sessionUser)
const spot = useSelector(state=>state.spots.singleSpot)
//console.log('####spot###', spot)

  useEffect(()=>{
   // dispatch(getReviewsBySpotId(spotId))
    let errors =[];
    if(!review) errors.push('Please tell us your experiance')
    if(review.length<10) errors.push('Please your review must be longer than 10 characters')
    if(!stars) errors.push('Review must have a rating stars')
    if(stars>5 || stars<1) errors.push('Please enter a value between 1 and 5 ')
    setValidationErrors(errors)
  },[review,stars])

  // useEffect(()=>{
  //   dispatch(getSingleSpotDetails(spotId))
  // },[spotId, dispatch])

  const onSubmit = async (e) =>{
    e.preventDefault();
    setHasSubmited(true)
    const payload={
      review,
      stars
    }
    let newReview
    newReview = await dispatch(thunkCreateReview(spotId,payload,sessionUser))
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
    <div>
      <form onSubmit={onSubmit}>
        <ul>{hasSubmitted && validationErrors.map(e => (<li>{e}</li>))}</ul>
          <label>
            Review
            <textarea
            type='text'
            value={review}
            onChange={(e)=>setReview(e.target.value)}
            required
            placeholder="Your experiance ..."
            />
          </label>
          <label>
            Stars
            <input
            type='number'
            value={stars}
            max={5}
            min={1}
            onChange={(e)=>setStars(e.target.value)}
            required
            />
          </label>
            <button type='submit'>Save</button>
      </form>
    </div>
    </>
  );
}

export default CreateReviewModel;
