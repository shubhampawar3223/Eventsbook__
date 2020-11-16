import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from "./types"
// import { Redirect } from "react-router-dom";

//Register the user
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("./api/users/register", userData)
        .then(res => history.push("/login")) //redirect to login on successful register
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        ); 
};

export const registerOrganizer = (userData, history) => dispatch => {
    axios
        .post("./api/organizer/register", userData)
        .then(res => history.push("/loginOrganizer")) //redirect to login on successful register
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        ); 
};

export const loginUser = userData => dispatch => {
    axios
        .post("./api/users/login", userData)
        .then(res => {
            //Save to local storage
            //Set token to local storage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            //Set token to auth header
            setAuthToken(token);
            //Decode token to get user data
            const decoded = jwt_decode(token);
            //Set current user
            dispatch(setCurrentUser(decoded));
            
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//Login  as organizer

export const loginOrganizer = userData => dispatch => {
    axios
        .post("./api/organizer/login", userData)
        .then(res => {
            //Save to local storage
            //Set token to local storage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            //Set token to auth header
            setAuthToken(token);
            //Decode token to get user data
            const decoded = jwt_decode(token);
            //Set current user
            dispatch(setCurrentUser(decoded));
            
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//User Profiles
export const userProfile = (profileData, history) => dispatch => {
    var email__=localStorage.getItem('email');
    axios
        .put("/api/users/profile/"+ email__,profileData)
        .then(res => history.push("/timeline"))
        .catch(err => 
            dispatch({
                type:GET_ERRORS,
                payload: err.response.data
            })
        );    
};


export const getProfile = (getData, history) => dispatch => {
    var email__=localStorage.getItem('email');
    axios
        .get("/api/users/profile/"+email__)
        .then(res => history.push("/profile"))
        .catch(err => 
            dispatch({
                type:GET_ERRORS,
                payload: err.response
            })
        );    
};


//Organizer Profiles
export const organizerProfile = (profileData, history) => dispatch => {
    var email__=localStorage.getItem('email');
    axios
        .put("/api/organizer/profile/"+ email__,profileData)
        .then(res => history.push("/timelineorganizer"))
        .catch(err => 
            dispatch({
                type:GET_ERRORS,
                payload: err.response.data
            })
        );    
};


export const getOrganizerProfile = (getData, history) => dispatch => {
    var email__=localStorage.getItem('email');
    axios
        .get("/api/users/profile/"+email__)
        .then(res => history.push("/organizerprofile"))
        .catch(err => 
            dispatch({
                type:GET_ERRORS,
                payload: err.response
            })
        );    
};

//Login - Get user token


//Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

//User Loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

//Log user out
export const logoutUser = () => dispatch => {
    //Remove token from local storage
    localStorage.removeItem("jwtToken");
    //Remove auth header for future requests
    setAuthToken(false);
    //Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};