import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteSpotbySpotId } from "../../store/spots";
const DeleteSpot = ({spotId}) => {
    //console.log(spotId)
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteSpot = async (e)=>{
        e.preventDefault();
        await dispatch(deleteSpotbySpotId(spotId))
        history.push('/')
        return;
    }
  return (
    <div>
      <button className="delete-spot-Btn" type='button' onClick={deleteSpot}>Delete your spot</button>
    </div>
  );
}

export default DeleteSpot;
