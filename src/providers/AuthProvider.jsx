import PropTypes from "prop-types";
import { useEffect, useReducer } from "react";
import actions from "../actions";
import { AuthContext } from "../context";
import { AuthReducer, initialState } from "../reducers/AuthReducer";

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Check if the user is already logged in
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const user = localStorage.getItem("user");
  
    if (accessToken && refreshToken && user) {
      dispatch({
        type: actions.Auth.login,
        payload: {
          accessToken,
          refreshToken,
          user: JSON.parse(user),
        },
      });
    }
  }, []);

  // handle login action
  const login = (userData) => {
    const {
      user,
      token: { accessToken, refreshToken },
    } = userData;
    // Set tokens in local storage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    //remove in 30 seconds
    const refreshTokenExpiresAt = Date.now() + 24 * 3600 * 1000; // 1 day in milliseconds;
    localStorage.setItem("refreshTokenExpiresAt", refreshTokenExpiresAt);

    dispatch({
      type: actions.Auth.login,
      payload: { user, accessToken, refreshToken },
    });
  };

  // handle logout action
  const logout = () => {
    dispatch({ type: actions.Auth.logout });
  };

  /*
   * This will run when the component mounts for the first time.
   * The refresh token expires in 24 hours
   * We check if the refresh token has expired or is about to expire and log the user out if it has.
   *
   */
  useEffect(() => {
    const refreshTokenExpiresAt = localStorage.getItem("refreshTokenExpiresAt");
    if (refreshTokenExpiresAt) {
      const currentTime = Date.now();
      if (currentTime > refreshTokenExpiresAt) {
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
