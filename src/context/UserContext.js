import React, { createContext, useReducer } from "react";
export const UserInfo = createContext();
const initialState = {
  userInfo: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  search: [],
  donasi: [],
};

export const baseUrl = "https://grup7.herokuapp.com";

function reducer(state = initialState, action) {
  switch (action.type) {
    case "USER_INFO":
      return { ...state, userInfo: action.payload };
    case "USER_LOGOUT":
      return { ...state, userInfo: null };
    case "SEARCH":
      return { ...state, search: action.payload };
    case "DELETE_SEARCH":
      return { ...state, search: [] };
    case "DONASI":
      return { ...state, donasi: action.payload };
    case "KOMUNITAS":
      return { ...state, komunitas: action.payload };
    default:
      return state;
  }
}

export const UserContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserInfo.Provider value={{ state, dispatch }}>
      {children}
    </UserInfo.Provider>
  );
};
