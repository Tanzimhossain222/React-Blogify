import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useBlogApi = (category='') => {
    const [blogs, setBlogs] = useState([]);

    const getBlogs = async (category)=>{
        if(category){
            const res = await axiosInstance.get(`/blogs/${category}?limit=4&page=1`);
            setBlogs(res.data?.blogs);
        }

    }

}