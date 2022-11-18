import './SpotsCards.css'
import { NavLink, useHistory } from 'react-router-dom';
import { Route } from 'react-router-dom';
import SpotDetails from '../../components/GetAllSpots/SpotDetails'
import ReviewsSingleSpot from '../Reviews/ReviewsSingleSpot';


const SpotCard = ({ spot }) => {
  const history = useHistory()
  const handelClick = (e) => {
    history.push(`/spots/${spot.id}`)
    //<NavLink to= {`api/spots/${id}`}></NavLink>
  }
  return (

    <div >
      <div style={{ display:'flex', justifyContent:'space-evenly'}}>
      <div className='card'>
        <img className='card--image'src={spot.previewImage} onClick={handelClick} />
      </div>
      </div>
      <div className='spot--card--info' >
        <div className='spot--city--state'>
          <h3>{spot.city},{spot.state}</h3>
        </div>
        <div>
          <p><i class="fa-solid fa-star"></i>{`${spot.avgRating}`}</p>
        </div>
      </div>
      <div>
        <h4 className='spot--price'>${spot.price}night</h4>
      </div>


    </div>

  );
}

export default SpotCard;
