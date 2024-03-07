import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import commentIcon from "../../../assets/icons/comment.svg";
import favouriteIcon from "../../../assets/icons/heart-filled.svg";
import unFavouriteIcon from "../../../assets/icons/heart.svg";
import likeFilledIcon from "../../../assets/icons/like-filled.svg";
import likeIcon from "../../../assets/icons/like.svg";
import useAuth from "../../../hooks/useAuth";
import useBlogs from "../../../hooks/useBlogs";

const SingleBlogAction = ({ singleBlog }) => {
  const { blogLiked, toggleFavourite, state } = useBlogs();
  const {
    auth: { user },
  } = useAuth();

  const liked = user
    ? singleBlog?.likes?.find((like) => like.id === user.id)
    : false;

  const [toggleFav, setToggleFav] = useState(false);
  const [isLike, setIsLike] = useState(liked);

  const handleLike = async () => {
    if (!user) {
      toast.error("Please log in to like this blog.", {
        position: "top-center",
        autoClose: 2500,
      });
      return;
    }
    const data = await blogLiked(singleBlog.id);
    setIsLike(data);
  };

  const handleFavourite = () => {
    if (!user) {
      toast.error("Please log in to favorite this blog.", {
        position: "top-center",
        autoClose: 2500,
      });
      return;
    }
    toggleFavourite(singleBlog.id);
    setToggleFav(!toggleFav);
  };

  useEffect(() => {
    const isFavourite = state?.singleBlog?.isFavourite;
    setToggleFav(isFavourite);
  }, [state?.singleBlog?.isFavourite]);

  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li>
          <img
            src={isLike ? likeFilledIcon : likeIcon}
            alt="like"
            onClick={handleLike}
          />
          <span>{singleBlog?.likes?.length ? singleBlog.likes.length : 0}</span>
        </li>

        <li>
          <img
            src={!toggleFav ? unFavouriteIcon : favouriteIcon}
            alt="Favourite"
            onClick={handleFavourite}
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

SingleBlogAction.propTypes = {
  singleBlog: PropTypes.object,
};

export default SingleBlogAction;
