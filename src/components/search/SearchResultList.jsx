import PropTypes from "prop-types";

const SearchResultList = ({ blog }) => {
  return (
    <div className="flex gap-6 py-2" key={`${blog.id}`}>
      <img
        className="h-28 object-contain"
        src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
          blog?.thumbnail
        }`}
        alt=""
      />
      <div className="mt-2">
        <h3 className="text-slate-300 text-xl font-bold">{blog?.title}</h3>

        <p className="mb-6 text-sm text-slate-500 mt-1">
          {blog?.content && blog?.content.slice(0, 100)}...
        </p>
      </div>
    </div>
  );
};

SearchResultList.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default SearchResultList;
