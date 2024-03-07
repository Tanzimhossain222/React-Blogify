import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogCommentList from "../components/blogs/singleBlog/BlogCommentList";
import BlogContent from "../components/blogs/singleBlog/BlogContent";
import SingleBlogAction from "../components/blogs/singleBlog/SingleBlogAction";
import useBlogs from "../hooks/useBlogs";

const SingleBlogPage = () => {
  const { blogId } = useParams();
  const { fetchSingleBlog, state } = useBlogs();

  useEffect(() => {
    fetchSingleBlog(blogId);
  }, [blogId, fetchSingleBlog]);

  if (state.loading) {
    return <h1>Loading...</h1>;
  }

  const { singleBlog } = state;

  return (
    <div>
      <main>
        <section>
          {singleBlog && <BlogContent singleBlog={singleBlog} />}
        </section>
        <section>
          {singleBlog?.comments && (
            <BlogCommentList
              comments={singleBlog?.comments}
              postId={singleBlog.id}
            />
          )}
        </section>
      </main>

      {singleBlog && <SingleBlogAction singleBlog={singleBlog} />}
    </div>
  );
};

export default SingleBlogPage;
