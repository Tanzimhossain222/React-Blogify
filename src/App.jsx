import { Route, Routes } from "react-router-dom";
import CreateBlogPage from "./page/CreateBlogPage";
import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import NotFoundPage from "./page/NotFoundPage";
import ProfilePage from "./page/ProfilePage";
import RegisterPage from "./page/RegisterPage";
import SearchPage from "./page/SearchPage";
import SingleBlogPage from "./page/SingleBlogPage";
import ProfileProvider from "./providers/ProfileProvider";
import PrivateRoutes from "./routes/PrivateRoutes";
import ProfilePageTest from "./page/ProfilePageTest";
import BlogProvider from "./providers/BlogProvider";

const App = () => {
  return (
    <BlogProvider>
      <ProfileProvider>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/createBlog" element={<CreateBlogPage />} />
            <Route path="/singleBlog/:blogId" element={<SingleBlogPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          <Route path="testProfile/:userID" element={<ProfilePageTest />} />
          </Route>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ProfileProvider>
    </BlogProvider>
  );
};

export default App;
