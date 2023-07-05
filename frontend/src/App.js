import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Route } from "react-router-dom";
import Home from "./components/Spots/Home";
import SingleSpotDetails from "./components/Spots/SingleSpotDetails";
import Reserve from "./components/Reserve/Reserve";
import User_bookings from "./components/Bookings/User_bookings";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/newbooking/:spotId/:startDate/:endDate">
            <Reserve />
          </Route>
          <Route exact path="/spots/:spotId">
            <SingleSpotDetails />
          </Route>
          <Route exact path="/bookings/:userId">
            <User_bookings/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
