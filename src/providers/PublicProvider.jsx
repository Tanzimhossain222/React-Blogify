import { useReducer } from "react";
import { DisplayBlogContext } from "../context";
import PropTypes from "prop-types";
import { DisplayBlogsReducer,initialState } from "../reducers/DisplayBlogsReducer";
import actions from "../actions";
import axiosInstance from "../api/axiosInstance";


const PublicProvider = ({ children }) => {

    const [state, dispatch] = useReducer(DisplayBlogsReducer, initialState);

    const fetchAllBlogs = async ()=>{
        try {
            dispatch({type: actions.display.DISPLAY_FETCHING});

            const res = await axiosInstance.get("/blogs");
            dispatch({
                type: actions.display.DISPLAY_BLOG_FETCHED,
                payload: res.data,
            })

        } catch (err) {
            dispatch({
                type: actions.display.DISPLAY_ERROR,
                payload: err.message,
            })
        }
    }



    return (
        <DisplayBlogContext.Provider value={{state, fetchAllBlogs}}>
            {children}
        </DisplayBlogContext.Provider>
    );
}

PublicProvider.propTypes = {
    children: PropTypes.node.isRequired,
    };


export default PublicProvider;