import { NavLink, useHistory, Route, Switch } from "react-router-dom";
import './Home.css'
import SingleSpotDetails from "./SingleSpotDetails";
import { useParams } from "react-router-dom";

const HomeSpotCards = ({ spot }) => {
    //console.log('spot from home spot cards', spot)
    //console.log('spot#####', spot)
    //console.log('spotId###', spot.id)
    const {spotId} = useParams();
    //console.log('spotId#####',spotId)
    const history = useHistory();

    const openSpot = (e) => {
        history.push(`/spots/${spot.id}`)
    }

    return (
        <>
            <div >
                <div>
                    <div className="spot-card">
                        <img onClick={openSpot} className='spot-card-image'   src={spot.previewImage} ></img>
                    </div>
                </div>
                <div style={{display:'flex', flexDirection:'row',}}>
                    <div>
                        <div>
                            <h4 style={{ marginLeft: 20, fontSize:16,marginTop:10,lineHeight: 0,fontFamily: 'sans-serif',fontWeigh:'normal' }}>{spot.city}, {spot.state}</h4>
                        </div>
                        <div style={{ marginLeft: 20, lineHeight: 0,fontFamily: 'sans-serif', color:'rgb(169,169,169)', fontFamily: 'Geneva, Verdana, sans-serif' }}>
                            <h4>10,995 ft elevation</h4>
                            <h4>Dec 6 - 11</h4>
                        </div>

                        <div>
                            <h4 style={{ marginLeft: 20, lineHeight: 0,fontFamily: 'sans-serif' }}>${spot.price} 
                            <span style={{fontWeight:'normal'}}> night</span>
                            </h4>
                        </div>
                    </div>
                    <div>
                        <i style={{ marginLeft: 70, color: 'black', lineHeight: 0,  }} className="fa-solid fa-star"></i>
                        {spot.avgRating ? parseFloat(spot.avgRating).toFixed(1) : 'New'}
                    </div>
                </div>

            </div>




        </>
    );
}

export default HomeSpotCards;
