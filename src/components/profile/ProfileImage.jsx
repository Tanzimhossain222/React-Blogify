import { useRef } from "react";
import editIcon from "../../assets/icons/edit.svg";
import useAvatar from "../../hooks/useAvatar";
import useProfile from "../../hooks/useProfile";

const ProfileImage = () => {
  const {
    state: { user },
    handleImageChange,
  } = useProfile();
  const fileUploadRef = useRef(null);
  const userAvatar = useAvatar(user);

  const handleImageUpload = (e) => {
    e.preventDefault();
    fileUploadRef.current.addEventListener("change", handleImageChange);
    fileUploadRef.current.click();
  };

  // const updateImageDisplay =async (e) => {
  //   const formData = new FormData();
  //   for (const file of e.target.files) {
  //     formData.append("avatar", file);
  //   }
  // }

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
        <span className="">
          {user?.avatar ? (
            <img
              src={userAvatar}
              alt="avatar"
              className="cursor-pointer rounded-full"
            />
          ) : (
            userAvatar
          )}
        </span>
      </div>
      <form>
        <button
          className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
          onClick={handleImageUpload}
        >
          <img src={editIcon} alt="Edit" />
        </button>
        <input type="file" id="file" ref={fileUploadRef} hidden />
      </form>
    </div>
  );
};

export default ProfileImage;
