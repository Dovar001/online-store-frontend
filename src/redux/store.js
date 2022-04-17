import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productReducer,
  productDetailsReducer,
} from './reducers/ProductReducer';
import { cartReducer } from './reducers/CartReducer';
import { loginReducer, registerReducer, userDetailsReducer,userProfileUpdateReducer} from './reducers/UserReducer';
import { orderCreateReducer, orderDetailsReducer, userOrdersReducer } from './reducers/OrderReducer';

const rootReducer = combineReducers({
  productList: productReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  login:loginReducer,
  register:registerReducer,
  userDetails:userDetailsReducer,
  userUpdate:userProfileUpdateReducer, 
  orderCreate:orderCreateReducer,
  orderDetails:orderDetailsReducer,
  ordersList:userOrdersReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

  const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

  const shippingDataFromLocalStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : null;


const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress:shippingDataFromLocalStorage
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
