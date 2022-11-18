import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import ReviewReducers from './reviews';
import sessionReducer from './session';
import {login} from './session'
import SpotsReducers from './spots';






const rootReducer = combineReducers({
    session: sessionReducer,
    spotStates:SpotsReducers,
    reviews:ReviewReducers

});



//ENHANCER
let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


//CONFIGURESTORE
const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };
  
  export default configureStore;

  