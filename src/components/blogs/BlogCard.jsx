import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import threeDotsIcon from "../../assets/icons/3dots.svg";
import useAuthCheck from "../../hooks/useAuthCheck";
import useAvatar from "../../hooks/useAvatar";
import DateFormate from "../../utils/dateTimeFormate";
import BlogAction from "./BlogAction";

const BlogCard = ({ blog }) => {
  const authorAvatar = useAvatar(blog?.author);
  const [actionMenu, setActionMenu] = useState(false);
  const navigation = useNavigate();

  const isMe = useAuthCheck(blog?.author?.id);

  const handleProfileClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      className="blog-card"
      onClick={() => navigation(`/singleBlog/${blog?.id}`)}
    >
      <img
        className="blog-thumb"
        src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
          blog?.thumbnail
        }`}
        alt="blog-thumb"
      />

      <div className="mt-2 relative">
        <h3 className="text-slate-300 text-xl lg:text-2xl hover:text-slate-400 ">
          {" "}
          {blog?.title}{" "}
        </h3>
        <p className="mb-6 text-base text-slate-500 mt-1">
          {blog?.content?.substring(0, 250)}...
        </p>

        {/* <!-- Meta Informations --> */}
        <div className="flex justify-between items-center">
          <div className="flex items-center capitalize space-x-2">
            <Link
              to={`/Profile/${blog?.author?.id}`}
              onClick={handleProfileClick}
            >
              <div className="avater-img bg-indigo-600 text-white">
                <span className="">
                  {blog?.author?.avatar ? (
                    <img
                      src={authorAvatar}
                      alt="avatar"
                      className="cursor-pointer rounded-full"
                    />
                  ) : (
                    authorAvatar
                  )}
                </span>
              </div>
            </Link>

            <div>
              <Link
                to={`/Profile/${blog?.author?.id}`}
                onClick={handleProfileClick}
              >
                <h5 className="text-slate-500 text-sm  hover:underline">{`${blog?.author?.firstName} ${blog?.author?.lastName}`}</h5>
              </Link>
              <div className="flex items-center text-xs text-slate-500">
                <span>{DateFormate(blog?.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="text-sm px-2 py-1 text-slate-500">
            <span>{blog?.likes.length} Likes</span>
          </div>
        </div>

        {/* <!-- Action Buttons --> */}

        {isMe && (
          <div
            className="absolute right-0 top-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button>
              <img
                src={threeDotsIcon}
                alt="3dots of Action"
                onClick={(e) => {
                  setActionMenu(!actionMenu);
                  e.stopPropagation();
                }}
              />
            </button>
            {actionMenu && <BlogAction blog={blog} />}
          </div>
        )}
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.object,
};

export default BlogCard;
