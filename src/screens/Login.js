import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/LoadingError/Error';
import Loading from '../components/LoadingError/Loading';
import { login } from '../redux/actions/UserActions';
import Header from './../components/Header';

const Login = ({ location, history }) => {
  window.scrollTo(0, 0);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  console.log('redirect',redirect)

  const user = useSelector((state) => state.login);

  console.log(user);
  const { error, loading, userInfo } = user;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, redirect, history]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <Header />
      <div className='container d-flex flex-column justify-content-center align-items-center login-center'>
        {error && <Message variant='alert-danger'>{error}</Message>}
        {loading && <Loading />}
        <form
          className='Login col-md-8 col-lg-4 col-11'
          onSubmit={handleLoginSubmit}
        >
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
          <button type='submit'>Login</button>
          <p>
            <Link
              to={redirect ? `/register/redirect=${redirect}` : '/register'}
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
