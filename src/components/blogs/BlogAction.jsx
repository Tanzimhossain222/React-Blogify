import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";
import useBlogs from "../../hooks/useBlogs";
import useProfile from "../../hooks/useProfile";

const BlogAction = ({ blog }) => {
  const location = useLocation();
  const { deleteBlog } = useProfile();
  const { removeBlog } = useBlogs();
  const navigation = useNavigate();
  const handleEdit = (e) => {
    e.stopPropagation();

    navigation(`/blogEdit/${blog.id}`);
  };

  const handleDelete = async (e) => {
    let msg;
    e.stopPropagation();
    if (window.confirm("Are you sure you want to Delete this blog?")) {
      if (location.pathname === "/profile/me") {
        msg = await deleteBlog(blog.id);
      } else {
        msg = await removeBlog(blog.id);
      }
    }
    toast.success(msg, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="action-modal-container">
      <button
        className="action-menu-item hover:text-lwsGreen"
        onClick={handleEdit}
      >
        <img src={editIcon} alt="Edit" />
        Edit
      </button>
      <button
        className="action-menu-item hover:text-red-500"
        onClick={handleDelete}
      >
        <img src={deleteIcon} alt="Delete" />
        Delete
      </button>
    </div>
  );
};

BlogAction.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default BlogAction;
