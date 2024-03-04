import useAvatar from "../../hooks/useAvatar";

const BlogCard = ({ blog }) => {

  const authorAvatar = useAvatar(blog?.author);
  return (
    <div className="blog-card">
      <img
        className="blog-thumb"
        src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${blog?.thumbnail}`}
        alt=""
      />
      <div className="mt-2">
        <h3 className="text-slate-300 text-xl lg:text-2xl"> {blog?.title} </h3>
        <p className="mb-6 text-base text-slate-500 mt-1">
          {blog?.content?.substring(0, 250)}...
        </p>

        {/* <!-- Meta Informations --> */}
        <div className="flex justify-between items-center">
          <div className="flex items-center capitalize space-x-2">
            <div className="avater-img bg-indigo-600 text-white">
              <span className="">
              {blog?.author?.avatar ? (
            <img src={authorAvatar} alt="avatar" className="cursor-pointer rounded-full" />
          ) : (
            authorAvatar
          )}
              </span>
            </div>

            <div>
              <h5 className="text-slate-500 text-sm">{`${blog?.author?.firstName} ${blog?.author?.lastName}` }</h5>
              <div className="flex items-center text-xs text-slate-700">
                <span>June 28, 2018</span>
              </div>
            </div>
          </div>

          <div className="text-sm px-2 py-1 text-slate-700">
            <span>100 Likes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
