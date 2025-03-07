import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
} from "./types";

import axios from "axios";
import { useHistory } from "react-router";

export const loaduser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: AUTH_ERROR });
    });
};
export const signin = (username, password) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ username, password });

  axios
    .post("/api/auth/signin", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAILED });
      alert("something went wrong");
    });
};

export const signout = () => (dispatch, getState) => {

  const history= useHistory();

  axios
    .post("/api/auth/logout/",null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: res.data,
      });
      history.push('/signin');
    })
    .catch((err) => {
      alert("Something went wrong");
    });
};

export const tokenConfig = (getState) => {
  
  const token = getState().auth.token;

 
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
