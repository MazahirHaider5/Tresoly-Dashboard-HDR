export const USEREMAIL = "USEREMAIL";
export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const OTPSTATUS = "OTPSTATUS";
export const AUTH = "AUTH";
export const USERDATA = "USERDATA";
export const SUBSCRIPTION = "SUBSCRIPTION";

export const setSelectedSubscription = (data) => ({
    type: SUBSCRIPTION,
    payload: data,
});

export const setUserData = (data) => ({
    type: USERDATA,
    payload: data,
});

export const setAuth = (data) => ({
    type: AUTH,
    payload: data,
});

export const setUserEmail = (data) => ({
    type: USEREMAIL,
    payload: data,
});

export const setOTPStatus = (data) => ({
    type: OTPSTATUS,
    payload: data,
});

export const setError = (errorMessage) => ({
    type: SET_ERROR,
    payload: errorMessage,
});

export const clearError = () => ({
    type: CLEAR_ERROR,
});