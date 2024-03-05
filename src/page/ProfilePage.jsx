import { useEffect } from "react";
import LoadingSkeleton from "../common/LoadingSkeleton";
import ProfileBlogs from "../components/blogs/ProfileBlogs";
import ProfileInfo from "../components/profile/ProfileInfo";
import useAuth from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";

const ProfilePage = () => {
  const {
    auth: { user },
  } = useAuth();

  const { fetchProfileData, state } = useProfile();

  useEffect(() => {
    if (user.id) {
      fetchProfileData(user.id);
      fetchProfileData('3d2dde4b6548275fb066');
    }
  }, [user.id, fetchProfileData]);

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

export default ProfilePage;
