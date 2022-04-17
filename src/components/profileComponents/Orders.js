import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
const Orders = () => {
  const ordersList = useSelector((state) => state.ordersList);
  const { loading, error, orders } = ordersList;

  return (
    <div className=' d-flex justify-content-center align-items-center flex-column'>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant='alert-danger' />
      ) : orders.length === 0 ? (
        <div className='col-12 alert alert-info text-center mt-3'>
          No Orders
          <Link
            className='btn btn-success mx-2 px-3 py-2'
            to='/'
            style={{
              fontSize: '12px',
            }}
          >
            START SHOPPING
          </Link>
        </div>
      ) : (
        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>STATUS</th>
                <th>DATE</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => {
                return (
                  <tr key={order._id} className={`${order.isPaid ? 'alert-success':'alert-danger'}`}>
                    <td>
                      <a href={`/order/${order._id}`} className='link'>
                        {order._id}
                      </a>
                    </td>
                    <td>{order.isPaid ? <>Paid</> : <>Not Paid</>}</td>
                    <td>{moment(order.createdAt).format('L')}</td>
                    <td>${order.totalPrice}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
