import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faUser, faChartBar, faPen,faBell, faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../actions/doctor_authActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../home/footer"
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

  return (
    <>        
  
    <div className="flex">
      <div className={`fixed top-0 left-0 w-full flex items-center justify-between bg-green-600 py-2 px-4 `}>
        <button
          className="text-white bg-green-600 focus:outline-none"
          onClick={handleDrawerOpen}
        >
          <FontAwesomeIcon icon={faBars} size="lg py-3 text-white" />
        </button>
        <h6 className="text-white text-lg py-3 text-start font-semibold">Medicare (Doctors)</h6>
      </div>

      {/* LEFT DRAWER */}
      <nav className={`bg-green-600  w-56 min-h-screen  py-3 text-white ${open ? "translate-x-0" : "-translate-x-full"} fixed top-0 left-0 transition-all ease-in-out duration-300 z-50`}>
        <div className="flex justify-between p-4">
          <button onClick={handleDrawerClose}>
            <FontAwesomeIcon icon={faTimes} size="lg py-3 text-white" />
          </button>
        </div>
        <ul className="py-4 px-2">
          {/* <li className="mb-2">
            <Link to="/doctor/dashboard" className="flex items-center text-white hover:text-white">
              <span className="mr-2">
                <FontAwesomeIcon icon={faChartBar} size="lg py-3 text-white" />
              </span>
              Dashboard
            </Link>
          </li> */}
          <li className="mb-2">
            <Link to="/doctor/profile" className="flex items-center text-white hover:text-white">
              <span className="mr-2">
                <FontAwesomeIcon icon={faUser} size="lg py-3 text-white" />
              </span>
              Profile
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/updates" className="flex items-center text-white hover:text-white">
              <span className="mr-2">
                <FontAwesomeIcon icon={faPen} size="lg py-3 text-white" />
              </span>
              Edit Profile
            </Link>
            </li>
          <li className="mb-2">
            <Link to="/notifications" className="flex items-center text-white hover:text-white">
              <span className="mr-2">
                <FontAwesomeIcon icon={faBell} size="lg py-3 text-white" />
              </span>
              Notifications
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/complete-details" className="flex items-center text-white hover:text-white">
              <span className="mr-2">
                <FontAwesomeIcon icon={faUser} size="lg py-3 text-white" />
              </span>
              Complete Profile
            </Link>
          </li>   
          <li className=" mb-2">
            <button onClick={handleSignout} className="flex items-center text-white hover:text-red-600">
              <span className="mr-2">
                <FontAwesomeIcon icon={faSignOutAlt} size="lg py-3 text-white" />
              </span>
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </div>
 
    </>
  );
};

export default Navbar;
