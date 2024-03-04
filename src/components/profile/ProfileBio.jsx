import editIcon from "../../assets/icons/edit.svg";
import useProfile from "../../hooks/useProfile";

const ProfileBio = () => {
  const {
    state: { user },
  } = useProfile();

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        <p className="leading-[188%] text-gray-400 lg:text-lg">{user?.bio}</p>
      </div>

      <button className="flex-center h-7 w-7 rounded-full">
        <img src={editIcon} alt="Edit" />
      </button>
    </div>
  );
};

export default ProfileBio;
