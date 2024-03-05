import { Link, useNavigate } from "react-router-dom";
import searchIcon from "../../assets/icons/search.svg";
import logo from "../../assets/logo.svg";
import useAuth from "../../hooks/useAuth";
import useAvatar from "../../hooks/useAvatar";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Logout from "../auth/logout/Logout";

const Header = () => {
  const { auth, loading } = useAuth();
  const user = useCurrentUser();
  const userAvatar = useAvatar(user);
  const navigate = useNavigate();

  const isLogin = auth?.user ? true : false;

  if (loading) return null;

  return (
    <header>
      <nav className="container">
        <div>
          <Link to="/">
            <img className="w-32" src={logo} alt="lws" />
          </Link>
        </div>

        {/* <!-- For Not Logged in User - Login Menu --> */}
        <div>
          <ul className="flex items-center space-x-5">
            <li>
              <Link
                to="/createBlog"
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Write
              </Link>
            </li>
            <li>
              <Link
                to="/search"
                className="flex items-center gap-2 cursor-pointer"
              >
                <img src={searchIcon} alt="Search" />
                <span>Search</span>
              </Link>
            </li>

            {/**
             * Conditional rendering of the login button & user avatar.
             * If the user is logged in, the logout button and user avatar will be displayed.
             */}
            {isLogin ? (
              <>
                <li>
                  {isLogin ? (
                    <Logout />
                  ) : (
                    <Link
                      to="/login"
                      className="text-white/50 hover:text-white transition-all duration-200"
                    >
                      Login
                    </Link>
                  )}
                </li>
                <li
                  className="flex items-center"
                  onClick={() => navigate("/profile")}
                >
                  <div className="avater-img bg-orange-600 text-white">
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

                  <span className="text-white ml-2 cursor-pointer">
                    {user?.firstName + " " + user?.lastName}{" "}
                  </span>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
