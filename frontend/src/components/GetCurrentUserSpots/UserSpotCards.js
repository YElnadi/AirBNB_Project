import './UserSpotCards.css'
import { useHistory } from 'react-router-dom';


const UserSpotCards = ({name, address, city, country, description,previewImage}) => {
    // const history = useHistory()
    // const handelClick = (e)=>{
    //     history.push(`/spots/${id}`)
    // }
  return (
    <div className='spot-card'>
        <img src={previewImage} className='spot-image' />
        <div className='card-info'>
        <div>{name}</div>
        <div>{address}</div>
        <div>{city}</div>
        <div>{country}</div>
        <div>{description}</div>
        </div>



    </div>
  );
}

export default UserSpotCards;
