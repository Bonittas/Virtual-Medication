import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes ,faSignOutAlt,faUser,faChartBar} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSignout = () => {
    // Handle signout logic
  };

  return (
    <div className="flex">
      {/* APPBAR */}
      <div className={`fixed top-0 left-0 w-full flex items-center justify-between bg-green-600 py-2 px-4 ${open ? "ml-64" : ""}`}>
        <button
          className="text-white focus:outline-none"
          onClick={handleDrawerOpen}
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
        <h6 className="text-white text-lg font-semibold">OnCure (Doctors)</h6>
      </div>

      {/* LEFT DRAWER */}
      <nav className={`bg-white w-64 min-h-screen shadow-lg ${open ? "translate-x-0" : "-translate-x-full"} fixed top-0 left-0 transition-all ease-in-out duration-300 z-50`}>
        <div className="flex justify-between p-4">
          <button onClick={handleDrawerClose}>
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
        <ul className="py-4 px-2">
          <li className="mb-2">
            <Link to="/doctor/dashboard" className="flex items-center text-gray-700 hover:text-green-600">
              <span className="mr-2">
                <FontAwesomeIcon icon={faChartBar} size="lg" />
              </span>
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/doctor/profile" className="flex items-center text-gray-700 hover:text-green-600">
              <span className="mr-2">
                <FontAwesomeIcon icon={faUser} size="lg" />
              </span>
              Profile
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/appointments" className="flex items-center text-gray-700 hover:text-green-600">
              <span className="mr-2">
                <FontAwesomeIcon icon={faUser} size="lg" />
              </span>
Appointments            </Link>
          </li>          <li className="mt-8 mb-2">
            <button onClick={handleSignout} className="flex items-center text-gray-700 hover:text-red-600">
              <span className="mr-2">
                <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
              </span>
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
