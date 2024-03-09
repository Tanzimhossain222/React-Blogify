import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import closeIon from "../../assets/icons/close.svg";
import useBlogs from "../../hooks/useBlogs";
import SearchResultList from "./SearchResultList";

const SearchPortal = ({ onCloseModal }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { getSearchedBlogs, state, clearSearchData } = useBlogs();
  const { searchBlogs } = state;

  const timeoutRef = useRef(null);
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Clear any existing timeout before starting a new one
    clearTimeout(timeoutRef.current);

    // Create a new timeout with a delay of 1500ms
    timeoutRef.current = setTimeout(() => {
      getSearchedBlogs(value);
    }, 500);
  };

  let totalBlogs = searchBlogs && searchBlogs?.data;

  const handleClose = () => {
    setSearchQuery("");
    clearSearchData();
    onCloseModal();
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section className="absolute left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">
      <div className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
        <div>
          <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">
            Search for Your Desire Blogs
          </h3>
          <input
            type="text"
            placeholder="Start Typing to Search"
            className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* <!-- Search Result --> */}
        <div className="">
          <h3 className="text-slate-400 font-bold mt-6">Search Results</h3>
          {totalBlogs && totalBlogs.length > 0 ? (
            <p className="text-teal-500 text-center text-xl py-2 font-semibold">
              Showing {totalBlogs.length} results for "{searchQuery}"
            </p>
          ) : (
            searchQuery && (
              <p className="text-rose-600 text-center text-xl font-bold">
                No result found
              </p>
            )
          )}

          <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
            {totalBlogs && totalBlogs.length > 0 ? (
              totalBlogs.map(
                (blog) => blog && <SearchResultList blog={blog} key={blog.id} onClose={handleClose} />
              )
            ) : (
              <p className="text-slate-400 text-center">
                {!searchQuery && "Search Your result"}
              </p>
            )}
          </div>
        </div>

        {/* <Link to="/"> */}
          <img
            src={closeIon}
            alt="Close"
            className="absolute right-2 top-2 cursor-pointer w-8 h-8"
            onClick={handleClose}
          />
       
      </div>
    </section>
  );
};

SearchPortal.propTypes = {
  onCloseModal: PropTypes.func,
};

export default SearchPortal;
