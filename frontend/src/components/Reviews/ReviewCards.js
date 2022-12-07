import { useSelector, useDispatch } from "react-redux";
import RemoveReview from "./RemoveReview";


const ReviewCards = ({ review }) => {
    //console.log('review from reviews card', review)

    const sessionUser = useSelector(state => state.session.user)
    //console.log('sessionUser', sessionUser)

    return (
        <div>
            <div style={{marginBottom:-30}}>
            <div style={{ display: 'flex', gap: 8 }}>
                <div><i className="fa-solid fa-circle-user" style={{ fontSize: 60 }}></i></div>
                <div>
                <div style={{ marginTop: 10, textTransform: 'capitalize' }}>
                    {review.User.firstName}
                    </div>
                <div style={{color:'rgb(120,120,120)'}}>October 2022</div>
                </div>
            </div>

         
            <div style={{paddingBottom:50, marginTop:20}} >{review.review}</div>
            </div>
            {sessionUser && sessionUser.id === review.userId &&(<RemoveReview review={review}/>)}
         

        </div>
    );
}

export default ReviewCards;
