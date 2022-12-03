import { NavLink, useHistory, Route, Switch } from "react-router-dom";
import './Home.css'
import SingleSpotDetails from "./SingleSpotDetails";
import { useParams } from "react-router-dom";

const HomeSpotCards = ({ spot }) => {
    //console.log('spot from home spot cards', spot)
    console.log('spot#####',spot)
    console.log('spotId###', spot.id)
    //const {spotId} = useParams();
    //console.log('spotId#####',spotId)
    const history = useHistory();

    const openSpot = (e)=>{
        history.push(`/spots/${spot.id}`)
    }

    return (
        <>
        <div >
            <div>
                <div className="spot-card">
                    <img onClick = {openSpot} className='spot-card-image' src={spot.previewImage} alt='preview' />
                </div>
            </div>
            <div>
                <div>
                    <h4 style={{ marginLeft: 20 }}>{spot.city}, {spot.state}</h4>
                </div>
                <div style={{ marginLeft: 20, color: 'rgb(184,184,184)', fontFamily: 'Geneva, Verdana, sans-serif' }}>
                    <h4>10,995 ft elevation</h4>
                    <h4>Dec 6 - 11</h4>
                </div>
                <div>
                    <i style={{ marginLeft: 20, color: 'black' }} className="fa-solid fa-star"></i>
                    {spot.avgRating ? parseFloat(spot.avgRating).toFixed(2) : 'New'}
                </div>
                <div>
                    <h4 style={{ marginLeft: 20 }}>${spot.price} night</h4>
                </div>
            </div>
            
        </div>

        
        
        
        </>
    );
}

export default HomeSpotCards;
