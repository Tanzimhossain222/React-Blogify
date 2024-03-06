import useProfile from "../../hooks/useProfile";
import BlogCard from "./BlogCard";

const ProfileBlogs = () => {
  const { state } = useProfile();
  const blogs = state?.blogs;
  
  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
      <div className="my-6 space-y-4">
        {blogs?.length > 0 &&
          blogs?.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
      </div>
    </>
  );
};

export default ProfileBlogs;
