import { Route, Routes } from "react-router-dom";
import CreateBlogPage from "./page/CreateBlogPage";
import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import NotFoundPage from "./page/NotFoundPage";
import ProfilePage from "./page/ProfilePage";
import RegisterPage from "./page/RegisterPage";
import SearchPage from "./page/SearchPage";
import SingleBlogPage from "./page/SingleBlogPage";
import PrivateRoutes from "./routes/PrivateRoutes";

const App = () => {
  return (
    <>
      <>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/createBlog" element={<CreateBlogPage />} />
            <Route path="/singleBlog" element={<SingleBlogPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    </>
  );
};

export default App;
