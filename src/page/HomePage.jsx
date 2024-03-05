import BlogLists from "../components/blogs/BlogLists";
import BlogSlider from "../components/blogs/BlogSlider";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const { auth } = useAuth();

  return (
    <main>
      <section>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <BlogLists />
            <BlogSlider />
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
