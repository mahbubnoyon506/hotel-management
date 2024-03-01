import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import APIKit from "../components/commons/helpers/ApiKit";

const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const token = localStorage.getItem("auth_token");
  // Added property for the intended location
  const [intendedLocation, setIntendedLocation] = useState(null);

  const checkUser = async () => {
    try {
      const response = await APIKit.auth.validateUser(token);
      dispatch({ type: "LOGIN", payload: { user: response.data.userId } });
      // Redirect to the intended location after successful login
      if (intendedLocation) {
        history.push(intendedLocation);
        setIntendedLocation(null); // Reset intended location after redirection
      }
    } catch (error) {
      dispatch({ type: "LOGOUT" });
    }
  };

  useEffect(() => {
    checkUser();
  }, [intendedLocation]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
