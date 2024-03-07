import useProfile from "../../hooks/useProfile";
import ProfileBio from "./ProfileBio";
import ProfileDetails from "./ProfileDetails";
import ProfileImage from "./ProfileImage";

const ProfileInfo = () => {
  const { state } = useProfile();
  const { user, blogAuthor } = state;

  if (!user && !blogAuthor) {
    return null;
  }

  // decide which profile to render
  const profile = user || blogAuthor;

  return (
    <div className="flex flex-col items-center py-8 text-center">
      <ProfileImage user={profile} />
      <ProfileDetails user={profile} />
      <ProfileBio user={profile} />

      <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
    </div>
  );
};

export default ProfileInfo;
