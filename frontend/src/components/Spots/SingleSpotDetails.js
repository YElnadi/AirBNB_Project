import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getSingleSpotDetails } from "../../store/spots";
import LoadReviews from "../Reviews/LoadReviews";
import DeleteSpot from "./DeleteSpot";
import './SingleSpotDetails.css'
import EditSpotModal from '../EditSpotModal'
import CreateReview from "../Reviews/CreateReviewModel";
import CreateReviewModel from "../Reviews/CreateReviewModel";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";


const SingleSpotDetails = () => {
    const { spotId } = useParams()
    //console.log('spotId++++++', spotId)
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    //console.log('sessionUser####', sessionUser)
    const spot = useSelector(state => state.spots.singleSpot)
    let reviews = useSelector(state => state.reviews.spot)

    const didUserAlreadyReview = (reviewsDict, userId) => {
        const reviewsList = Object.values(reviewsDict)
        return reviewsList.filter(review => review.userId === userId).length > 0
    }

    //console.log('####spot####', spot)
    //////////////////////////
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
    const closeMenu = () => setShowMenu(false);









    ////////////////////////////////////////
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

        <div id='main'>
            {/* <h1>Spot Details</h1> */}
            <div
            // style={{ margin: 0, position: 'absolute', top: 150, left: 350 }}
            >
                <div className='above-spot-image'>
                    <div className='spot-name'>{spot.name}</div>
                    <div className="before-image">
                        <h4 style={{ fontWeight: 'normal' }}><i className="fa-solid fa-star" style={{ color: 'black' }}></i>{avg()} &middot; </h4>
                        <h4 style={{ fontWeight: 'normal', textDecoration: 'underline' }}>{spot.numReviews} reviews</h4>
                        <h4 style={{ fontWeight: 'normal' }}>&middot; Superhost &middot;</h4>
                        <h4 style={{ textDecoration: 'underline', fontWeight: 'normal' }}>{spot.city},{spot.state},{spot.country}</h4>
                    </div>
                </div>
                <div>
                    <img src={spot.SpotImages[0].url} style={{ width: '100%', borderRadius: '15px' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div>
                        <div className="host">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h2 style={{ fontWeight: 'normal', fontSize: 25, fontFamily: 'Geneva, Verdana, sans-serif', inlineSize: 700, overflowWrap: 'break-word' }}>Entire home hosted by Kia And Rob</h2>
                            </div>
                            <h3 style={{ fontWeight: 'normal', fontFamily: 'Geneva, Verdana, sans-serif', color: 'rgb(80,80,80)', fontSize: 17 }}>14 guests &middot; 5 bedrooms &middot; 9 beds &middot; 3.5 baths</h3>
                        </div>
                        <div style={{ borderBottom: 'solid 1px black', paddingTop: 20, paddingBottom: 20 }}>
                            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 20, marginTop: 20, gap: 8, paddingBottom: 0 }}>

                                <div><i className="fa-solid fa-desktop" style={{ color: "black" }}></i></div>
                                <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 30, fontFamily: 'sans-serif' }}>
                                    <div><strong>Dedicated workspace</strong></div>
                                    <div style={{ color: 'rgb(120,120,120)', fontFamily: 'Geneva, Verdana, sans-serif' }}>A common area with wifi that's well-suited for working</div>
                                </div>


                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 20, gap: 8, paddingBottom: 0 }}>
                                <div><i className="fa-solid fa-door-open" style={{ color: "black" }}></i> </div>
                                <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 30, fontFamily: 'sans-serif' }}>
                                    <div><strong>Self check-in</strong></div>
                                    <div style={{ color: 'rgb(120,120,120)', fontFamily: 'Geneva, Verdana, sans-serif' }}>Check yourself in with the keypad.</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 20, gap: 8, paddingBottom: 0 }}>
                                <div><i className="fa-regular fa-user" style={{ color: "black" }}></i> </div>
                                <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 30, fontFamily: 'sans-serif' }}>
                                    <div><strong>Kia And Rob is a Superhost</strong></div>
                                    <div style={{ color: 'rgb(120,120,120)', inlineSize: 700, overflowWrap: 'break-word', fontFamily: 'Geneva, Verdana, sans-serif', inlineSize: 700, overflowWrap: 'break-word' }}>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</div>
                                </div>
                            </div>
                        </div>
                        {/* <div className='price-box2'>Price here</div> */}
                        <div style={{ paddingBottom: 30, paddingTop: 30, fontWeight: 'bold', fontSize: 50, fontFamily: 'sans-serif', lineHeight: 1, border: 'solid 1px black', borderRight: 0, borderLeft: 0, borderTop: 0, paddingTop: 20, paddingBottom: 20 }}>
                            <span style={{ color: 'red' }}>a</span>
                            <span style={{ color: 'red' }}>i</span>
                            <span style={{ color: 'red' }}>r</span>
                            <span style={{ color: 'black' }}>c</span>
                            <span style={{ color: 'black' }}>o</span>
                            <span style={{ color: 'black' }}>v</span>
                            <span style={{ color: 'black' }}>e</span>
                            <span style={{ color: 'black' }}>r</span>
                            <p style={{ fontSize: 17, fontWeight: 'normal', color: 'rgb(80,80,80)', inlineSize: 700, overflowWrap: 'break-word', fontFamily: 'Geneva, Verdana, sans-serif' }}>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
                        </div>
                        <div style={{ borderBottom: '1px black solid' }}>
                            <div style={{ paddingBottom: 30, paddingTop: 30, fontSize: 17, fontWeight: 'normal', fontFamily: 'Geneva, Verdana, sans-serif', color: 'rgb(80,80,80)', paddingTop: 20, paddingBottom: 20, inlineSize: 700, overflowWrap: 'break-word' }}>
                                {spot.description}
                            </div>
                        </div>
                    </div>
                    <div className='price-box'>
                        <div style={{ display: 'flex', alignItems: 'baseline', borderBottom: '1px silver solid', gap: '30px' }}>


                            <div style={{ display: 'flex', gap: '1px', alignItems: 'baseline' }}>
                                <spam style={{ fontWeight: 'bold', fontSize: '27px', fontFamily: 'Geneva, Verdana, sans-serif' }}>${spot.price} </spam>
                                <spam style={{ fontFamily: 'Geneva, Verdana, sans-serif' }}>night </spam>

                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', fontFamily: 'Geneva, Verdana, sans-serif' , marginLeft:'10px'}}>
                                <div ><i className="fa-solid fa-star" style={{ color: 'black' }}></i></div>
                                <div style={{display:'flex', gap:'10px'}}>
                                <div >{avg()}</div>
                                <div>&middot;{' '}{spot.numReviews}{' '}reviews</div>
                                </div> 
                            </div>



                        </div>
                        <div>
                            <h4 style={{ fontFamily: 'Geneva, Verdana, sans-serif' }}>{spot.name} that is hosted by Kia and Rob is located at {spot.address}, {spot.city}, {spot.state}, {spot.country}.</h4>
                        </div>
                        <div className='edit-delete-spot-Btns'>
                            {sessionUser && sessionUser.id === spot.ownerId &&
                                (<DeleteSpot spotId={spotId} />)}

                            {sessionUser && sessionUser.id === spot.ownerId &&
                                (<OpenModalMenuItem
                                    itemText={<button className='edit-spot-Btn'>Edit your spot</button>}
                                    onItemClick={closeMenu}
                                    modalComponent={<EditSpotModal key={spotId} />}
                                />
                                )}
                        </div>

                        <div style={{ paddingBottom: 30, paddingTop: 30, fontSize: 17, fontWeight: 'normal', fontFamily: 'sans-serif', paddingTop: 20, paddingBottom: 20, inlineSize: 700, display: 'block', textAlign: '' }}>
                            {sessionUser && sessionUser.id !== spot.ownerId && !didUserAlreadyReview(reviews, sessionUser.id) && (
                                <OpenModalMenuItem
                                    itemText={<button className="leave-review-Btn">Leave a review</button>}
                                    onItemClick={closeMenu}
                                    modalComponent={<CreateReviewModel key={spotId} spotId={spotId} />}
                                />

                            )}
                        </div>


                    </div>

                </div>










                <div style={{ display: 'flex', gap: 8, paddingBottom: 50, paddingTop: 50, fontSize: 25, alignItems: 'baseline' }}>
                    <div style={{ fontWeight: 'bold', fontFamily: 'Geneva, Verdana, sans-serif' }}><i className="fa-solid fa-star" style={{ color: 'black', }}></i>{avg()} &middot; </div>
                    <div style={{ fontWeight: 'bold', fontFamily: 'Geneva, Verdana, sans-serif' }}>{spot.numReviews} reviews</div>
                </div>

                <LoadReviews spotId={spotId} />


            </div>


        </div>
    );
}

export default SingleSpotDetails;
