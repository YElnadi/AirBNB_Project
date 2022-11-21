import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSingleSpot, getSpots } from "../../store/spots";
import { useParams } from "react-router-dom";
import './SpotDetails.css'
import ReviewsCard from "../Reviews/ReviewsCard";
import ReviewsSingleSpot from "../Reviews/ReviewsSingleSpot";
import { NavLink } from "react-router-dom";
import CreateReviewForm from "../Reviews/CreateReviewForm";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import RemoveReview from "../Reviews/RemoveReview";


const SpotDetails = () => {
  const { spotId } = useParams()
  console.log('spotId', spotId)
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user)
  console.log('sessionUserrrrrr', sessionUser)
  const [button, setButton] = useState(false)
  // console.log('spots', spots)
  // const spotDetails = Object.values(spots)
  // console.log('spotDetails',spotDetails)
  const spot = useSelector(state => state.spotStates.singleSpot)


  useEffect(() => {
    dispatch(fetchSingleSpot(spotId))
  }, [dispatch, spotId])

  const reviewForm = () => {
    history.push(`/spots/${spotId}/reviews`)
  }

  // const showButton = () =>{
  //   if(!sessionUser) return;
  //   setButton(true)
  // }
  const avg = () =>{
    if(spot.avgStarRating === null)
      return 'new'
    else
      return spot.avgStarRating.toFixed(2)
  }

  console.log('spot', spot)
  if (!spot.SpotImages) return null;
  return (
    <>
      <div >
        {/* <h1>Spot Details</h1> */}
        <h1 style={{ marginLeft: 20 }}>{spot.name}</h1>
        <div className='rating--location'>
          <div style={{ marginLeft: 10 }}><i class="fa-solid fa-star" ></i>{avg()}  </div>
          <div>
            <h4 style={{ marginLeft: 20 }}> {spot.city}, {spot.state}, {spot.country} </h4>
          </div>
        </div>
        <div>
          <div>
            <img src={spot.SpotImages[0].url} className='spot-image' />
          </div>
          <p style={{margin:20, fontSize:20, }}>{spot.description}</p>
          <div style={{marginTop:0}}>
          <h2 style={{marginLeft:20}}>Address</h2>
          <p style={{margin:20, fontSize:20}}>Located in {spot.address}</p>
          </div>
        </div>
      </div>
      {sessionUser && sessionUser.id !== spot.ownerId &&(<button onClick={reviewForm}  className='button'>Rate your stay</button>)}
      
      <ReviewsSingleSpot spotId={spotId} />





    </>
  );
}

export default SpotDetails;
