import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  return (
    <footer className="my-6 md:my-8 bg-[#030317]">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/">
          <img className="w-28" src={logo} alt="lws" />
        </Link>
        <SocialIcons />
      </div>
    </footer>
  );
};

export default Footer;
