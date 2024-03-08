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
import useProfile from "../../../hooks/useProfile";

const SingleBlogAction = ({ singleBlog }) => {
  const { blogLiked, toggleFavourite, state } = useBlogs();
  // console.log(favourites, "favourites");
  // console.log(useAuth());
  const {
    auth: { user },
  } = useAuth();

  // const liked = user
  //   ? singleBlog?.likes?.find((like) => like.id === user.id)
  //   : false;

  const [toggleFav, setToggleFav] = useState(false);
  const [isLike, setIsLike] = useState(false);

  const handleLike = async () => {
    try {
      if (!user) {
        toast.error("Please log in to like this blog.", {
          position: "top-center",
          autoClose: 2500,
        });
        return;
      }
      const data = await blogLiked(singleBlog.id);
      setIsLike(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFavourite = async () => {
    try {
      if (!user) {
        toast.error("Please log in to favorite this blog.", {
          position: "top-center",
          autoClose: 2500,
        });
        return;
      }
      const data = await toggleFavourite(singleBlog.id);
      setToggleFav(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const isLiked = state?.singleBlog?.likes?.find((like) => like.id === user?.id);
    const isFavourite = state?.singleBlog?.isFavourite;
    // console.log(isFavourite, "isFavourite");
    setToggleFav(isFavourite);
    setIsLike(isLiked);

  }, [state?.singleBlog?.isFavourite, user?.id, state?.singleBlog?.likes]);

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
            src={toggleFav ? favouriteIcon : unFavouriteIcon}
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
