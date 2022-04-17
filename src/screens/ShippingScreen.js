import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { saveShipping } from '../redux/actions/CartActions';

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();

  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress?.address);
  const [city, setCity] = useState(shippingAddress?.city);
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode);
  const [country, setCountry] = useState(shippingAddress?.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, postalCode, country }));
    history.push('/payment');
  };

  return (
    <>
      <Header />
      <div className='container d-flex justify-content-center align-items-center login-center'>
        <form
          className='Login col-md-8 col-lg-4 col-11'
          onSubmit={submitHandler}
        >
          <h6>DELIVERY ADDRESS</h6>
          <input
            type='text'
            placeholder='Enter address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type='text'
            placeholder='Enter city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <input
            type='text'
            placeholder='Enter country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <button type='submit'>Continue</button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
