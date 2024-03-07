import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import BlogComment from "./BlogComment";
import CommentBox from "./CommentBox";

const BlogCommentList = ({ comments = [], postId }) => {
  const {
    auth: { user },
  } = useAuth();

  const isLogged = user ? true : false;

  return (
    <section id="comments">
      <div className="mx-auto w-full md:w-10/12 container">
        <h2 className="text-3xl font-bold my-8">
          Comments ({comments.length})
        </h2>

        {isLogged ? (
          <CommentBox postId={postId} />
        ) : (
          <div className="text-center  my-4">
            <p className="text-gray-200 text-lg font-medium">
              Please{" "}
              <Link to="/login" className="text-blue-600 font-semibold">
                log in
              </Link>{" "}
              to leave a comment.
            </p>
          </div>
        )}

        {/* BlogComment List */}
        {comments.length > 0 &&
          comments.map((comment, index) => (
            <div
              key={`${comment.id}_${index}`}
              className="flex items-start space-x-4 my-8"
            >
              <BlogComment comment={comment} postId={postId} />
            </div>
          ))}
      </div>
    </section>
  );
};

BlogCommentList.propTypes = {
  comments: PropTypes.array,
  postId: PropTypes.string,
};

export default BlogCommentList;
