// import { useState } from "react";
// import axiosInstance from "../axiosAPI/axiosInstance";

// const useBlogApi = (category='') => {
//     const [blogs, setBlogs] = useState([]);
//     const [singleBlog, setSingleBlog] = useState({});

//     //fetch single blog
//     const fetchSingleBlog = async (id) => {
//         try {
//             const res = await axiosInstance.get(`/blogs/${id}`);
//             setSingleBlog(res.data);
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     //fetch all blogs 
//     //Todo add category filter



//     return { blogs, singleBlog, fetchSingleBlog };


    

// }