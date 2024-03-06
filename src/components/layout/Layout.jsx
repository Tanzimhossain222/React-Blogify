import PropTypes from "prop-types";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div id="search-root"></div>
      {children}
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
