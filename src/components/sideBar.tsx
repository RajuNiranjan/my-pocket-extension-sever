import React from "react";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();

  return (
    <div className="w-[20%] h-screen shadow-lg p-4">
      <div className="flex flex-col gap-4">
        <Link
          to="/contact"
          className={`${
            location.pathname === "/contact"
              ? "bg-blue-400 text-white"
              : " border"
          } p-2 rounded-lg`}
        >
          Contact
        </Link>
        <Link
          to="/charts&maps"
          className={`${
            location.pathname === "/charts&maps"
              ? "bg-blue-400 text-white"
              : " border"
          } p-2 rounded-lg`}
        >
          Charts and Maps
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
