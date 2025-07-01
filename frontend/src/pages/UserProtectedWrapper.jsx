import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../actions/userAction.js';
import {toast} from 'react-hot-toast'
const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user); // assuming userSlice contains "user"
 
  useEffect(() => {
    const verifyUser = async () => {
        setLoading(true) 
      if (!token) {
        toast.error("Please login first");
        navigate('/login');
        return;
      }

      await dispatch(getProfile(token)); // this will setLoading(false) at end
      setLoading(false )
    };

    verifyUser();
  }, [token, dispatch, navigate]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <span className="loader"></span>
      </div>
    );
  }

  if (!user) {
    localStorage.removeItem('token')
    navigate('/login');
    return null;
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;
