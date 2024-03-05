/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../api/useAxios";

const FavouriteBlogs = () => {
  const [favouriteBlogs, setFavouriteBlogs] = useState([]);
  const { axiosInstance } = useAxios();
  const navigation = useNavigate();

  useEffect(() => {
    const fetchFavouriteBlogs = async () => {
      const res = await axiosInstance.get("/blogs/favourites");
      const data = res.data;
    };

    fetchFavouriteBlogs();
  });

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Your Favourites ❤️
      </h3>

      <ul className="space-y-5 my-5">
        <li>
          <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
            How to Auto Deploy a Next.js App on Ubuntu from GitHub
          </h3>
          <p className="text-slate-600 text-sm">
            #tailwindcss, #server, #ubuntu
          </p>
        </li>

        <li>
          <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
            How to Auto Deploy a Next.js App on Ubuntu from GitHub
          </h3>
          <p className="text-slate-600 text-sm">
            #tailwindcss, #server, #ubuntu
          </p>
        </li>

        <li>
          <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
            How to Auto Deploy a Next.js App on Ubuntu from GitHub
          </h3>
          <p className="text-slate-600 text-sm">
            #tailwindcss, #server, #ubuntu
          </p>
        </li>

        <li>
          <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
            How to Auto Deploy a Next.js App on Ubuntu from GitHub
          </h3>
          <p className="text-slate-600 text-sm">
            #tailwindcss, #server, #ubuntu
          </p>
        </li>
      </ul>
    </div>
  );
};

export default FavouriteBlogs;
