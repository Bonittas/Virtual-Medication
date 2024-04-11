import React from "react";

function header() {
  return (
    <nav className="h-20 items-center flex fixed top-0 left-0 right-0 bg-transparent z-50">
      <div className="flex w-4/5 mx-auto bg-transparent justify-between items-center h-16">
        <div className="logo">
          <h4 className="text-xl  font-cursive text-blue-900">HealthCare</h4>
        </div>
        <ul className="flex space-x-4 justify-between items-center">
          <li className="text-blue-900 hover:text-blue-700">
            <a href="#home">How it works</a>
          </li>
          <li className="text-blue-950 hover:text-blue-700">
            <a href="#about">Department</a>
          </li>
          <li className="text-blue-950 hover:text-blue-700">
            <a href="#services">Membership</a>
          </li>
          <li className="text-blue-950 hover:text-blue-700">
            <a href="#contact">Help</a>
          </li>
          <li className="text-blue-950 hover:text-blue-700">
            <a href="#contact">Contact</a>
          </li>
          <button className="bg-transparent font-semibold py-2 px-4 border border-gray-400 hover:text-blue-800 rounded-3xl">
            <a href="#signUp">Sign In</a>
          </button>
        </ul>
      </div>
    </nav>
  );
}

export default header;
