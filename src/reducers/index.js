import {
  combineReducers
} from "redux";
import Auth from "./auth";

import Message from './message'
import Course from './course'
import Categories from './categories'

export default combineReducers({
  loginstate: Auth,
  Course,
  
  Message,
  Categories,
});