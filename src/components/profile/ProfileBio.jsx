import { useState } from "react";
import editIcon from "../../assets/icons/edit.svg";
import useProfile from "../../hooks/useProfile";
import checkIcon from "./../../assets/icons/check.svg";

const ProfileBio = () => {
  const {
    state: { user },
    handleUserDataEdit,
  } = useProfile();

  const [bio, setBio] = useState(user?.bio || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleBioEdit = () => {
    setIsEditing(false);
    handleUserDataEdit({ bio });
  };

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {!isEditing ? (
          bio === "" ? (
            <p className="text-sm lg:text-base">Set Your Bio</p>
          ) : (
            <p className="text-sm lg:text-base">{bio}</p>
          )
        ) : (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full h-20 p-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200  text-sm lg:text-base bg-[#333]"
          />
        )}
      </div>
      {!isEditing ? (
        <button
          className="flex-center h-7 w-7 rounded-full"
          onClick={() => setIsEditing(true)}
        >
          <img src={editIcon} alt="Edit" />
        </button>
      ) : (
        <button
          className="flex-center h-7 w-7 rounded-full"
          onClick={handleBioEdit}
        >
          <img src={checkIcon} alt="Edit" />
        </button>
      )}
    </div>
  );
};

export default ProfileBio;
