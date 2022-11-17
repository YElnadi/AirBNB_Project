import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSingleSpot } from "../../store/spots";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCurrentUserSpots } from "../../store/spots";
import UserSpotCards from "./UserSpotCards";
import { useHistory } from "react-router-dom";
const CurrentUserSpots = () => {
  const history = useHistory()
  const currentUser = useSelector(state=>state.session.user)
  console.log('currentUserId',currentUser.id)
  const userSpots = useSelector(state =>state.spotStates.spots)
  //console.log('spots', spots)
  //const userSpots = spots.Spots
  // console.log('spots', spots.Spots)
  //console.log('currentUser:', currentUser)
  const dispatch = useDispatch()

//   const sessionUser = useSelector(state => state.session.user);
//   if(!sessionUser.logout){
//     history.push('/')
// }

  useEffect(()=>{
    dispatch(getCurrentUserSpots())
  },[dispatch])
  // console.log(spots)
  // console.log(spots.length)
  // if(spots === undefined || spots === null || spots.Spots === undefined || currentUser.id !== spots.Spots[0].ownerId) return null
  if(!Object.values(userSpots).length) return null
  //console.log('userSpots',userSpots[0].name)

  return (
    <div>
      <h1>current user spots</h1>

      {
        Object.values(userSpots).map(userSpot=>(
          <UserSpotCards key={userSpot.id} {...userSpot}/>
  
        ))
        
      }
    
    </div>
  );
}

export default CurrentUserSpots;
