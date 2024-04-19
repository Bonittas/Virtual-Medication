import React, { useState, useEffect } from "react";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import firebase from "./firebase";
import { AuthProvider } from "./contexts/AuthContext";
import { CssBaseline } from "@mui/material";
import './index.css';

// HOMEPAGE
import Home from "./home/home";
import LoggedIn from "./home/loggedIn";
// DOCTOR'S PAGES
import OptionPage from "./home/optionPage"
import Doctor_Signup from "./doctor/signup";
import Doctor_Signin from "./doctor/signin";
import Doctor_Dashboard from "./doctor/dashboard/dashboard";

import Patient_Signup from "./patient/signup";
import Patient_Signin from "./patient/signin";
import Patient_Dashboard from "./patient/dashboard/dashboard";

import Admin_Signin from "./admin/signin";
import Doctors from "./admin/doctors";
import Patients from "./admin/patients";
import Create_Post from "./admin/create_post";
import Latest_Updates from "./admin/latest_updates";
import Signout from "./admin/signout"
import AdminDashboard from "./admin/dashboard"
const App = () => {
  const [user, setUser] = useState("");

  const authlistener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authlistener();
  }, []);

  return (
    <>
      {user ? (
        <>
          <CssBaseline>
            <BrowserRouter>
              <AuthProvider>
                <Routes>
                  <Route
                    exact
                    path="/admin-dashboard"
                    element={<AdminDashboard/>}
                  />

                  <Route exact path="/doctors" element={<Doctors/>} />
                  <Route exact path="/patients" element={<Patients/>} />
                  <Route exact path="/create-post" element={<Create_Post/>} />
                  <Route exact path="/signout" element={<Signout/>} />

                  <Route
                    exact
                    path="/latest-updates"
                    element={<Latest_Updates/>}
                  />
                  <Route exact path="/" element={<Home/>} />

                                  <Route
                  exact
                  path="/patient-signup"
                  element={<Patient_Signup/>}
                />
                <Route
                  exact
                  path="/patient-signin"
                  element={<Patient_Signin/>}
                />
                                <Route exact path="/doctor-signup" element={<Doctor_Signup/>} />
                <Route exact path="/doctor-signin" element={<Doctor_Signin/>} />
                <Route exact path="/admin-signin" element={<Admin_Signin/>} />
                <Route exact path="/create-post" element={<Create_Post/>} />

                  <Route
                    exact
                    path="/doctor/dashboard"
                    element={<Doctor_Dashboard/>}
                  />
               
                  {/* PATIENT ROUTES */}
                  <Route
                    exact
                    path="/patient/dashboard"
                    element={<Patient_Dashboard/>}
                  />
                
                  

               
                  <Route exact path="/doctors" element={<Doctors/>} />
                  <Route exact path="/patients" element={<Patients/>} />
                  <Route exact path="/create-post" element={<Create_Post/>} />
                  <Route
                    exact
                    path="/latest_updates"
                    element={Latest_Updates}
                  />
                </Routes>
              </AuthProvider>
            </BrowserRouter>
          </CssBaseline>
        </>
      ) : (
        // ROUTES AVAILABLE IF THE USER IS NOT AUTHENTICATED
        <>
          <CssBaseline>
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/option" element={<OptionPage/>} />

                <Route exact path="/doctor-signup" element={<Doctor_Signup/>} />
                <Route exact path="/doctor-signin" element={<Doctor_Signin/>} />
                <Route
                  exact
                  path="/patient-signup"
                  element={<Patient_Signup/>}
                />
                <Route
                  exact
                  path="/patient-signin"
                  element={<Patient_Signin/>}
                />
                <Route exact path="/admin-signin" element={<Admin_Signin/>} />
                <Route exact path="/option" element={<OptionPage/>} />

              </Routes>
            </BrowserRouter>
          </CssBaseline>
        </>
      )}
    </>
  );
};

export default App;


