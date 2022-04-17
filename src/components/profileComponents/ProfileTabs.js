import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateProfile } from '../../redux/actions/UserActions';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import Toast from '../LoadingError/Toast';

const ProfileTabs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const toastId = useRef(null)

  const ToastObjects = {
    pauseOnFocusLoss:false,
    draggable:false,
    pauseOnHover:false,
    autoClose:2000
  } 

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading:updateLoading } = userUpdate;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(password !== resetPassword){
      if(!toast.isActive(toastId)){
        toastId.current = toast.error("Password does not match",ToastObjects)
      }
    }else {
      dispatch(updateProfile({id:user._id,name,email,password}))
      if(!toast.isActive(toastId)){
        toastId.current = toast.success("User updated successfully",ToastObjects)
      }
    }
  
  };

  return (
    <>
    <Toast />
    {error && <Message variant='alert-danger'>{error}</Message>}
    {loading && <Loading />}
    {updateLoading && <Loading />}
      <form className='row  form-container' onSubmit={handleSubmit} >
        <div className='col-md-6'>
          <div className='form'>
            <label for='account-fn'>UserName</label>
            <input
              className='form-control'
              type='text'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className='col-md-6'>
          <div className='form'>
            <label for='account-email'>E-mail Address</label>
            <input
              className='form-control'
              type='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='form'>
            <label for='account-pass'>New Password</label>
            <input
              className='form-control'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='form'>
            <label for='account-confirm-pass'>Confirm Password</label>
            <input
              className='form-control'
              type='password'
              value={resetPassword}
              onChange={(e) => setResetPassword(e.target.value)}
            />
          </div>
        </div>
        <button type='submit'>Update Profile</button>
      </form>
    </>
  );
};

export default ProfileTabs;
