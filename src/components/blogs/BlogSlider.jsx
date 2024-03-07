import useAuth from "../../hooks/useAuth";
import FavouriteBlogs from "./FavouriteBlogs";
import MostPopularBlogs from "./MostPopularBlogs";

const BlogSlider = () => {
  const {auth: {user}} = useAuth();

  return (
    <div className="md:col-span-2 h-full w-full space-y-5">
      <MostPopularBlogs />

      {
        user && (
          <FavouriteBlogs />
        )
      }
    </div>
  );
};

export default BlogSlider;
