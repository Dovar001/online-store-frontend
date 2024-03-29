import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './../components/Header';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../redux/actions/OrderActions';
import Loading from '../components/LoadingError/Loading';
import Message from '../components/LoadingError/Error';
import moment from 'moment';

const OrderScreen = ({ match }) => {
  const dispatch = useDispatch();
  const orderId = match.params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  console.log(order);
  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  if (order) {
    order.itemsPrice = order.orderItems?.reduce(
      (prev, curr) => prev + curr.price * curr.qty,
      0
    );
  }

  return (
    <>
      <Header />
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant='alert-danger'>{error}</Message>
      ) : (
        <>
          <div className='container'>
            <div className='row  order-detail'>
              <div className='col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0'>
                <div className='row'>
                  <div className='col-md-4 center'>
                    <div className='alert-success order-box'>
                      <i className='fas fa-user'></i>
                    </div>
                  </div>
                  <div className='col-md-8 center'>
                    <h5>
                      <strong>Customer</strong>
                    </h5>
                    <p>{order?.user.name}</p>
                    <p>
                      <a href={`admin@gmail.com`}>{order?.user.email}</a>
                    </p>
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
                    <p>Shipping: {order?.shippingAddress.country}</p>
                    <p>Pay method: {order?.paymentMethod}</p>

                    {order?.isDelivered ? (
                      <div className='bg-info p-2 col-12'>
                        <p className='text-white text-center text-sm-start'>
                          Paid on {moment(order?.paidAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <div className='bg-danger p-2 col-12'>
                        <p className='text-white text-center text-sm-start'>
                          Not Paid
                        </p>
                      </div>
                    )}
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
                      {`${order?.shippingAddress.country} / ${order?.shippingAddress.city} / ${order?.shippingAddress.address} `}
                    </p>
                    {order?.isDelivered ? (
                      <div className='bg-info p-1 col-12'>
                      <p className='text-white text-center text-sm-start'>
                        Delivered on {moment(order?.deleveredAt).calendar()}
                      </p>
                    </div>
                    ):(
                      <div className='bg-danger p-1 col-12'>
                      <p className='text-white text-center text-sm-start'>
                        Not Delivered
                      </p>
                    </div>
                    )}
                   
                  </div>
                </div>
              </div>
            </div>

            <div className='row order-products justify-content-between'>
              <div className='col-lg-8'>
                {order && order?.orderItems.length === 0 ? (
                  <Message variant='alert-info mt-5'>
                    Your order is empty
                  </Message>
                ) : (
                  order?.orderItems.map((item, idx) => {
                    return (
                      <div className='order-product row' key={idx}>
                        <div className='col-md-3 col-6'>
                          <img src={item.image} alt='product' />
                        </div>
                        <div className='col-md-5 col-6 d-flex align-items-center'>
                          <Link to={`/`}>
                            <h6>{item.name}</h6>
                          </Link>
                        </div>
                        <div className='mt-3 mt-md-0 col-6 col-md-2  d-flex align-items-center flex-column justify-content-center '>
                          <h4>QUANTITY</h4>
                          <h6>{item.qty}</h6>
                        </div>
                        <div className='mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center'>
                          <h4>SUBTOTAL</h4>
                          <h6>${item.price * item.qty}</h6>
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
                      <td>${order?.itemsPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Shipping</strong>
                      </td>
                      <td>${order?.shippingPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tax</strong>
                      </td>
                      <td>${order?.taxPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total</strong>
                      </td>
                      <td>${order?.totalPrice}</td>
                    </tr>
                  </tbody>
                </table>
                <div className='col-12'>
                  <PayPalButton amount={345} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderScreen;
