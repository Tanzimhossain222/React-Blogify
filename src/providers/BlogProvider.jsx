import PropTypes from "prop-types";
import { useCallback, useReducer } from "react";
import actions from "../actions";
import publicAxios from "../axiosAPI/axiosInstance";
import useAxios from "../axiosAPI/useAxios";
import { BlogContext } from "../context";
import { blogReducer, initialValues } from "../reducers/BlogReducer";

const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialValues);

  const { axiosInstance } = useAxios();

  // Fetch all blogs
  const fetchAllBlogs = useCallback(async () => {
    try {
      dispatch({ type: actions.blog.BLOG_FETCHING });

      const res = await publicAxios.get("/blogs");
      dispatch({
        type: actions.blog.BLOG_FETCHED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: actions.blog.BLOG_FETCH_ERROR,
        payload: err.message,
      });
    }
  }, []);

  // Fetch single blog
  const fetchSingleBlog = useCallback(
    async (id) => {
      try {
        dispatch({
          type: actions.blog.BLOG_FETCHING,
        });
        const res = await publicAxios.get(`/blogs/${id}`);

        if (res.status !== 200) {
          throw new Error("An error occurred");
        }

        dispatch({
          type: actions.blog.SINGLE_BLOG_FETCHED,
          payload: res.data,
        });
      } catch (err) {
        dispatch({
          type: actions.blog.BLOG_FETCH_ERROR,
          payload: err.message,
        });
      }
    },
    [axiosInstance, dispatch]
  );

  // Create a new blog
  const createBlog = async (blogData) => {
    try {
      dispatch({
        type: actions.blog.BLOG_FETCHING,
      });

      const res = await axiosInstance.post("/blogs", blogData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status !== 201) {
        throw new Error("An error occurred");
      }

      dispatch({
        type: actions.blog.BLOG_CREATED,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      dispatch({
        type: actions.blog.BLOG_FETCH_ERROR,
        payload: err.message,
      });
    }
  };

  // Delete a blog
  const deleteBlog = async (blogId) => {
    try {
      dispatch({
        type: actions.blog.BLOG_FETCHING,
      });

      const res = await axiosInstance.delete(`/blogs/${blogId}`);

      if (res.status !== 200) {
        throw new Error("An error occurred");
      }

      dispatch({
        type: actions.blog.BLOG_DELETED,
        payload: blogId,
      });
    } catch (err) {
      dispatch({
        type: actions.blog.BLOG_FETCH_ERROR,
        payload: err.message,
      });
    }
  };

  // Edit a blog
  const editBlog = async (blogData, Id) => {
    try {
      dispatch({
        type: actions.blog.BLOG_FETCHING,
      });

      const res = await axiosInstance.patch(`/blogs/${Id}`, blogData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status !== 200) {
        throw new Error("An error occurred");
      }

      dispatch({
        type: actions.blog.SINGLE_BLOG_FETCHED,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      dispatch({
        type: actions.blog.BLOG_FETCH_ERROR,
        payload: err.message,
      });
    }
  };

  // Post a comment
  const postComment = async (content, blogId) => {
    try {
      const res = await axiosInstance.post(`/blogs/${blogId}/comment`, {
        content,
      });

      if (res.status !== 200) {
        throw new Error("An error occurred");
      }

      dispatch({
        type: actions.blog.POST_COMMENT,
        payload: res.data.comments,
      });
    } catch (err) {
      dispatch({
        type: actions.blog.BLOG_FETCH_ERROR,
        payload: err.message,
      });
    }
  };

  // Delete a comment
  const deleteComment = async (commentId, blogId) => {
    try {
      const res = await axiosInstance.delete(
        `/blogs/${blogId}/comment/${commentId}`
      );

      if (res.status !== 200) {
        throw new Error("An error occurred");
      }

      dispatch({
        type: actions.blog.DELETE_COMMENT,
        payload: commentId,
      });
    } catch (err) {
      dispatch({
        type: actions.blog.BLOG_FETCH_ERROR,
        payload: err.message,
      });
    }
  };

  // Like a blog
  const blogLiked = async (blogId) => {
    try {
      const res = await axiosInstance.post(`/blogs/${blogId}/like`);

      if (res.status !== 200) {
        throw new Error("An error occurred");
      }

      dispatch({
        type: actions.blog.BLOG_LIKED,
        payload: res.data.likes,
      });

      return res.data.isLiked;
    } catch (err) {
      dispatch({
        type: actions.blog.BLOG_FETCH_ERROR,
        payload: err.message,
      });
    }
  };

  // Toggle favourite
  const toggleFavourite = async (blogId) => {
    try {
      const res = await axiosInstance.patch(`/blogs/${blogId}/favourite`);
      if (res.status !== 200) {
        throw new Error("An error occurred");
      }

      dispatch({
        type: actions.blog.BLOG_FAVORITE,
        payload: res.data.isFavourite,
      });
    } catch (err) {
      dispatch({
        type: actions.blog.BLOG_FETCH_ERROR,
        payload: err.message,
      });
    }
  };

  // search for blogs by query
  const getSearchedBlogs = async (searchQuery) => {
    try {
      dispatch({
        type: actions.blog.BLOG_FETCHING,
      });

      const res = await publicAxios.get(`/search?q=${searchQuery}`);
      dispatch({
        type: actions.blog.FETCH_SEARCH_DATA,
        payload: res.data,
      });
    } catch (err) {
      if (
        err.message === "Cannot read properties of undefined (reading 'data')"
      ) {
        dispatch({
          type: actions.blog.FETCH_SEARCH_DATA,
          payload: [],
        });
      }

      dispatch({
        type: actions.blog.BLOG_FETCH_ERROR,
        payload: err.message,
      });
    }
  };

  // clear search data
  const clearSearchData = () => {
    dispatch({
      type: actions.blog.FETCH_SEARCH_DATA,
      payload: [],
    });
  };

  return (
    <BlogContext.Provider
      value={{
        state,
        dispatch,
        createBlog,
        deleteBlog,
        editBlog,
        fetchSingleBlog,
        postComment,
        deleteComment,
        blogLiked,
        toggleFavourite,
        fetchAllBlogs,
        getSearchedBlogs,
        clearSearchData,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

BlogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlogProvider;
