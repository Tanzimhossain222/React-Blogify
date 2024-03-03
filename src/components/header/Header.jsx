import { Link } from "react-router-dom";
import searchIcon from "../../assets/icons/search.svg";
import logo from "../../assets/logo.svg";

const Header = () => {
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
                to="./createBlog"
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Write
              </Link>
            </li>
            <li>
              <Link
                href="/search"
                className="flex items-center gap-2 cursor-pointer"
              >
                <img src={searchIcon} alt="Search" />
                <span>Search</span>
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-white/50 hover:text-white transition-all duration-200"
              >
                {" "}
                Login{" "}
              </Link>
            </li>
            <li className="flex items-center">
              <div className="avater-img bg-orange-600 text-white">
                <span className="">S</span>
              </div>

              <span className="text-white ml-2">Saad Hasan</span>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
