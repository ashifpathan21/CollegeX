const BASE_URL = import.meta.env.VITE_BASE_URL

export const userAuthentication = {
    SENT_OTP:BASE_URL+'/user/send-otp',
    SIGNUP:BASE_URL+'/user/signup',
    LOGIN:BASE_URL+'/user/login',
    GET_PROFILE:BASE_URL+'/user/profile',
    UPDATE_PROFILE:BASE_URL+'/user/update'
}

export const productEndpoints = {
    CREATE_PRODUCT : BASE_URL+'/product/' ,
    UPDATE_PRODUCT : BASE_URL+'/product' ,
    DELETE_PRODUCT : BASE_URL+'/product' ,
    MY_PRODUCT: BASE_URL+'/product/my' ,
    GET_ALL_PRODUCTS : BASE_URL+'/product/getAllProduct',
    SEARCH_PRODUCTS: BASE_URL + '/product/search'
}

export const categoryEndpoints = {
   GET_ALL_CATEGORIES:BASE_URL+'/category/' 
}

export const detailsEndpoints = {
    GET_STATES: BASE_URL+'/college/states' ,
     GET_COLLEGE : BASE_URL + '/college/'
}

export const messageEndpoints = {
    SEND_MESSAGE : BASE_URL + '/message/send' ,
    GET_ALL_MESSAGE: BASE_URL+ '/message/all',
    SEEN_MESSAGES: BASE_URL+'/message/seen'
}