import axios from 'axios';

import {
  GET_ALL_HOMES,
  GET_OWNER_HOMES,
  GET_BOOKED_HOMES,
  GET_HOME,
  OWNER_HOME_LOADING
  
  
} from './types';



  // Get all homes
  export const getHomes = () => dispatch => {
    dispatch(setProfileLoading());
    axios
      .get('http://localhost:3001/allHomes')
      .then(res =>
        dispatch({
          type: GET_ALL_HOMES,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ALL_HOMES,
          payload: null
        })
      );
  };

  // Get owner homes
  export const getOwnerHomes = () => dispatch => {
    dispatch(setProfileLoading());
    axios
      .get('http://localhost:3001/OwnerHomes')
      .then(res =>
        
        dispatch({
          type: GET_OWNER_HOMES,
          payload: res.data
          
        })
      )
      .catch(err =>
        dispatch({
          type: GET_OWNER_HOMES,
          payload: null
        })
      );
  };

  // Get booked homes
  export const getBookedHomes = () => dispatch => {
    dispatch(setProfileLoading());
    axios
      .get('http://localhost:3001/bookedHomes')
      .then(res =>
        
        dispatch({
          type: GET_BOOKED_HOMES,
          payload: res.data
          
        })
      )
      .catch(err =>
        dispatch({
          type: GET_BOOKED_HOMES,
          payload: null
        })
      );
  };


//Get Home by Id
  export const getHomeByHomeId = _id => dispatch => {
    dispatch(setProfileLoading());
    axios
      .get(`http://localhost:3001/home/${_id}`)
      .then(res =>
        
        dispatch({
          type: GET_HOME,
          payload: res.data
          
        })
      )
      .catch(err =>
        dispatch({
          type: GET_HOME,
          payload: null
        })
      );
  };




// Profile loading
export const setProfileLoading = () => {
    return {
      type: OWNER_HOME_LOADING
    };
  };