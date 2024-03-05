import PropTypes from "prop-types";
import { useReducer } from "react";
import useAxios from "../api/useAxios";
import { BlogContext } from "../context";
import { blogReducer, initialValues } from "../reducers/BlogReducer";

const BlogProvider = ({ children }) => {
  const [blogs, dispatch] = useReducer(blogReducer, initialValues);
  const { axiosInstance } = useAxios();

  const createBlog = async (blogData) => {
    try {
      const res = await axiosInstance.post("/blogs", blogData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status !== 201) {
        throw new Error("An error occurred");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BlogContext.Provider value={{ blogs, dispatch, createBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

BlogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlogProvider;
