import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getReviewsBySpotId, getUserReviews } from "../../store/reviews";
import ReviewsCard from "./ReviewsCard";



const ReviewsSingleSpot = () => {
    const dispatch = useDispatch()
    const {spotId} = useParams();
    //console.log('spotIDDDDDD', spotId)
    const allReviews = useSelector(state=>state.reviews.spot)
    console.log('allReviews',allReviews)
    // const singleReview = allReviews.




    useEffect(()=>{
        dispatch(getReviewsBySpotId(spotId))

    },[dispatch])

   return (
    <div>
      <h1>Reviews single spot</h1>
      <ReviewsCard allReviews={allReviews}/>
    </div>
  );
}

export default ReviewsSingleSpot;
