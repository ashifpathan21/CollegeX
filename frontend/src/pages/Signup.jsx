import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, sendOtp } from '../actions/userAction.js';
import { fetchStates, fetchColleges } from '../actions/detailsAction.js';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton.jsx';

const Signup = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [collegeQuery, setCollegeQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [debounceTimer, setDebounceTimer] = useState(null);

  const colleges = useSelector(state => state.details.colleges);
  const state = useSelector(state => state?.details?.states);
  const [states, setStates] = useState([]);

  useEffect(() => {
    dispatch(fetchStates())
    setStates(state);
  }, [state]);

  // Debounced college fetch
  useEffect(() => {
    if (collegeQuery.trim() === '') {
      setSuggestions([]);
      return;
    }

    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      dispatch(fetchColleges(collegeQuery));
    }, 300);

    setDebounceTimer(timer);
  }, [collegeQuery]);

  useEffect(() => {
    if (colleges?.length > 0) {
      setSuggestions(colleges);
    } else {
      setSuggestions([]);
    }
  }, [colleges]);

  const onSendOtp = (data) => {
    dispatch(sendOtp(data.collegeEmail, setLoading, setOtpSent));
  };

  const onSubmit = (data) => {
    dispatch(signUp(data, setLoading, navigate));
  };

  if (loading) {
    return (
      <div className='h-screen w-screen flex justify-center items-center'>
        <span className='loader'></span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative p-6 text-white w-screen min-h-screen flex bg-[#080b19f2] flex-col justify-center items-center mx-auto"
    >
      <BackButton />
      <h2 className="text-2xl font-bold mb-4">Signup</h2>

      <div className='flex flex-col gap-4 p-4'>
        <input
          {...register('fullName')}
          placeholder="Full Name"
          className="px-3 py-2 rounded-md bg-[#080b19f2] text-white border border-cyan-400"
          required
        />
        <input
          {...register('collegeEmail')}
          placeholder="College Email"
          className="px-3 py-2 rounded-md bg-[#080b19f2] text-white border border-cyan-400"
          required
        />

        {!otpSent && (
          <button
            type="button"
            onClick={handleSubmit(onSendOtp)}
            className="btn mt-10 px-4 p-2 bg-amber-100 text-black rounded-lg font-semibold text-lg"
          >
            Send OTP
          </button>
        )}

        {otpSent && (
          <>
            <input
              {...register('otp')}
              placeholder="Enter OTP"
              className="px-3 py-2 rounded-md bg-[#080b19f2] text-white border border-cyan-400"
              required
            />
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
              className="px-3 py-2 rounded-md bg-[#080b19f2] text-white border border-cyan-400"
              required
            />

            {/* College Name Autocomplete */}
            <div className="relative">
              <input
                placeholder="College Name"
                value={collegeQuery}
                onChange={(e) => {
                  setCollegeQuery(e.target.value);
                  setValue('college', e.target.value); // update react-hook-form
                }}
                className="px-3 py-2 rounded-md bg-[#080b19f2] text-white border border-cyan-400 w-full"
                autoComplete="off"
                required
              />
              <input
                type="hidden"
                {...register('college')}
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 bg-[#080b19f2] text-white border border-cyan-400  mt-1 rounded-md shadow-md max-h-48 overflow-y-auto w-full">
                  {suggestions.map((item, index) => (
                    <li
                      key={index}
                      className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setCollegeQuery(item);
                        setSuggestions([]);
                        setValue( item); // Update form field
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <select
              {...register('year')}
              className="px-3 py-2 rounded-md bg-[#080b19f2] text-white border border-cyan-400"
              required
            >
              <option value="">Select Year</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
            </select>

            <label htmlFor="state" className="text-sm text-white">Select State:</label>
            <select
              id="state"
              {...register('location')}
              className="px-3 py-2 rounded-md bg-[#080b19f2] text-white border border-cyan-400"
            >
              <option value="">-- Choose State --</option>
              {states?.map((state) => (
                <option key={state.id} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>

            <input
              {...register('branch')}
              placeholder="Branch"
              className="px-3 py-2 rounded-md bg-[#080b19f2] text-white border border-cyan-400"
              required
            />
            <input
              {...register('contactNumber')}
              placeholder="Contact Number"
              className="px-3 py-2 rounded-md bg-[#080b19f2] text-white border border-cyan-400"
              required
            />
            <button
              type="submit"
              className="btn mt-10 px-4 p-2 bg-amber-100 text-black rounded-lg font-semibold text-lg"
            >
              Signup
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default Signup;
