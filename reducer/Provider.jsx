import React from "react";
import { createContext, useReducer, useContext } from "react";
import { reducer } from ".";
import { initialState } from "./initialState";

const AppContext = createContext(null);

const useAppContext = () => {
  const { state, dispatch } = useContext(AppContext);
  return [state, dispatch];
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
  );
};
export default AppProvider;
export { useAppContext };
