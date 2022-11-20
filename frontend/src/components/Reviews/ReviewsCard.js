
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import RemoveReview from './RemoveReview';


const ReviewsCard = ({review, spotId}) => {
    console.log('review from reviews card', review)
    console.log('review from reviews card id', review.id)
    const spot =useSelector(state =>state.spotStates.singleSpot)
    console.log('spot+++++',spot)
    
    const dispatch = useDispatch()
    const sessionUser = useSelector(state =>state.session.user)
    console.log('sessionUser', sessionUser)

    const reviews = useSelector(state=>state.reviews.spot)
    console.log('reviews#####',reviews)

//const reviews = allReviews
///console.log('reviews++++++',allReviews)
//console.log(Array.isArray(allReviews))

//const allReviewTexts= Array.isArray(allReviews) ? allReviews.map(review=>review.review) : []
//console.log(allReviewTexts)
//const arr = [1,2,3,4]
//console.log(arr)
//c/onsole.log(Array.isArray(arr))


  return (
    <div style={{padding:20,fontSize:20}}>
      {/* <div className='names'>
        {review.User? review.User.firstName : sessionUser.firstName}
      </div> */}
        <div style={{fontSize:20, margin:20}}>
            {review} {sessionUser && sessionUser.id === review.userId &&(<RemoveReview reviews={reviews}/>)}
        </div>
    </div>
  );
}

export default ReviewsCard;
