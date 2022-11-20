import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteSpotReview, getReviewsBySpotId } from "../../store/reviews";
import { useEffect } from "react";

const RemoveReview = ({reviews}) => {
    console.log('review$$$$$',reviews)
    const dispatch = useDispatch();
    const history = useHistory();
    const {spotId} = useParams();
    console.log('spotIdxxxxxxx',spotId)
    const sessionUser = useSelector(state=>state.session.user)
    console.log('sessionUser', sessionUser)
    const reviewsArr = useSelector(state=>state.reviews.spot)
    //console.log('reviewsArr',reviewsArr)
    //console.log(Array.isArray(reviewsArr))

    // const myReviews = Object.values(reviewsArr).find(review=>review.User.id ===sessionUser.id)
    // console.log('my reviewsxxxxxx', myReviews)

    useEffect(()=>{
        dispatch(getReviewsBySpotId(spotId))
    },[dispatch])

    // const deleteReview =(e)=>{
    //     e.preventDefault();
    //     dispatch(deleteSpotReview(myReviews.id))
    //     history.push(`/`)
    // }

  return (
    <div>
      <h1>Delete review</h1>
      {/* <button type='button' onClick={deleteReview}>Delete your review</button> */}
    </div>
  );
}

export default RemoveReview;
