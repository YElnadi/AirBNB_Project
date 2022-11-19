
import { useSelector } from 'react-redux';

const ReviewsCard = ({allReviews}) => {

//const reviews = allReviews
console.log('reviews++++++',allReviews)
console.log(Array.isArray(allReviews))
//const allReviewTexts= Array.isArray(allReviews) ? allReviews.map(review=>review.review) : []
//console.log(allReviewTexts)
const arr = [1,2,3,4]
console.log(arr)
console.log(Array.isArray(arr))

  return (
    <div>
        {
        (allReviews) ? allReviews.map(review=>
            <li>{review.review}</li>
            ) : []
          ////<li>{allReviewTexts}</li>
        }
    </div>
  );
}

export default ReviewsCard;
