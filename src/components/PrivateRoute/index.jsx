import React from 'react'
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import jwt from 'jwt-decode';

const isTokenValid = (token) => {
    try {
        console.log(token);
      const decodedToken = jwt(token);
      console.log("Decoded token" , decodedToken);
      if (!decodedToken || !decodedToken.exp) {
        return false;
      }
      const currentTime = Date.now() / 1000;
      if(decodedToken.exp > currentTime) {
        return true
      }
      else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

function index({children}) {
    const jwt = Cookies.get('jwt');
    console.log(isTokenValid(jwt));
    return isTokenValid(jwt) ? children : <Navigate to="/login" replace/>

}

export default index
