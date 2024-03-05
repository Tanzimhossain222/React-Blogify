//implemnt The infinity scroll here
import { useEffect, useRef, useState } from "react";

import BlogCard from "./BlogCard";
import axiosInstance from "../../api/axiosInstance";

const BlogLists = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);


  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axiosInstance.get(`/blogs?limit=4&page=${page + 1}`);
      const newBlogs = res.data?.blogs;

      if (newBlogs.length === 0) {
        setHasMore(false);
      }else {
        setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
        setPage((prevPage) => prevPage + 1);
      }
      
    };

    const onIntersect = (items) => {
      const loaderItem = items[0];

      if (loaderItem.isIntersecting && hasMore) {
        fetchBlogs();
      }
    };

    const observer = new IntersectionObserver(onIntersect);

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    //clean up
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [hasMore, page]);

  return (
    <div className="space-y-3 md:col-span-5">
      {blogs.length > 0 &&
        blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}

      <p className="text-center my-2 text-xl" ref={loaderRef}>
        {hasMore ? "Loading..." : "No more blogs to load"}
      </p>
    </div>
  );
};

export default BlogLists;
