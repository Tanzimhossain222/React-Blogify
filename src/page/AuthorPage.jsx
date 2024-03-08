import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSkeleton from "../common/LoadingSkeleton";
import ProfileBlogs from "../components/blogs/ProfileBlogs";
import ProfileInfo from "../components/profile/ProfileInfo";
import useAuthCheck from "../hooks/useAuthCheck";
import useProfile from "../hooks/useProfile";

const AuthorPage = () => {
  const { userId } = useParams();
  const { state, fetchProfileData } = useProfile();
  const isMe = useAuthCheck(userId);
  const navigation = useNavigate();

  if (isMe) {
    navigation("/profile/me");
  }

  useEffect(() => {
    if (userId) {
      fetchProfileData(userId, false);
    }

  }, [userId,fetchProfileData]);

  if (state?.loading) {
    return <LoadingSkeleton />;
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
