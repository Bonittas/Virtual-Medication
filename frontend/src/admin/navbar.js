import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faUser, faTags, faQuestionCircle, faSignOutAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/admin/admin_authActions";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSignout = () => {
    dispatch(logout(navigate)); // Pass the navigate function to logout action creator
    handleDrawerClose();
  };

  const links = [
    { path: "/admin-dashboard", icon: faHome, label: "Dashboard" },
    { path: "/doctors", icon: faUser, label: "Doctors" },
    { path: "/patients", icon: faUser, label: "Patients" },

    { path: "/create-post", icon: faTags, label: "Create Post" },
    { path: "/latest-updates", icon: faQuestionCircle, label: "Latest Updates" },
  ];

  return (
    <div className="flex mb-4">
      <div className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center">
        <button className="text-2xl" onClick={handleDrawerOpen}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h1 className="text-xl">Admin Dashboard</h1>
      </div>

      <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white p-4 transition-transform duration-300 transform ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <button className="text-2xl absolute top-4 right-4" onClick={handleDrawerClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="mt-16">
          <ul>
            {links.map(({ path, icon, label }) => (
              <li className="my-7" key={path}>
                <Link to={path} className="flex items-center text-white" onClick={handleDrawerClose}>
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
