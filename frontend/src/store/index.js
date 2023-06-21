import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reviewReducers from './reviews';
import sessionReducer from './session';
import spotReducers from './spots';
import bookingReducers from './bookings';


const rootReducer = combineReducers({
    session: sessionReducer,
    spots:spotReducers,
    reviews:reviewReducers,
    bookings:bookingReducers

});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };
  
  export default configureStore;