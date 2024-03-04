import { Link } from "react-router-dom";
import logoutIcon from "../../../assets/icons/logout.svg";
import useAuth from "../../../hooks/useAuth";

const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Link
        to="/login"
        className="text-white/50 hover:text-white transition-all duration-200"
        onClick={handleLogout}
      >
        <img src={logoutIcon} alt="Logout" />
      </Link>
    </>
  );
};

export default Logout;
