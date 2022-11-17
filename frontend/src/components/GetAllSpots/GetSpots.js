import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loadSpots } from "../../store/spots";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {getSpots} from '../../store/spots'
import SpotCard from "./SpotCard";


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
        
        <ol>
            {spots.map(spot=>(
                <SpotCard key={spot.id}{...spot}/>
            ))}
        </ol>
      
    </div>
  );
}

export default GetSpots;
