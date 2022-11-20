
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import RemoveReview from './RemoveReview';


const ReviewsCard = ({review}) => {
    console.log('review from reviews card', review)

    const sessionUser = useSelector(state =>state.session.user)
    console.log('sessionUser', sessionUser)

    return (
      <div style={{padding:20,fontSize:20}}>
        <div className='names'>
          {review.User.firstName}
        </div>
          <div style={{fontSize:20, margin:20}}>
              {review.review}
              {sessionUser && sessionUser.id === review.userId &&(<RemoveReview review={review}/>)}
          </div>
      </div>
    );
}

export default ReviewsCard;
