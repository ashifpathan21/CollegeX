// Login.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../actions/userAction.js';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton.jsx'

const Login = () => {

  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(login(data, setLoading, navigate));
  };

  if(loading){
    return <div className='h-screen w-screen flex justify-center items-center'>
              <span className='loader'></span>
           </div>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" relative p-6 flex justify-center flex-col text-white  items-center bg-[#080b19f2]  min-h-screen w-screen mx-auto">
            <BackButton/>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <div className=' flex flex-col gap-4  p-4  '>
      <input {...register('collegeEmail')} placeholder="College Email" className="input  bg-white p-2 text-black rounded-lg " required />
      <input {...register('password')} type="password" placeholder="Password" className="input bg-white p-2 text-black rounded-lg " required />
      <button type="submit" className="btn mt-10 px-4 p-2 bg-amber-100 text-black rounded-lg  font-semibold text-lg ">Login</button>
      </div>
    </form>
  );
};

export default Login;
