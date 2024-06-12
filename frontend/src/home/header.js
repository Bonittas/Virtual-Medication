import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
function Header() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <nav
      className={`h-20 items-center flex fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex w-4/5 mx-auto bg-transparent justify-between items-center h-16">
        <div className="logo">
          <h4 className="text-xl  font-cursive text-blue-900">HealthLink</h4>
        </div>
        <ul className="flex space-x-4 justify-between items-center">


          <li className="text-blue-950 hover:text-blue-700">
            <a href="#contact">Help</a>
          </li>
          <li className="text-blue-950 hover:text-blue-700">
            <a href="#contact">Contact</a>
          </li>
          <button className="bg-transparent font-semibold py-2 px-4 border border-gray-400 hover:text-blue-800 rounded-3xl">
            <Link to="/signin-option" variant="body2">Sign In</Link>
          </button>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
