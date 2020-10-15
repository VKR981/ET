import {
  GET_COURSES,
  POST_COURSE,
  DELETE_COURSE,
  UPDATE_COURSE,
  POST_CATEGORY
} from "../actions/types";

const initialstate = { courses: [] };

export default function (state = initialstate, action) {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(
          (course) => course.id !== action.payload.id
        ),
      };
    case POST_COURSE:
      return {
        ...state,
        courses: [...state.courses, action.payload],
      };
    
    case UPDATE_COURSE:
      return {
        ...state,
        courses: [...state.courses, action.payload],
      };
    default:
      return state;
  }
}
