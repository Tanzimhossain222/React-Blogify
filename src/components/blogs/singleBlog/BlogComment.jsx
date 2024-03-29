import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../../../assets/icons/delete.svg";
import useAuthCheck from "../../../hooks/useAuthCheck";
import useAvatar from "../../../hooks/useAvatar";
import useBlogs from "../../../hooks/useBlogs";

const BlogComment = ({ comment, postId }) => {
  const { deleteComment } = useBlogs();
  const navigation = useNavigate();

  const isMe = useAuthCheck(comment.author.id);

  const commentAvatar = useAvatar(comment.author);

  const handleDeleteComment = (commentId) => {

    window.confirm("Are you sure you want to delete this comment?") &&
    deleteComment(commentId, postId);
  };

  return (
    <>
      <div className="avater-img bg-orange-600 text-white cursor-pointer">
        <span
          className=""
          onClick={() => navigation(`/profile/${comment?.author?.id}`)}
        >
          {comment?.author?.avatar ? (
            <img
              src={commentAvatar}
              alt="avatar"
              className="cursor-pointer rounded-full"
            />
          ) : (
            commentAvatar
          )}
        </span>
      </div>

      <div className="w-full">
        <div className="flex justify-between">
          <h5
            className="text-slate-500 font-bold  cursor-pointer hover:text-slate-600 hover:underline"
            onClick={() => navigation(`/profile/${comment?.author?.id}`)}
          >
            {comment.author.firstName + " " + comment.author.lastName}
          </h5>
          {isMe && (
            <span>
              <img
                src={deleteIcon}
                alt="delete"
                onClick={() => handleDeleteComment(comment.id)}
                className="w-4 h-4 md:w-6 md:h-6 cursor-pointer  "
              />
            </span>
          )}
        </div>
        <p className="text-slate-300">{comment.content}</p>
      </div>
    </>
  );
};

BlogComment.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
};

export default BlogComment;
