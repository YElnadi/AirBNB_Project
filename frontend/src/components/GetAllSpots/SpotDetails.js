import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSingleSpot, getSpots } from "../../store/spots";
import { useParams } from "react-router-dom";
import './SpotDetails.css'

const SpotDetails = () => {
  const {spotId} = useParams()
  console.log('spotId', spotId)
  const dispatch = useDispatch();
  // console.log('spots', spots)
  // const spotDetails = Object.values(spots)
  // console.log('spotDetails',spotDetails)


  useEffect(()=>{
    dispatch(fetchSingleSpot(spotId))
},[dispatch])

const spot = useSelector(state=>state.spotStates.singleSpot)
console.log('spot',spot)

  return (
    <div>
      <h1>Spot Details</h1>
      {/* <h1>{spot.name}</h1>
      <h4><i class="fa-solid fa-star"></i>{`${spots.avgStarRating}`} </h4>
      <h4>{spot.city}{spots.state}{spot.country}</h4>
      <img src={spots.SpotImages}/> 
      <h2>{spot.description}</h2>
      <h2>Located in {spot.address}</h2>
       */}
    </div>
  );
}

export default SpotDetails;
