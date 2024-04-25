import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { signIn } from "../actions/doctor_authActions";
import { signinGrid, box, paper, avatar } from "./styles";
import doctorSignInImage from "../images/s2.svg";

const Doctor_Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (email === "") {
      setEmailError("Email is required");
      return;
    }

    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailFormat)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (password === "") {
      setPasswordError("Password is required");
      return;
    }

    try {
      await dispatch(signIn(email, password));
      console.log("Sign in successful");
      setLoginSuccess(true);
      navigate("/doctor-dashboard");
    } catch (error) {
      setEmailError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="my-3  flex justify-center items-center" >
      <div className="border bg-gray-300 w-1/3 p-3 rounded-md">
      <div className="flex justify-center items-center">
      <img src={doctorSignInImage} alt="Doctor Sign In" className="w-fit h-32" />
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          
          <h2 className="mt-2 text-gray-500 text-center text-xl font-md ">
            Doctor Sign in
          </h2>
        </div>
        <form className="mt-4 space-y-6" onSubmit={handleSignin}>
          {emailError && <p className="text-red-500">{emailError}</p>}
          {passwordError && <p className="text-red-500">{passwordError}</p>}
          {loginSuccess && (
            <p className="text-green-500">Login successful!</p>
          )}
          <div className="rounded-md  shadow-sm ">
            <div className="my-6 ">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded- focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
            <p className="my-2 text-blue-400">
            <Link to='/doctor-signup' >Don't have an account? Signup here</Link>
            </p>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Doctor_Signin;
