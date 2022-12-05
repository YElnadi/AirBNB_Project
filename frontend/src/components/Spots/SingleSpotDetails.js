import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getSingleSpotDetails } from "../../store/spots";
import LoadReviews from "../Reviews/LoadReviews";
import DeleteSpot from "./DeleteSpot";


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
            return parseFloat(spot.avgStarRating).toFixed(1)
        else
            return spot.avgStarRating.toFixed(1)
    }


    //console.log('spot',spot)
    if (!spot.SpotImages) return null;

    return (

        <div>
            {/* <h1>Spot Details</h1> */}
            <div style={{ margin: 0, position: 'absolute', top: 150, left: 350 }}>
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                    <div style={{ fontSize: 40, fontFamily: 'sans-serif' }}>{spot.name}</div>
                    <div style={{ display: 'flex', gap: 8, fontFamily: 'sans-serif', }}>
                        <h4 style={{ fontWeight: 'normal' }}><i className="fa-solid fa-star" style={{ color: 'black' }}></i>{avg()} . </h4>
                        <h4 style={{ fontWeight: 'normal', textDecoration: 'underline' }}>{spot.numReviews} reviews</h4>
                        <h4 style={{ fontWeight: 'normal' }}>. Superhost .</h4>
                        <h4 style={{ textDecoration: 'underline', fontWeight: 'normal' }}>{spot.city}.{spot.state}.{spot.country}</h4>
                    </div>
                </div>
                <div>
                    <img src={spot.SpotImages[0].url} style={{ width: 800 }} />
                </div>
                <div style={{ lineHeight: 0.5, border: 'solid 1px black', borderRight: 0, borderLeft: 0, borderTop: 0, paddingTop: 20, paddingBottom: 20 }}>
                    <h2 style={{ fontWeight: 'normal', fontSize: 25, fontFamily: 'sans-serif' }}>Entire home hosted by Kia And Rob</h2>
                    <h3 style={{ fontWeight: 'normal', fontFamily: 'sans-serif', color: 'rgb(80,80,80)', fontSize: 17 }}>14 guests . 5 bedrooms . 9 beds . 3.5 baths</h3>
                </div>
                <div style={{ border: 'solid 1px black', borderTop: 'none', borderLeft: 'none', borderRight: 'none', paddingTop: 20, paddingBottom: 20 }}>
                    <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 20, marginTop: 20, gap: 8, paddingBottom: 0 }}>

                        <div><i className="fa-solid fa-desktop" style={{ color: "black" }}></i></div>
                        <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 30, fontFamily: 'sans-serif' }}>
                            <div><strong>Dedicated workspace</strong></div>
                            <div style={{ color:'rgb(120,120,120)' }}>A common area with wifi that's well-suited for working</div>
                        </div>


                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 20, gap: 8, paddingBottom: 0 }}>
                        <div><i className="fa-solid fa-door-open" style={{ color: "black" }}></i> </div>
                        <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 30, fontFamily: 'sans-serif' }}>
                            <div><strong>Self check-in</strong></div>
                            <div style={{ color:'rgb(120,120,120)' }}>Check yourself in with the keypad.</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 20, gap: 8, paddingBottom: 0 }}>
                        <div><i className="fa-regular fa-user" style={{ color: "black" }}></i> </div>
                        <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 30, fontFamily: 'sans-serif' }}>
                            <div><strong>Kia And Rob is a Superhost</strong></div>
                            <div style={{ color:'rgb(120,120,120)', inlineSize: 700, overflowWrap: 'break-word' }}>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</div>
                        </div>
                    </div>
                </div>
                <div style={{ paddingBottom: 30, paddingTop: 30, fontWeight: 'bold', fontSize: 50, fontFamily: 'sans-serif', lineHeight: 1,border: 'solid 1px black', borderRight: 0, borderLeft: 0, borderTop: 0, paddingTop: 20, paddingBottom: 20  }}>
                    <span style={{ color: 'red' }}>a</span>
                    <span style={{ color: 'red' }}>i</span>
                    <span style={{ color: 'red' }}>r</span>
                    <span style={{ color: 'black' }}>c</span>
                    <span style={{ color: 'black' }}>o</span>
                    <span style={{ color: 'black' }}>v</span>
                    <span style={{ color: 'black' }}>e</span>
                    <span style={{ color: 'black' }}>r</span>
                    <p style={{ fontSize: 17, fontWeight: 'normal', color: 'rgb(80,80,80)', inlineSize: 700, overflowWrap: 'break-word' }}>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
                </div>

                {sessionUser && sessionUser.id === spot.ownerId &&(<DeleteSpot spotId={spotId}/>)}

                

                
                <div style={{display:'flex', gap:8,paddingBottom: 50, paddingTop: 50, fontSize:25}}>
                <div style={{ fontWeight: 'bold' }}><i className="fa-solid fa-star" style={{ color: 'black' }}></i>{avg()} . </div>
                <div style={{ fontWeight: 'bold' }}>{spot.numReviews} reviews</div>
                </div>

                <LoadReviews spotId={spotId} />


            </div>


        </div>
    );
}

export default SingleSpotDetails;
