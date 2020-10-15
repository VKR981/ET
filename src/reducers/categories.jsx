import {
    
    POST_CATEGORY,
    GET_CATEGORIES
  } from "../actions/types";
  
  const initialstate = { categories: [] };
  
  export default function (state = initialstate, action) {
    switch (action.type) {

      case GET_CATEGORIES:
        return {
          ...state,
          categories:  action.payload,
        };
      
      case POST_CATEGORY:
        console.log(state.categories,action.payload);
        return {
          ...state,
          categories: [...state.categories, action.payload],
        };
      
      default:
        return state;
    }
  }
  