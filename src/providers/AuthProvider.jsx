import PropTypes from "prop-types";
import { useEffect, useReducer, useState } from "react";
import actions from "../actions";
import { AuthContext } from "../context";
import useLocalStorage from "../hooks/useLocalStorage";
import { AuthReducer, initialState } from "../reducers/AuthReducer";

const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(AuthReducer, initialState);
  const [loading, setLoading] = useState(true);
  const { setLocalStorage, getLocalStorage } = useLocalStorage();

  // Check if the user is already logged in
  useEffect(() => {
    console.log("checking local storage");
    const accessToken = getLocalStorage("accessToken");
    const refreshToken = getLocalStorage("refreshToken");
    const user = getLocalStorage("user", true);

    if (accessToken && refreshToken && user) {
      dispatch({
        type: actions.Auth.login,
        payload: {
          accessToken,
          refreshToken,
          user,
        },
      });
    }
    setLoading(false);
  }, []);

  // handle login action
  const login = (userData) => {
    const {
      user,
      token: { accessToken, refreshToken },
    } = userData;

    // Set tokens in local storage
    setLocalStorage("user", user, true);
    setLocalStorage("accessToken", accessToken);
    setLocalStorage("refreshToken", refreshToken);

    // Set refresh token expiry date
    const refreshTokenExpiresAt = Date.now() + 24 * 3600 * 1000; // 1 day in milliseconds;
    setLocalStorage("refreshTokenExpiresAt", refreshTokenExpiresAt);

    dispatch({
      type: actions.Auth.login,
      payload: { user, accessToken, refreshToken },
    });
  };

  // handle logout action
  const logout = () => {
    dispatch({ type: actions.Auth.logout });
  };

  // access token handler if axios interceptor refreshes the token
  const setAccessToken = (accessToken) => {
    console.log(accessToken);
    dispatch({
      type: actions.Auth.setAccessToken,
      payload: { accessToken },
    });

    // Set the new access token in local storage
    setLocalStorage("accessToken", accessToken);
  };

  /*
   * This will run when the component mounts for the first time.
   * The refresh token expires in 24 hours
   * We check if the refresh token has expired or is about to expire and log the user out if it has.
   *
   */
  useEffect(() => {
    const refreshTokenExpiresAt = getLocalStorage("refreshTokenExpiresAt");
    if (refreshTokenExpiresAt) {
      const currentTime = Date.now();
      if (currentTime > refreshTokenExpiresAt) {
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, login, logout, loading, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
