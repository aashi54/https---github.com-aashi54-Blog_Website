import { createContext, useEffect, useReducer, useState , useContext} from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
  orderId: null,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    dispatch({ type: "LOGIN_SUCCESS", payload: updatedUser });
  };

  const updateOrderId = (orderId) => {
    dispatch({ type: "UPDATE_ORDER_ID", payload: orderId });
  };


  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        setUser,
        updateUser,
        updateOrderId,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export function useAuth() {
  return useContext(Context);
}
