import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import contactReducer from './reducers/contactReducer';

const middleware = [thunk];

const store = createStore(
  combineReducers({
    contact: contactReducer,
  }),
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
