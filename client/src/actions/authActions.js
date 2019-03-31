import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_EMPLOYEE, EMPLOYEE_LOADING } from "./types";

// Register Employee
export const registerEmployee = (employeeData, history) => dispatch => {
  axios
    .post("/api/employees/register", employeeData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get employee token
export const loginEmployee = employeeData => dispatch => {
  axios
    .post("/api/employees/login", employeeData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get employee data
      const decoded = jwt_decode(token);
      // Set current employee
      dispatch(setCurrentEmployee(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in employee
export const setCurrentEmployee = decoded => {
  return {
    type: SET_CURRENT_EMPLOYEE,
    payload: decoded
  };
};

// Employee loading
export const setEmployeeLoading = () => {
  return {
    type: EMPLOYEE_LOADING
  };
};

// Log employee out
export const logoutEmployee = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current employee to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentEmployee({}));
};
