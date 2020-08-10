import React, {createContext, useContext, useReducer} from "react";

//Data Layer 
const StateContext = createContext();

//Provider
 const StateProvider =({initialState, reducer, children}) =>(
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)
 export default StateProvider;

//Fuction to access state in components
export const useStateValue =() => useContext(StateContext);