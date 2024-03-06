import PropTypes from "prop-types";
import { useCallback, useReducer } from "react";
import actions from "../actions";
import useAxios from "../api/useAxios";
import { BlogContext } from "../context";
import { blogReducer, initialValues } from "../reducers/BlogReducer";

const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialValues);

  const { axiosInstance } = useAxios();

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

  const fetchSingleBlog = useCallback(
    async (id) => {
      try {
        dispatch({
          type: actions.blog.BLOG_FETCHING,
        });
        const res = await axiosInstance.get(`/blogs/${id}`);

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

  const postComment = async (content, blogId) => {
    try {
      const res = await axiosInstance.post(`/blogs/${blogId}/comment`, {
        content,
      });

      if (res.status !== 200) {
        throw new Error("An error occurred");
      }

      console.log(res.data);

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
