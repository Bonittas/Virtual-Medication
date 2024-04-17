import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faWrench, faTags, faQuestionCircle, faListAlt, faUserCog, faBell, faSignOutAlt, faEdit, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const Navbar = ({ handleNavigation }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSignout = () => {
    // Perform sign out logic
    // For now, just navigate to home page after sign out
    handleNavigation("/signout"); // Navigate to home page
    handleDrawerClose(); // Close the drawer after navigation
  };

  const navigateTo = (route) => {
    handleNavigation(route);
    handleDrawerClose(); // Close the drawer after navigation
  };

  // Array of objects representing each link
  const links = [
    { path: "/create-post", icon: faHome, label: "Dashboard" },
    { path: "/doctors", icon: faWrench, label: "Create Service" },
    { path: "/signout", icon: faTags, label: "Create Category" },
    { path: "/admin/users-request", icon: faQuestionCircle, label: "Users Request" },
    { path: "/admin/category-list", icon: faListAlt, label: "Category List" },
    { path: "/admin/service-list", icon: faWrench, label: "Service List" },
    { path: "/admin/user-list", icon: faUser, label: "User List" },
    { path: "/signout", icon: faUserCog, label: "Signout" }
  ];

  return (
    <div className="flex">
      {/* APPBAR */}
      <div className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center">
        <button className="text-2xl" onClick={handleDrawerOpen}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h1 className="text-xl">Admin Dashboard</h1>
      </div>

      {/* LEFT DRAWER */}
      <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white p-4 transition-transform duration-300 transform ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <button className="text-2xl absolute top-4 right-4" onClick={handleDrawerClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="mt-16">
          <ul>
            {/* Map over the links array to render each link */}
            {links.map(({ path, icon, label }) => (
              <li className="my-3" key={path}>
                <Link to={path} className="flex items-center text-white" onClick={() => navigateTo(path)}>
                  <FontAwesomeIcon icon={icon} className="mr-2" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="absolute bottom-4 left-4">
          <button onClick={handleSignout} className="flex items-center text-white">
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
