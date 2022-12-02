import { NavLink, useHistory, Route } from "react-router-dom";
import './Home.css'

const HomeSpotCards = ({ spot }) => {
    console.log('spot from home spot cards', spot)
    const history = useHistory();

    return (
        <div >
            <div >
                <div>
                    <img style={{height:300, width:300, margin:20,  }}src={spot.previewImage} />
                </div>
            </div>

        </div>
    );
}

export default HomeSpotCards;
