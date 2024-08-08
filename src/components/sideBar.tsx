import { useState, useEffect, useRef } from "react";
import { IoMdMenu } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
  const location = useLocation(); // Access the current route location
  const navigate = useNavigate(); // Access the navigate function for programmatically changing routes
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false); // State to toggle mobile menu visibility
  const mobileMenuRef = useRef<HTMLDivElement>(null); // Ref for the mobile menu DOM node

  // Effect to close mobile menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setShowMobileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuRef]); // Dependency on mobileMenuRef to make sure it's captured correctly in the cleanup function

  // Effect to close mobile menu when the route changes
  useEffect(() => {
    const handleLocationChange = () => {
      setShowMobileMenu(false);
    };
    navigate(location.pathname, { replace: true }); // Ensures URL is updated correctly
    window.addEventListener("popstate", handleLocationChange); // Listen to browser navigation events
    return () => {
      window.removeEventListener("popstate", handleLocationChange); // Cleanup listener on component unmount
    };
  }, [location.pathname, navigate]);

  return (
    <div className="bg-gray-500 h-full md:bg-white shadow-xl border">
      {/* Desktop navigation (hidden on mobile) */}
      <div className="hidden md:block p-4">
        <div className="flex flex-col py-10 gap-4">
          <Link
            to="/"
            className={`${
              location.pathname === "/" ? "bg-blue-400 text-white" : " border"
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

      {/* Mobile navigation (visible when menu is toggled) */}
      <div className="md:hidden h-14 flex justify-end p-5 relative">
        <IoMdMenu
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="text-2xl"
        />
        {showMobileMenu && (
          <div
            ref={mobileMenuRef}
            className="absolute p-4 bg-white shadow-lg z-40 rounded-lg top-14"
          >
            <div className="flex flex-col gap-4">
              <Link
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                to="/"
                className={`${
                  location.pathname === "/"
                    ? "bg-blue-400 text-white"
                    : " border"
                } p-2 rounded-lg`}
              >
                Contact
              </Link>
              <Link
                to="/charts&maps"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
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
        )}
      </div>
    </div>
  );
};

export default SideBar;
