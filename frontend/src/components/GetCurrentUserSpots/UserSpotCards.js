import './UserSpotCards.css'
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteASpot } from '../../store/spots';
import ReviewsSingleSpot from '../Reviews/ReviewsSingleSpot'
import EditSpotForm from '../EditSpot/EditSpotForm';
import './UserSpotCards.css'


const UserSpotCards = ({ userSpot }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    console.log('id', userSpot.id)
    const handelClick = (e) => {
        history.push(`/spots/${userSpot.id}`)
    }
    const handelDelete = async (e) => {
        e.preventDefault()
        await dispatch(deleteASpot(userSpot.id))
    }
    const handelEdit = () => {
        history.push(`/spots/${userSpot.id}/edit`)
    }
    return (
        <div >
            <h1>
            </h1>
            <div>
                <img  src={userSpot.previewImage} alt='upload' style={{height:300, width:400, marginLeft:30, borderRadius:20 }} />
            </div>
            <div>
                <h1 style={{marginLeft:30}}>hosted by {userSpot.name}</h1>
                <div style={{marginLeft:30}}> Located in {userSpot.address}</div>
                <div style={{marginLeft:30}}>{userSpot.city}, {userSpot.country}</div>
                <h3></h3>
                <p style={{marginLeft:30}}>{userSpot.description}</p>
                <div style={{marginLeft:30}}>it costs {userSpot.price} per night</div>

                <div className='user--button'>
                <div>
                    <button style={{padding:25, marginLeft:30,marginTop:20, width:100, borderRadius:10,background:'red', fontWeight:'bold'
                    }} onClick={handelEdit}>Edit</button>
                </div>
                <div>
                    <button style={{padding:25, marginLeft:30,marginTop:20, width:100, borderRadius:10, background:'red', fontWeight:'bold'}}onClick={handelDelete}>Delete</button>
                </div>
                </div>
            </div>
     <ReviewsSingleSpot spotId={userSpot.id}/> 



        </div>
    );
}

export default UserSpotCards;
