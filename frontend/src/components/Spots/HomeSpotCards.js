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
                    <div  style={{width:'255px'}}>
                        <div>
                            <h4 style={{ marginLeft: 20, fontSize:16,marginTop:10,lineHeight: 0,fontFamily: 'Geneva, Verdana, sans-serif',fontWeigh:'normal' }}>{spot.city}, {spot.state}</h4>
                        </div>
                        <div style={{ marginLeft: 20, lineHeight: 0, color:'rgb(169,169,169)', fontFamily: 'Geneva, Verdana, sans-serif' }}>
                        </div>

                        <div>
                            <h4 style={{ marginLeft: 20, lineHeight: 0,fontFamily: 'Geneva, Verdana, sans-serif',fontWeight:'bolder' }}>${spot.price} 
                            <span style={{fontWeight:'normal', color:'rgb(96,96,96)'}}> night</span>
                            </h4>
                        </div>
                    </div>
                    <div style={{width:'60px',textAlign:'right'}}>
                        <i style={{ color: 'black', lineHeight: 0  }} className="fa-solid fa-star"></i>
                        {spot.avgRating ? parseFloat(spot.avgRating).toFixed(1) : 'New'}
                    </div>
                </div>

            </div>




        </>
    );
}

export default HomeSpotCards;
