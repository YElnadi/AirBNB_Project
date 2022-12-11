import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react';
import {NavLink} from 'react-router-dom'
import { getAllSpots } from '../../store/spots';
import HomeSpotCards from './HomeSpotCards';
import './Home.css'


const Home = () => {
    const dispatch = useDispatch();
    const allSpots = useSelector(state=>state.spots.spots)
   // console.log('all spots from home', allSpots)
    const spotsList = Object.values(allSpots)
    //console.log('spotsList from Home', spotsList)

    useEffect(()=>{
        dispatch(getAllSpots())
    }, [dispatch])

  return (
    // <div 
    // className="tmp"
    // >
    <div className='spots-container'>
        {spotsList.map(spot =>(
            <HomeSpotCards key={spot.id} spot={spot}/>
        ))}
      
    </div>
    // </div>
  );
}

export default Home;
