import { useState } from "react";
import commentIcon from "../../../assets/icons/comment.svg";
import favouriteIcon from "../../../assets/icons/heart-filled.svg";
import unFavouriteIcon from "../../../assets/icons/heart.svg";
import likeIcon from "../../../assets/icons/like.svg";

const SingleBlogAction = ({ singleBlog }) => {
  const [toggleFav, setToggleFav] = useState(false);

  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li>
          <img src={likeIcon} alt="like" />
          <span>{singleBlog?.likes?.length ? singleBlog.likes.length : 0}</span>
        </li>

        <li>
          <img
            src={toggleFav ? unFavouriteIcon : favouriteIcon}
            alt="Favourite"
            onClick={() => setToggleFav(!toggleFav)}
          />
        </li>
        <a href="#comments">
          <li>
            <img src={commentIcon} alt="Comments" />
            <span>
              {singleBlog?.comments?.length ? singleBlog.comments.length : 0}
            </span>
          </li>
        </a>
      </ul>
    </div>
  );
};

export default SingleBlogAction;
