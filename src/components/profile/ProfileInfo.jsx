import ProfileBio from "./ProfileBio";
import ProfileDetails from "./ProfileDetails";
import ProfileImage from "./ProfileImage";

const ProfileInfo = () => {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <ProfileImage />
      <ProfileDetails />
      <ProfileBio />

      <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
    </div>
  );
};

export default ProfileInfo;
