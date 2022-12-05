import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteSpotbySpotId } from "../../store/spots";
const DeleteSpot = ({spotId}) => {
    //console.log(spotId)
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteSpot = (e)=>{
        e.preventDefault();
        dispatch(deleteSpotbySpotId(spotId))
        history.push('/')
        return;
    }
  return (
    <div>
      <button type='button' onClick={deleteSpot}>Delete your spot</button>
    </div>
  );
}

export default DeleteSpot;
