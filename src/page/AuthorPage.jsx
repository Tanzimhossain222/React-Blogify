import { useNavigate, useParams } from "react-router-dom";
import ProfileBlogs from "../components/blogs/ProfileBlogs";
import ProfileInfo from "../components/profile/ProfileInfo";
import useAuthCheck from "../hooks/useAuthCheck";

const AuthorPage = () => {
  const { userId } = useParams();
  const isMe = useAuthCheck(userId);
  const navigation = useNavigate();

  if (isMe) {
    navigation("/profile");
  }

  return (
    <>
      <main className="mx-auto max-w-[1020px] py-8">
        <div className="container">
          <ProfileInfo />
          <ProfileBlogs />
        </div>
      </main>
    </>
  );
};

export default AuthorPage;
