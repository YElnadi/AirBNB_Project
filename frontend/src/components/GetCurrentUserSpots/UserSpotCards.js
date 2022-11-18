import './UserSpotCards.css'
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteASpot } from '../../store/spots';
import EditSpotForm from '../EditSpot/EditSpotForm';


const UserSpotCards = ({userSpot}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    console.log('id', userSpot.id)
    const handelClick = (e)=>{
        history.push(`/spots/${userSpot.id}`)
    }
    const handelDelete = async (e)=>{
        e.preventDefault()
        await dispatch(deleteASpot(userSpot.id))
    }
    const handelEdit = () =>{
        history.push(`/spots/${userSpot.id}/edit`)
    }
  return (
    <div >
        <img src={userSpot.previewImage} alt='upload' onClick={handelClick} />
        <div >
        <div>{userSpot.name}</div>
        <div>{userSpot.address}</div>
        <div>{userSpot.city}</div>
        <div>{userSpot.country}</div>
        <div>{userSpot.description}</div>
        <div>{userSpot.price}</div>

        <div>
            <button onClick={handelEdit}>Edit</button>
        </div>
        <div>
            <button onClick={handelDelete}>delete</button>
        </div>
        </div>



    </div>
  );
}

export default UserSpotCards;
