import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosAPI/axiosInstance";

const MostPopularBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchPopularBlogs() {
      const res = await axiosInstance.get("blogs/popular?page=2&limit=5");
      setBlogs(res.data?.blogs);
    }

    fetchPopularBlogs();
  }, []);

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Most Popular 👍️
      </h3>

      <ul className="space-y-5 my-5">
        {blogs?.length > 1 &&
          blogs?.map((blog) => (
            <li key={blog.id}>
              <Link to={`/singleBlog/${blog?.id}`}>
                <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                  {blog.title}
                </h3>
              </Link>
              <p className="text-slate-600 text-sm ">
                by
                <Link to={`/Profile/${blog.author?.id}`}>
                  <span className="hover:text-slate-500">
                    {blog.author?.firstName + " " + blog.author?.lastName}{" "}
                  </span>
                </Link>
                <span>·</span> {blog?.likes?.length} Likes
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MostPopularBlogs;
