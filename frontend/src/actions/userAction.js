import { apiConnector } from "../api/apiConnector";
import { userAuthentication } from "../api/apis";
import { setToken, setUser } from "../slices/userSlice";
import {  setMyProducts } from "../slices/productSlice";
import toast from "react-hot-toast";

export function sendOtp(collegeEmail, setLoading, setOtpSent ) {
  return async () => {
    setLoading(true);
   
    try {
      const response = await apiConnector('POST', userAuthentication.SENT_OTP, { collegeEmail });
      toast.success(response.data.message);
      setOtpSent(true);
    } catch (err) {
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };
}

export function signUp(data, setLoading, navigate) {
  return async (dispatch) => {
    setLoading(true);
    try {
      const response = await apiConnector('POST', userAuthentication.SIGNUP, data);
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      localStorage.setItem("token", response.data.token);
      toast.success("Signup successful!");
      navigate('/');
    } catch (error) {
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };
}

export function login(data, setLoading, navigate) {
  return async (dispatch) => {
    setLoading(true);
    try {
      const response = await apiConnector('POST', userAuthentication.LOGIN, data);
    
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!");
      navigate('/');
    } catch (error) {

      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };
}


export function getProfile(token) {
  return async (dispatch) => {
    try {
      const response = await apiConnector('POST', userAuthentication.GET_PROFILE, null , {
          Authorization: `Bearer ${token}`
      });
     
      dispatch(setUser(response.data?.User));
       return response.data?.User 
    } catch (error) {
      toast.error("This is a Protected Route for Users");
     
    } finally {
     
    }
  };
}
