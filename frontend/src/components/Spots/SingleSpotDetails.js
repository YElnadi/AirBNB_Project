import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getSingleSpotDetails } from "../../store/spots";


const SingleSpotDetails = () => {
    const { spotId } = useParams()
    console.log('spotId', spotId)
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    console.log('sessionUser####', sessionUser)
    const spot = useSelector(state => state.spots.singleSpot)
    console.log('####spot####', spot)

    useEffect(() => {
        dispatch(getSingleSpotDetails(spotId))
    }, [dispatch, spotId])

    const avg = () => {
        if (spot.avgStarRating === null)
            return 'new'
        else if (typeof spot.avgStarRating === 'string' || spot.avgStarRating instanceof String)
            return parseFloat(spot.avgStarRating).toFixed(2)
        else
            return spot.avgStarRating.toFixed(2)
    }


    //console.log('spot',spot)
    if (!spot.SpotImages) return null;

    return (

        <div>
            {/* <h1>Spot Details</h1> */}
            <div style={{ margin: 0, position: 'absolute', top: 150, left: 350 }}>
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                    <div style={{ fontSize: 40 }}>{spot.name}</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <h4><i class="fa-solid fa-star" style={{ color: 'black' }}></i>{avg()}</h4>
                        <h4>. {spot.numReviews} reviews</h4>
                        <h4 style={{ fontWeight: 'normal' }}>. Superhost .</h4>
                        <h4 style={{ textDecoration: 'underline' }}>{spot.city}.{spot.state}.{spot.country}</h4>
                    </div>
                </div>
                <div>
                    <img src={spot.SpotImages[0].url} style={{ width: 700 }} />
                </div>
                <div style={{ lineHeight: 0.5, border: 'solid 1px black', borderRight: 0, borderLeft: 0, borderTop: 0, paddingTop: 20, paddingBottom: 20 }}>
                    <h2 style={{ fontWeight: 'normal', fontSize: 25, fontFamily: 'sans-serif' }}>Entire home hosted by Kia And Rob</h2>
                    <h3 style={{ fontWeight: 'normal', fontFamily: 'sans-serif', color: 'rgb(80,80,80)', fontSize: 17 }}>14 guests . 5 bedrooms . 9 beds . 3.5 baths</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 20, gap: 8, paddingBottom: 0 }}>
                     
                        <div><i class="fa-solid fa-desktop" style={{color:"black"}}></i></div>
                        <div style={{display:'flex', flexDirection:'column', paddingBottom:30}}>
                        <div><strong>Dedicated Workspace</strong></div>
                        <div>A common area with wifi that's well-suited for working</div>
                        </div>
                    
                </div>

            </div>

        </div>
    );
}

export default SingleSpotDetails;
