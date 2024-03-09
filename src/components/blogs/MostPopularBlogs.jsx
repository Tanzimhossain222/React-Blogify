import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosAPI/axiosInstance";

const MostPopularBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [state, setState] = useState({
    limit: 5,
    hasMore: true,
    total: 0,
    page: 1,
  });

  useEffect(() => {
    async function fetchPopularBlogs() {
      try {
        const res = await axiosInstance.get(
          `blogs/popular?limit=${state.limit}`
        );
        setBlogs(res.data?.blogs);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPopularBlogs();

    //when component is unmounted, clear the blogs
    return () => {
      setBlogs([]);
    };
  }, [state.limit]);

  const handleClick = () => {
    if (state.hasMore) {
      const blogLength = blogs.length;
      setState((prevState) => ({
        ...prevState,
        limit: prevState.limit + 5,
        total: blogLength,
        hasMore: prevState.total === blogLength ? false : true,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        limit: 5,
        hasMore: true,
      }));
    }
  };

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Most Popular 👍️
      </h3>

      <ul className="space-y-5 my-5">
        {blogs?.length > 0 &&
          blogs?.map((blog) => (
            <li key={blog.id}>
              <Link to={`/singleBlog/${blog?.id}`}>
                <h3 className="text-slate-500 hover:text-slate-600 font-medium transition-all cursor-pointer">
                  {blog.title}
                </h3>
              </Link>
              <p className="text-slate-600 text-sm">
                by{" "}
                <Link to={`/Profile/${blog.author?.id}`}>
                  <span className="hover:underline">
                    {blog.author?.firstName + " " + blog.author?.lastName}{" "}
                  </span>
                </Link>
                <span>·</span> {blog?.likes?.length} Likes
              </p>
            </li>
          ))}
      </ul>

      <button onClick={handleClick} className="text-slate-400 hover:underline">
        {state.hasMore ? "Show More" : "Show Less"} Blogs
      </button>
    </div>
  );
};

export default MostPopularBlogs;
