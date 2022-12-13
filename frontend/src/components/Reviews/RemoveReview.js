import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import {deleteSpotReview} from '../../store/reviews'
import './Reviews.css'
import {getSingleSpotDetails} from '../../store/spots'




function RemoveReview({review}) {
  const dispatch = useDispatch();
  const history = useHistory();
  console.log('review from review cards',review)

  const deleteReview =(e)=>{
    e.preventDefault();
    dispatch(deleteSpotReview(review.id))
    dispatch(getSingleSpotDetails(review.spotId))

    // history.go(0)
}


  return (
    <div>
      <button className="delete-review-Btn" type='button' onClick={deleteReview} >Delete your review</button>
    </div>
  );
}

export default RemoveReview;
