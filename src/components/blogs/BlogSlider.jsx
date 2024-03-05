import FavouriteBlogs from "./FavouriteBlogs";
import MostPopularBlogs from "./MostPopularBlogs";

const BlogSlider = () => {
  return (
    <div className="md:col-span-2 h-full w-full space-y-5">
      <MostPopularBlogs />

      <FavouriteBlogs />
    </div>
  );
};

export default BlogSlider;
