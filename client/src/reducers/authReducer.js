import { SET_CURRENT_EMPLOYEE, EMPLOYEE_LOADING } from "../actions/types";

  const isEmpty = require("is-empty");

  const initialState = {
    isAuthenticated: false,
    employee: {},
    loading: false
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_EMPLOYEE:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          employee: action.payload
        };
      case EMPLOYEE_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }