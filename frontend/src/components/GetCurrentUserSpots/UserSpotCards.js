import './UserSpotCards.css'
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteASpot } from '../../store/spots';
import EditSpotForm from '../EditSpot/EditSpotForm';


const UserSpotCards = ({name, address, city,id, country, description,previewImage,price}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    console.log('id', id)
    const handelClick = (e)=>{
        history.push(`/spots/${id}`)
    }
    const handelDelete = async (e)=>{
        e.preventDefault()
        await dispatch(deleteASpot(id))
    }
    const handelEdit = () =>{
        history.push(`/spots/${id}/edit`)
    }
  return (
    <div >
        <img src={previewImage} alt='upload' onClick={handelClick} />
        <div >
        <div>{name}</div>
        <div>{address}</div>
        <div>{city}</div>
        <div>{country}</div>
        <div>{description}</div>
        <div>{price}</div>

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
