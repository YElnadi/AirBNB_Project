import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loadSpots } from "../../store/spots";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {getSpots} from '../../store/spots'


const GetSpots = () => {
    const dispatch = useDispatch()
    const allSpots = useSelector(state=>state.spotStates.spots)
    console.log('allSpots',allSpots)
    const spots = Object.values(allSpots)


    useEffect(()=>{
        dispatch(getSpots())
    },[dispatch])

  return (
    <div>
        <h1>Spots List</h1>
        <ol>
            {spots.map(spot=>(
                <li key={spot.id}> <NavLink to={`/spot/${spot.id}`}>{spot.address}</NavLink></li>
            ))}
        </ol>
      
    </div>
  );
}

export default GetSpots;
