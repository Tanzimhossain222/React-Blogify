import PropTypes from "prop-types";
import { useCallback, useReducer } from "react";
import actions from "../actions";
import publicAxios from "../api/axiosInstance";
import useAxios from "../api/useAxios";
import { ProfileContext } from "../context";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  initialProfileState,
  profileReducer,
} from "../reducers/ProfileReducer";

const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialProfileState);
  const { axiosInstance } = useAxios();
  const { setLocalStorage, getLocalStorage } = useLocalStorage();

  // Fetch user profile data
  const fetchProfileData = useCallback(
    async (id) => {
      dispatch({ type: actions.profile.DATA_FETCHING });

      try {
        const res = await axiosInstance.get(`/profile/${id}`);

        if (res.status === 200) {
          const formattedData = {
            user: {
              id: res.data.id,
              email: res.data.email,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              avatar: res.data.avatar,
              bio: res.data.bio,
              favourites: res.data.favourites,
            },
            blogs: res.data.blogs,
          };

          dispatch({
            type: actions.profile.DATA_FETCHED,
            payload: formattedData,
          });

          return formattedData;
        }
      } catch (err) {
        dispatch({
          type: actions.profile.DATE_FETCH_ERROR,
          payload: err.message,
        });
      }
    },
    [dispatch, axiosInstance]
  );

  //handle Image upload
  const handleImageChange = async (e) => {
    const formData = new FormData();
    for (const file of e.target.files) {
      formData.append("avatar", file);
    }

    dispatch({ type: actions.profile.DATA_FETCHING });

    try {
      const res = await axiosInstance.post("/profile/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status !== 200) {
        throw new Error(res.data.message);
      }

      dispatch({
        type: actions.profile.IMAGE_UPLOADED,
        payload: { avatar: res.data.user.avatar },
      });

      // Update localStorage
      const user = getLocalStorage("user", true);
      user.avatar = res.data.user.avatar;
      setLocalStorage("user", user, true);

      return res.data.avatar;
    } catch (error) {
      dispatch({
        type: actions.profile.DATE_FETCH_ERROR,
        payload: error.message,
      });
    }
  };

  //handle Edit user data
  const handleUserDataEdit = async (data) => {
    dispatch({ type: actions.profile.DATA_FETCHING });

    try {
      const res = await axiosInstance.patch("/profile", data);

      if (res.status !== 200) {
        throw new Error(res.data.message);
      }

      dispatch({
        type: actions.profile.USER_DATA_EDITED,
        payload: res.data.user,
      });

      // Update localStorage
      setLocalStorage("user", res.data.user, true);
    } catch (err) {
      dispatch({
        type: actions.profile.DATE_FETCH_ERROR,
        payload: err.message,
      });
    }
  };

  //handle Single Blog Delete
  const deleteBlog = async (blogId) => {
    try {
      dispatch({
        type: actions.profile.DATA_FETCHING,
      });

      const res = await axiosInstance.delete(`/blogs/${blogId}`);

      if (res.status !== 200) {
        throw new Error("An error occurred");
      }
      console.log(blogId, "blogId");
      dispatch({
        type: actions.profile.PROFILE_BLOG_DELETED,
        payload: blogId,
      });
    } catch (err) {
      dispatch({
        type: actions.profile.DATE_FETCH_ERROR,
        payload: err.message,
      });
    }
  };

  //fetch blog author
  const fetchBlogAuthor = async (id) => {
    // dispatch({ type: actions.profile.DATA_FETCHING });

    try {
      const res = await publicAxios.get(`/profile/${id}`);
      if (res.status === 200) {
        const formattedData = {
          blogAuthor: {
            id: res.data.id,
            email: res.data.email,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            avatar: res.data.avatar,
            bio: res.data.bio,
          },
          blogs: res.data.blogs,
        };

        dispatch({
          type: actions.profile.FETCH_BLOG_AUTHOR,
          payload: formattedData,
        });
        return formattedData;
      }
    } catch (err) {
      dispatch({
        type: actions.profile.DATE_FETCH_ERROR,
        payload: err.message,
      });
    }
  };

  return (
    <>
      <ProfileContext.Provider
        value={{
          state,
          dispatch,
          fetchProfileData,
          handleImageChange,
          handleUserDataEdit,
          deleteBlog,
          fetchBlogAuthor,
        }}
      >
        {children}
      </ProfileContext.Provider>
    </>
  );
};

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProfileProvider;
