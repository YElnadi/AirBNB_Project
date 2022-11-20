import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteSpotReview, getReviewsBySpotId } from "../../store/reviews";
import { useEffect } from "react";

const RemoveReview = ({review}) => {
    // console.log('review$$$$$',review)
    const dispatch = useDispatch();
    const history = useHistory();
    // const {spotId} = useParams();
    // console.log('spotIdxxxxxxx',spotId)
    // const sessionUser = useSelector(state=>state.session.user)
    // console.log('sessionUser', sessionUser)
    // const reviewsArr = useSelector(state=>state.reviews.spot)
    // //console.log('reviewsArr',reviewsArr)
    // //console.log(Array.isArray(reviewsArr))

    // // const myReviews = Object.values(reviewsArr).find(review=>review.User.id ===sessionUser.id)
    // // console.log('my reviewsxxxxxx', myReviews)

    // useEffect(()=>{
    //     dispatch(getReviewsBySpotId(spotId))
    // },[dispatch])

    const deleteReview =(e)=>{
        e.preventDefault();
        dispatch(deleteSpotReview(review.id))
        history.go(0)
    }

  return (
    <div>
      {/* <h2>Delete review</h2> */}
      <button type='button' onClick={deleteReview}>Delete your review</button>
    </div>
  );
}

export default RemoveReview;
