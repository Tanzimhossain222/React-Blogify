import useProfile from "../../hooks/useProfile";

const ProfileDetails = () => {
  const {
    state: { user },
  } = useProfile();

  return (
    <div>
      <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
        {user?.firstName + " " + user?.lastName}
      </h3>
      <p className="leading-[231%] lg:text-lg">{user?.email}</p>
    </div>
  );
};

export default ProfileDetails;
