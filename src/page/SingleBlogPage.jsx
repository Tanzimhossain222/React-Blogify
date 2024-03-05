import { useEffect, useState } from "react";
import useAxios from "../api/useAxios";
import BlogComment from "../components/blogs/singleBlog/BlogComment";
import BlogContent from "../components/blogs/singleBlog/BlogContent";
import SingleBlogAction from "../components/blogs/singleBlog/SingleBlogAction";

const SingleBlogPage = ({ id = "7c12b4b48531bcc995ae" }) => {
  const { axiosInstance } = useAxios();
  const [singleBlog, setSingleBlog] = useState({});

  useEffect(() => {
    const getBlog = async () => {
      const res = await axiosInstance.get(`/blogs/${id}`);

      setSingleBlog(res.data);
    };
    getBlog();
  }, [axiosInstance, id]);

  return (
    <div>
      <main>
        <section>
          {singleBlog && <BlogContent singleBlog={singleBlog} />}
        </section>
        <section>
          {singleBlog?.comments && (
            <BlogComment comments={singleBlog?.comments} />
          )}
        </section>
      </main>

      <SingleBlogAction singleBlog={singleBlog} />
    </div>
  );
};

export default SingleBlogPage;
