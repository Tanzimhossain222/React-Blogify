import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";
import useProfile from "../../hooks/useProfile";

const BlogAction = ({ blog }) => {
  const { deleteBlog } = useProfile();
  const navigation = useNavigate();

  const handleEdit = (e) => {
    e.stopPropagation();
    navigation(`/blogEdit/${blog.id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteBlog(blog.id);
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
