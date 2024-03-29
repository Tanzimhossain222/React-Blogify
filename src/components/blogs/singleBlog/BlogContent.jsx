import DOMPurify from "dompurify";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useAvatar from "../../../hooks/useAvatar";
import DateFormate from "../../../utils/dateTimeFormate";

const BlogContent = ({ singleBlog }) => {
  const authorAvatar = useAvatar(singleBlog?.author);
  const navigation = useNavigate();

  // Sanitize HTML content
  const sanitizedContent = singleBlog?.content
    ? DOMPurify.sanitize(singleBlog.content)
    : "";

  return (
    <div className="container text-center py-8">
      <h1 className="font-bold text-3xl md:text-5xl">{singleBlog?.title}</h1>
      <div className="flex justify-center items-center my-4 gap-4">
        <div className="flex items-center capitalize space-x-2">
          <div className="avater-img bg-indigo-600 text-white">
            <span
              className=""
              onClick={() => navigation(`/profile/${singleBlog?.author?.id}`)}
            >
              {singleBlog?.author?.avatar ? (
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
          <h5
            className="text-slate-500 text-sm cursor-pointer hover:text-slate-600 hover:underline"
            onClick={() => navigation(`/profile/${singleBlog?.author?.id}`)}
          >
            {singleBlog?.author?.firstName + " " + singleBlog?.author?.lastName}
          </h5>
        </div>
        <span className="text-sm text-slate-600 dot">
          {DateFormate(singleBlog?.createdAt)}
        </span>
        <span className="text-sm text-slate-600 dot">
          {singleBlog?.likes?.length} Likes
        </span>
      </div>
      <img
        className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
        src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
          singleBlog?.thumbnail
        }`}
        alt=""
      />

      {/* <!-- Tags --> */}
      <ul className="tags">
        {singleBlog?.tags &&
          singleBlog.tags
            .split(",")
            .map((tag, index) => <li key={index}>{tag.trim()}</li>)}
      </ul>

      {/* <!-- Content --> */}
      <div
        className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      ></div>
    </div>
  );
};

BlogContent.propTypes = {
  singleBlog: PropTypes.object,
};

export default BlogContent;
