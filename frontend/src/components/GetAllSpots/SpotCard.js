import './SpotsCards.css'
import { NavLink, useHistory } from 'react-router-dom';
import { Route } from 'react-router-dom';
import SpotDetails from '../../components/GetAllSpots/SpotDetails'


const SpotCard = ({spot}) => {
const history = useHistory()
const handelClick = (e) =>{
    history.push(`/spots/${spot.id}`)
   //<NavLink to= {`api/spots/${id}`}></NavLink>
}
  return (
    
    <div >
        <div className='spot--card'>
        <img className='spot--card--image'src={spot.previewImage} onClick={handelClick}/>
        </div>
        <div >
            <div>
                <div>
                  <h3>{spot.city},{spot.state}</h3>
                  </div>
                  <div>
                <h4 className='spot--price'><b>${spot.price}</b> night</h4>
                </div>
            </div>
        </div>
        <div >
        <p><i class="fa-solid fa-star"></i>{`${spot.avgRating}`}</p>
        </div>
        
    </div>
    
  );
}

export default SpotCard;
