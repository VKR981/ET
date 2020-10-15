import {
  GET_COURSES,
  POST_COURSE,
  POST_CATEGORY,
  GET_CATEGORIES
} from "./types";
import { getTokenConfig } from "./auth";
import Axios from "axios";
import { createMessage, returnErrors } from "./messages";

export const getexpenses = () => (dispatch,token) => {
  Axios.post("https://expense-manager-shipmnts.herokuapp.com/api/v1/user/expense_details",'', getTokenConfig(token))
    .then((res) => {

      
      dispatch({
        type: GET_COURSES,
        payload: res.data,
      });
      
    })
    // .catch((err) =>
    //   dispatch(returnErrors(err.response.data, err.response.status))
    // );
};

export const getcategories = () => (dispatch, token) => {
  Axios.get("https://expense-manager-shipmnts.herokuapp.com/api/v1/user/categories", getTokenConfig(token))
    .then((res) => {

      
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data.categories,
      });
      
    })
    // .catch((err) =>
    //   dispatch(returnErrors(err.response.data, err.response.status))
    // );
};



export const addexpense = (course) => (dispatch, token) => {
  Axios.post("https://expense-manager-shipmnts.herokuapp.com/api/v1/user/add_expense", course, getTokenConfig(token))
    .then((res) => {
      
      dispatch(createMessage(res.data.message));
      dispatch({
        type: POST_COURSE,
        payload: {...res.data.expense_resource,date_added:(new Date()).toUTCString()},
      });
      createMessage(res.data.message)
    })
    .catch((err) =>
      dispatch(returnErrors(err.data, err.status))
    );
};

export const addcategory = (category) => (dispatch, token) => {
  Axios.post("https://expense-manager-shipmnts.herokuapp.com/api/v1/user/add_category", category, getTokenConfig(token))
    .then((res) => {
      
      dispatch(createMessage(res.data.message));
      if(res.data.category_resource){
      dispatch({
        type: POST_CATEGORY,
        payload: res.data.category_resource.name,
      });
      
    }
    })
    // .catch((err) =>
    //   dispatch(returnErrors(err.data, err.status))
    // );
};




