import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/LoadingError/Error';
import { createOrder } from '../redux/actions/OrderActions';
import { ORDER_CREATE_RESET } from '../redux/types/OrderTypes';
import Header from './../components/Header';

const PlaceOrderScreen = ({ history }) => {
  const { userInfo } = useSelector((state) => state.login);
  const { shippingAddress } = useSelector((state) => state.cart);
  const { paymentMethod } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const allProductsPrice = cartItems?.reduce(
    (prev, curr) => prev + curr.price * curr.qty,
    0
  );
  const shipping = 99;

  const tax = Math.floor(allProductsPrice / 1000);

  const total = allProductsPrice + shipping + tax;

  cart.itemsPrice = allProductsPrice;
  cart.shippingPrice = shipping;
  cart.taxPrice = tax;
  cart.totalPrice = total;

    const orderCreate = useSelector((state) => state.orderCreate);

    const { order, success, error } = orderCreate;
    
  useEffect(() => {
    if (success) {
      history.push(`order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [history, order, success, dispatch]);

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <Header />
      <div className='container'>
        <div className='row  order-detail'>
          <div className='col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0'>
            <div className='row '>
              <div className='col-md-4 center'>
                <div className='alert-success order-box'>
                  <i className='fas fa-user'></i>
                </div>
              </div>
              <div className='col-md-8 center'>
                <h5>
                  <strong>Customer</strong>
                </h5>
                <p>{userInfo.name}</p>
                <p>{userInfo.email}</p>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className='col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0'>
            <div className='row'>
              <div className='col-md-4 center'>
                <div className='alert-success order-box'>
                  <i className='fas fa-truck-moving'></i>
                </div>
              </div>
              <div className='col-md-8 center'>
                <h5>
                  <strong>Order info</strong>
                </h5>
                <p>Shipping:{shippingAddress.country}</p>
                <p>Pay method:{paymentMethod}</p>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className='col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0'>
            <div className='row'>
              <div className='col-md-4 center'>
                <div className='alert-success order-box'>
                  <i className='fas fa-map-marker-alt'></i>
                </div>
              </div>
              <div className='col-md-8 center'>
                <h5>
                  <strong>Deliver to</strong>
                </h5>
                <p>
                  Address:{' '}
                  {`${shippingAddress.country} / ${shippingAddress.city} / ${shippingAddress.address} `}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='row order-products justify-content-between'>
          <div className='col-lg-8'>
            {cartItems.length === 0 ? (
              <Message variant='alert-info mt-5'>Your cart is empty</Message>
            ) : (
                cartItems.map((item, idx) => {
                  return (
                    <div className='order-product row' key={idx}>
                      <div className='col-md-3 col-6'>
                        <img src={item.image} alt='product' />
                      </div>
                      <div className='col-md-5 col-6 d-flex align-items-center'>
                        <Link to={'/'}>
                          <h6>{item.name}</h6>
                        </Link>
                      </div>
                      <div className='mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center '>
                        <h4>QUANTITY</h4>
                        <h6>{item.qty}</h6>
                      </div>
                      <div className='mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center '>
                        <h4>SUBTOTAL</h4>
                        <h6>{item.price * item.qty}</h6>
                      </div>
                    </div>
                  );
                })
            )}
          </div>
          {/* total */}
          <div className='col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order'>
            <table className='table table-bordered'>
              <tbody>
                <tr>
                  <td>
                    <strong>Products</strong>
                  </td>
                  <td>{`$${allProductsPrice}`}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Shipping</strong>
                  </td>
                  <td>{`$${shipping}`}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Tax</strong>
                  </td>
                  <td>{`$${tax}`}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>{`$${total}`}</td>
                </tr>
              </tbody>
            </table>
            <button type='submit' onClick={placeOrderHandler}>
              PLACE ORDER
            </button>
            {error && (
                <div className="my-3 col-12">
                <Message variant="alert-danger">{error}</Message>
              </div>
            )}
          
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
