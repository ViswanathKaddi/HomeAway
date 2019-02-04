import { 
    GET_ALL_HOMES,
    GET_OWNER_HOMES,
    OWNER_HOME_LOADING,
    GET_HOME,
    GET_BOOKED_HOMES
  } from '../actions/types';
  
  const initialState = {
    homes: null,
    allhomes: null,
    ownerhomes: null,
    bookedhomes: null,
    loading: false
    
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case OWNER_HOME_LOADING:
      return {
        ...state,
        loading: true
      };
      case GET_ALL_HOMES:
      return {
        ...state,
        allhomes: action.payload,
        loading: false
      };
      case GET_OWNER_HOMES:
      return {
        ...state,
        ownerhomes: action.payload,
        loading: false
      };
      case GET_BOOKED_HOMES:
      return {
        ...state,
        bookedhomes: action.payload,
        loading: false
      };
      case GET_HOME:
      return {
        ...state,
        homes: action.payload,
        loading: false
      };

      default:
        return state;
    }
  }
  