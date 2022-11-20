import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getReviewsBySpotId, getUserReviews } from "../../store/reviews";
import ReviewsCard from "./ReviewsCard";



const ReviewsSingleSpot = ({spotId}) => {
    const dispatch = useDispatch()
    console.log('spotId++++++++',spotId)
    //const {spotId} = useParams();
    //console.log('spotIDDDDDD', spotId)
    var allReviews = useSelector(state=>state.reviews.spot)
    console.log('allReviews in single',allReviews)
    
    allReviews= Array.isArray(allReviews) ? allReviews.map(review=>review): []


    console.log('allReviewsTexts', allReviews)

    const sessionUser = useSelector(state=>state.session.user)
    console.log('&&sessionUser', sessionUser)



    useEffect(()=>{
        dispatch(getReviewsBySpotId(spotId))
    },[dispatch])

   return (
    <div>
      <h1>Reviews single spot</h1>
      { 
      allReviews.map(review=>(
          <ReviewsCard key={review.id} 
          review={review} />
          ))
      }
    {/* <ReviewsCard allReviews={allReviews}/> */}
    </div>
  );
}

export default ReviewsSingleSpot;
