import './SpotsCards.css'
import { NavLink, useHistory } from 'react-router-dom';
import { Route } from 'react-router-dom';
import SpotDetails from '../../components/GetAllSpots/SpotDetails'


const SpotCard = ({previewImage,state,country,price,city,id,avgRating}) => {
const history = useHistory()
const handelClick = (e) =>{
    history.push(`/spots/${id}`)
   //<NavLink to= {`api/spots/${id}`}></NavLink>
}
  return (
    <div className='spot-card'>
        {/* {<>
            <NavLink to = {`/api/spots/${id}`}><img src={previewImage} className='spot-image'/></NavLink>
            <SpotDetails />
        </> */}
        
        <img src={previewImage} className='spot-image' onClick={handelClick}/>
        <ul className='card-info'>
            <li>
                <h3>{city},{state}</h3>
                <p>${price} night</p>
            </li>
        </ul>
        <div className='spot-rating'>
        <p><i class="fa-solid fa-star"></i>{`${avgRating}`}</p>
        </div>
        
    </div>
  );
}

export default SpotCard;
