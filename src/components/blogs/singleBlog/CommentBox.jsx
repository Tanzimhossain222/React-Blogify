import PropTypes from "prop-types";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAvatar from "../../../hooks/useAvatar";
import useBlogs from "../../../hooks/useBlogs";

const CommentBox = ({ postId }) => {
  const [comment, setComment] = useState("");
  const { postComment } = useBlogs();
  const {
    auth: { user },
  } = useAuth();
  const authAvatar = useAvatar(user);

  const handleComment = () => {
    if (comment.trim() === "") return;
    postComment(comment, postId);
    setComment("");
  };

  return (
    <div className="flex items -center space-x-4">
      <div className="avater-img bg-indigo-600 text-white">
        <span className="">
          {user?.avatar ? (
            <img
              src={authAvatar}
              alt="avatar"
              className="cursor-pointer rounded-full"
            />
          ) : (
            authAvatar
          )}
        </span>
      </div>
      <div className="w-full">
        <textarea
          className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
          placeholder="Write a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <div className="flex justify-end mt-4">
          <button
            className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
            onClick={handleComment}
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

CommentBox.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default CommentBox;
