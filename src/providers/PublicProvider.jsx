import PropTypes from "prop-types";
import { useCallback, useReducer } from "react";
import actions from "../actions";
import axiosInstance from "../api/axiosInstance";
import { DisplayBlogContext } from "../context";
import {
  DisplayBlogsReducer,
  initialState,
} from "../reducers/DisplayBlogsReducer";

const PublicProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DisplayBlogsReducer, initialState);

  const fetchAllBlogs =useCallback( async () => {
    try {
      dispatch({ type: actions.display.DISPLAY_FETCHING });

      const res = await axiosInstance.get("/blogs");
      dispatch({
        type: actions.display.DISPLAY_BLOG_FETCHED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: actions.display.DISPLAY_ERROR,
        payload: err.message,
      });
    }
  },[]);

  const getSearchedBlogs = async (searchQuery) => {
    try {
      dispatch({
        type: actions.display.DISPLAY_FETCHING,
      });

      const res = await axiosInstance.get(`/search?q=${searchQuery}`);
      dispatch({
        type: actions.display.SEARCH_DATA_FETCHED,
        payload: res.data,
      });
    } catch (err) {
      if (
        err.message === "Cannot read properties of undefined (reading 'data')"
      ) {
        dispatch({
          type: actions.display.SEARCH_DATA_FETCHED,
          payload: [],
        });
      }

      dispatch({
        type: actions.display.DISPLAY_ERROR,
        payload: err.message,
      });
    }
  };

  const clearSearchData = ()=>{
    dispatch({
        type: actions.display.SEARCH_DATA_FETCHED,
        payload: [],
    })
  }

  return (
    <DisplayBlogContext.Provider
      value={{ state, fetchAllBlogs, getSearchedBlogs,clearSearchData }}
    >
      {children}
    </DisplayBlogContext.Provider>
  );
};

PublicProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicProvider;
