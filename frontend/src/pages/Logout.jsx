import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setUser } from '../Slices/userSlice';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem('token');
    const payload = {};
    dispatch(setUser(payload));

    navigate('/');
  }, [dispatch, navigate]);

  return (
    <div>
    </div>
  );
};

export default Logout;
