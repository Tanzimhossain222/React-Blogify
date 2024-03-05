import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const MostPopularBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchPopularBlogs() {
      const res = await axiosInstance.get("blogs/popular?page=2&limit=4");
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
              <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                {blog.title}
              </h3>
              <p className="text-slate-600 text-sm">
                by
                <Link to="/profile">
                  {" "}
                  {blog.author?.firstName + " " + blog.author?.lastName}{" "}
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
