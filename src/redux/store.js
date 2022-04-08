import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productReducer,
  productDetailsReducer,
} from './reducers/ProductReducer';
import { cartReducer } from './reducers/CartReducer';
import { loginReducer, registerReducer } from './reducers/UserReducer';

const rootReducer = combineReducers({
  productList: productReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  login:loginReducer,
  register:registerReducer
});

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

  const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;


const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
  },
  login:{
    userInfo:userInfoFromLocalStorage
  }
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
