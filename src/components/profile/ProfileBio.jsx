import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import editIcon from "../../assets/icons/edit.svg";
import useAuthCheck from "../../hooks/useAuthCheck";
import useProfile from "../../hooks/useProfile";
import checkIcon from "./../../assets/icons/check.svg";

const ProfileBio = ({ user }) => {
  const { handleUserDataEdit } = useProfile();

  const isMe = useAuthCheck(user?.id);

  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleBioEdit = () => {
    if (isEditing) {
      handleUserDataEdit({ bio });
    }
    setIsEditing(!isEditing);
  };

  // Update bio state when the user prop changes
  useEffect(() => {
    setBio(user?.bio || "");

    //when component is unmounted, clear the bio
    return () => {
      setBio("");
    }
  }, [user]);

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {!isEditing ? (
          bio === "" && isMe ? (
            <p className="text-sm lg:text-base">Set Your Bio</p>
          ) : (
            <p className="text-sm lg:text-base">{bio}</p>
          )
        ) : (
          <textarea
            value={bio}
            rows={4}
            cols={55}
            onChange={(e) => setBio(e.target.value)}
            className="w-full h-20 p-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200  text-sm lg:text-base bg-[#333]"
          />
        )}
      </div>

      {isMe &&
        (!isEditing ? (
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
        ))}
    </div>
  );
};

ProfileBio.propTypes = {
  user: PropTypes.object,
};

export default ProfileBio;
