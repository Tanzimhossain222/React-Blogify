import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSkeleton from "../common/LoadingSkeleton";
import BlogFrom from "../components/blogs/createBlog/BlogFrom";
import useBlogs from "../hooks/useBlogs";

const EditBlogPage = () => {
  const { postId } = useParams();
  const { fetchSingleBlog, state } = useBlogs();

  useEffect(() => {
    fetchSingleBlog(postId);
  }, [postId, fetchSingleBlog]);

  if (state.isLoading) {
    return <LoadingSkeleton />;
  }

  const { singleBlog } = state;

  return (
    <main>
      <section>
        <div className="container">
          {singleBlog && Object.keys(singleBlog).length > 0 && (
            <BlogFrom EditBlog={singleBlog} />
          )}
        </div>
      </section>
    </main>
  );
};

export default EditBlogPage;
