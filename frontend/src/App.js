import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Header from './components/Header/header'
import CreateSpotForm from "./components/CreateSpotForm/CreateSpot";
import CurrentUserSpots from "./components/GetCurrentUserSpots/CurrentUserSpots";
import GetAllSpots from './components/GetAllSpots/GetSpots'
import GetSpots from "./components/GetAllSpots/GetSpots";
import SpotCard from "./components/GetAllSpots/SpotCard";
import SpotDetails from "./components/GetAllSpots/SpotDetails";
import EditSpotForm from "./components/EditSpot/EditSpotForm";
import SignupFormModal from "./components/SignUpFormModel";
import ReviewsCard from "./components/Reviews/ReviewsCard";
import CreateReviewForm from "./components/Reviews/CreateReviewForm";
import ReviewsSingleSpot from "./components/Reviews/ReviewsSingleSpot";
import RemoveReview from './components/Reviews/RemoveReview'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    /*
    Home
    Header
    cards
  
    */ 
    <>
     
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          
          <Route  exact path="/">
            <GetSpots />
          </Route>
           <Route path="/signup"> 
            <SignupFormModal />
          </Route> 
          <Route exact path='/spots'>
            <CreateSpotForm />
          </Route>
          <Route exact path='/spots/current'>
            <CurrentUserSpots/>
          </Route>
          <Route exact path='/spots/:spotId'>
            <SpotDetails/>
          </Route>
          <Route exact path='/spots/:spotId/edit'>
            <EditSpotForm/>
          </Route>
          <Route exact path='/spots/:spotId/reviews'>
            <CreateReviewForm/>
          </Route>
          <Route exact path='/spots/:spotId/reviews'>
            <ReviewsSingleSpot/>
          </Route>
          <Route exact path='/spots/:spotId/reviews/:reviewId'>
            <RemoveReview/>
          </Route>
          <Route>
            Page Not Found
          </Route>
         
        </Switch>
      )}
    </>
  );
}

export default App;