import { useEffect } from "react";
import useBlogs from "../../hooks/useBlogs";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import BlogCard from "./BlogCard";

const BlogLists = () => {
  const { items, loaderRef, hasMore, setShouldFetchBlogs } = useInfiniteScroll(
    "/blogs",
    10
  ); // 10 is the limit of blogs to fetch, you can change it to any number you want

  const { state } = useBlogs();
  const blogs = state?.blogs || [];

  useEffect(() => {
    setShouldFetchBlogs(true); // Trigger fetchBlogs after the component has re-rendered
  }, [items, setShouldFetchBlogs]);

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
