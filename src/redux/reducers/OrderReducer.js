import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  USER_ORDER_LIST_FAIL,
  USER_ORDER_LIST_REQUEST,
  USER_ORDER_LIST_RESET,
  USER_ORDER_LIST_SUCCESS,
} from '../types/OrderTypes';

const orderCreateReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { ...state, success: true, loading: false, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

const orderDetailsReducer = (
  state = { loading: false, shippingAddress: {}, orderItems: [] },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { ...state, success: true, loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const userOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case USER_ORDER_LIST_REQUEST:
      return { loading: true };
    case USER_ORDER_LIST_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case USER_ORDER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_ORDER_LIST_RESET:
      return { ...state, orders: [] };

    default:
      return state;
  }
};

export { orderCreateReducer, orderDetailsReducer,userOrdersReducer };
