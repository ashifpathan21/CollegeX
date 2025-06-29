// Signup.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { signUp, sendOtp } from '../actions/userAction.js';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton.jsx'



const Signup = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSendOtp = (data) => {
    dispatch(sendOtp( data.collegeEmail, setLoading, setOtpSent));
  };

  const onSubmit = (data) => {
    dispatch(signUp(data, setLoading, navigate));
  };

    if(loading){
    return <div className='h-screen w-screen flex justify-center items-center'>
              <span className='loader'></span>
           </div>
     }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" relative p-6 text-white  w-screen min-h-screen flex bg-[#080b19f2]  flex-col justify-center items-center mx-auto">

       <BackButton/>

      <h2 className="text-2xl font-bold mb-4">Signup</h2>

    <div  className=' flex flex-col gap-4  p-4  ' >
          <input {...register('fullName')} placeholder="Full Name" className="input bg-white p-2 text-black rounded-lg " required />
          <input {...register('collegeEmail')} placeholder="College Email" className="input bg-white p-2 text-black rounded-lg " required />
    </div>
     
      {!otpSent && (
        <button type="button" onClick={handleSubmit(onSendOtp)} className="btn mt-10 px-4 p-2 bg-amber-100 text-black rounded-lg  font-semibold text-lg  ">
          Send OTP
        </button>
      )}

      {otpSent && (
        <div className=' flex flex-col gap-4  px-4  '>
          <input {...register('otp')} placeholder="Enter OTP" className="input  bg-white p-2 text-black rounded-lg " required />
          <input {...register('password')} type="password" placeholder="Password" className="input  bg-white p-2 text-black rounded-lg " required />
          <input {...register('college')} placeholder="College Name" className="input  bg-white p-2 text-black rounded-lg " required />
           <select {...register('year')} className="input bg-white p-2 text-black rounded-lg" required>
            <option value="">Select Year</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
          </select>
          <input {...register('branch')} placeholder="Branch" className="input  bg-white p-2 text-black rounded-lg " required />
          <input {...register('contactNumber')} placeholder="Contact Number" className="input  bg-white p-2 text-black rounded-lg " required />
          <button type="submit" className="btn mt-10 px-4 p-2 bg-amber-100 text-black rounded-lg  font-semibold text-lg  ">Signup</button>
        </div>
      )}
    </form>
  );
};

export default Signup;
