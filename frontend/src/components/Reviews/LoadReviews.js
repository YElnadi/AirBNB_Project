import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviewsBySpotId } from "../../store/reviews";
import ReviewCards from "./ReviewCards";


const LoadReviews = ({spotId}) => {
const dispatch = useDispatch()
console.log('spotId++++++++',spotId)
let allReviews = useSelector(state=>state.reviews.spot)
    console.log('allReviews in single',allReviews)

    allReviews= allReviews.constructor == Object ? Object.values(allReviews): []


    useEffect(()=>{
        dispatch(getReviewsBySpotId(spotId))
    },[dispatch,spotId])

  return (
    <div>
    {
        allReviews.map(review => (
            <ReviewCards key={review.id} review={review}/>
        ))
    }
    </div>
  );
}

export default LoadReviews;
