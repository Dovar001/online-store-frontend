import axios from 'axios';
import { CART_CLEAR_ITEM } from '../types/CartTypes';
import {
    ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  USER_ORDER_LIST_FAIL,
  USER_ORDER_LIST_REQUEST,
  USER_ORDER_LIST_RESET,
  USER_ORDER_LIST_SUCCESS,
} from '../types/OrderTypes';
import { logout } from './UserActions';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const {
      login: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/orders`, order, config);
    console.log('data', data);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    dispatch({ type: CART_CLEAR_ITEM, payload: data });

    localStorage.removeItem('cartItems');
} catch (error) {
  const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  if (message === 'Not authorized, token failed') {
    dispatch(logout());
  }

  dispatch({
    type: ORDER_CREATE_FAIL,
    payload: message,
  });
}
};


export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const {
      login: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/${id}`,config);
    console.log('data', data);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  
} catch (error) {
  const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  if (message === 'Not authorized, token failed') {
    dispatch(logout());
  }

  dispatch({
    type: ORDER_DETAILS_FAIL,
    payload: message,
  });
}
};


export const getUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_ORDER_LIST_REQUEST });
    const {
      login: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders`,config);
    console.log('data', data);
    dispatch({ type: USER_ORDER_LIST_SUCCESS, payload: data });
  
} catch (error) {
  const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  if (message === 'Not authorized, token failed') {
    dispatch(logout());
    dispatch({type:USER_ORDER_LIST_RESET})
  }

  dispatch({
    type: USER_ORDER_LIST_FAIL,
    payload: message,
  });
}
};

