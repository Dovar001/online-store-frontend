import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/LoadingError/Error';
import Loading from '../components/LoadingError/Loading';
import { register } from '../redux/actions/UserActions';
import Header from './../components/Header';

const Register = ({ history, location }) => {
  window.scrollTo(0, 0);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  console.log('redirect', redirect);

  const user = useSelector((state) => state.register);

  console.log(user);
  const { error, loading, userInfo } = user;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, redirect, history]);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
    <>
      <Header />
      <div className='container d-flex flex-column justify-content-center align-items-center login-center'>
        {error && <Message variant='alert-danger'>{error}</Message>}
        {loading && <Loading />}
        <form className='Login col-md-8 col-lg-4 col-11' onSubmit={handleRegisterSubmit} >
          <input
            type='text'
            placeholder='Username'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type='submit'>Register</button>
          <p>
            <Link to={'/login'}>
              I Have Account <strong>Login</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
