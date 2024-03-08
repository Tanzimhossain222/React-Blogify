import { useEffect } from "react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import BlogCard from "./BlogCard";

const BlogLists = () => {
  const { items: blogs, loaderRef, hasMore } = useInfiniteScroll("/blogs", 10); // 10 is the limit of blogs to fetch, you can change it to any number you want

  //This useEffect is used to check if the blogs state has changed and to re-render the component
  useEffect(() => {}, [blogs]);

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
