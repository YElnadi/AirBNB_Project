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
      <Header />
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route  exact path="/">
            <GetSpots />
          </Route>
          <Route  path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup"> 
            <SignupFormPage />
          </Route>
          <Route exact path='/api/spots'>
            <CreateSpotForm />
          </Route>
          <Route exact path='/api/spots/current'>
            <CurrentUserSpots/>
          </Route>
          <Route exact path='/api/spot/:spotId'>
            <SpotCard/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;