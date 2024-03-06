import PropTypes from "prop-types";
import BlogComment from "./BlogComment";
import CommentBox from "./CommentBox";

const BlogCommentList = ({ comments = [], postId }) => {
  return (
    <section id="comments">
      <div className="mx-auto w-full md:w-10/12 container">
        <h2 className="text-3xl font-bold my-8">
          Comments ({comments.length})
        </h2>

        <CommentBox postId={postId} />

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
