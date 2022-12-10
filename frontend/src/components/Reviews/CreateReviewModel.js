import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkCreateReview } from "../../store/reviews";
import { getReviewsBySpotId } from "../../store/reviews";
import { getSingleSpotDetails } from "../../store/spots";
import '../CreateSpotModal/CreateSpotModal.css'

const CreateReviewModel = ({ spotId }) => {
  const [review, setReview] = useState('')
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
  const spot = useSelector(state => state.spots.singleSpot)
  //console.log('####spot###', spot)

  useEffect(() => {
    // dispatch(getReviewsBySpotId(spotId))
    let errors = [];
    if (!review) errors.push('Please tell us your experiance')
    if (review.length < 10) errors.push('Please your review must be longer than 10 characters')
    if (!stars) errors.push('Review must have a rating stars')
    if (stars > 5 || stars < 1) errors.push('Please enter a value between 1 and 5 ')
    setValidationErrors(errors)
  }, [review, stars])

  // useEffect(()=>{
  //   dispatch(getSingleSpotDetails(spotId))
  // },[spotId, dispatch])

  const onSubmit = async (e) => {
    e.preventDefault();
    setHasSubmited(true)
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
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '400px', background: 'white', borderRadius: '10px'
      }}>
        <h1 style={{ textAlign: 'center', padding: '0 0 20px 0', borderBottom: '1px solid silver', fontFamily: 'Geneva, Verdana, sans-serif' }}>Leave a review</h1>

        <form style={{ padding: '0 40px', boxSizing: 'bordar-box', display:'flex', flexDirection:'column' }} onSubmit={onSubmit}>

          <ul>{hasSubmitted && validationErrors.map(e => (<li>{e}</li>))}</ul>

        
          <label>
            <spam style={{ fontFamily: 'Geneva, Verdana, sans-serif', color: '#888' }}>Review</spam>
            <textarea className='textarea'
              type='text'
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
              placeholder="Your experiance ..."
            />
          </label>
          

          <label>
            <spam style={{ fontFamily: 'Geneva, Verdana, sans-serif', color: '#888' }}>Stars</spam>
            <input className='input'
              type='number'
              value={stars}
              max={5}
              min={1}
              onChange={(e) => setStars(e.target.value)}
              required
            />
          </label>


          <div className='Btn'>

          <button style={{ background: 'rgb(236, 72, 72)', padding: '10px', borderRadius: '15px', fontWeight: '700px' , marginBottom:'20px',fontFamily: 'Geneva, Verdana, sans-serif'}}type='submit'>Save</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateReviewModel;
