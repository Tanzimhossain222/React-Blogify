import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import closeIon from "../../assets/icons/close.svg";
import useBlogs from "../../hooks/useBlogs";
import SearchResultList from "./SearchResultList";
import LoadingSkeleton from "../../common/LoadingSkeleton";

const SearchPortal = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { getSearchedBlogs, state } = useBlogs();

  const { searchBlogs, error, loading } = state;
  //use debouncing to avoid multiple api calls on every key stroke, 500ms delay
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

  // Cleanup function to clear the timeout when the component unmounts
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
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
          <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
            {searchBlogs?.data && searchBlogs?.data.length > 0 ? (
              searchBlogs?.data.map(
                (blog) => blog && <SearchResultList blog={blog} key={blog.id} />
              )
            ) : (
              <p className="text-slate-400 text-center">No result found</p>
            )}
          </div>
        </div>

        <Link to="/">
          <img
            src={closeIon}
            alt="Close"
            className="absolute right-2 top-2 cursor-pointer w-8 h-8"
          />
        </Link>
      </div>
    </section>
  );
};

export default SearchPortal;
