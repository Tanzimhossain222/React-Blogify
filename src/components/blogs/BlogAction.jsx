import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";

const BlogAction = () => {
  return (
    <div className="action-modal-container">
      <button className="action-menu-item hover:text-lwsGreen">
        <img src={editIcon} alt="Edit" />
        Edit
      </button>
      <button className="action-menu-item hover:text-red-500">
        <img src={deleteIcon} alt="Delete" />
        Delete
      </button>
    </div>
  );
};

export default BlogAction;
