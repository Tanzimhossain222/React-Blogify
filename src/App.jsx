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

import AuthorPage from "./page/AuthorPage";
import EditBlogPage from "./page/EditBlogPage";
import BlogProvider from "./providers/BlogProvider";
import PublicRoutes from "./routes/PublicRoutes";

const App = () => {
  return (
    <BlogProvider>
      <ProfileProvider>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile/:userId" element={<AuthorPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/singleBlog/:blogId" element={<SingleBlogPage />} />
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route path="/createBlog" element={<CreateBlogPage />} />
            <Route path="/profile/me" element={<ProfilePage />} />
            <Route path="/blogEdit/:postId" element={<EditBlogPage />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </ProfileProvider>
    </BlogProvider>
  );
};

export default App;
