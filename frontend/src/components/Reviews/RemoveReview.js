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
      {/* <h2>Delete review</h2> */}
      <button type='button' onClick={deleteReview} className="delete-button" style={{padding:10, marginBottom:90, lineHeight:1, borderRadius:10, cursor:'pointer'}}>Delete your review</button>
    </div>
  );
}

export default RemoveReview;
