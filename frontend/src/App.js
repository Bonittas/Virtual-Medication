import React, { useState, useEffect } from "react";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CssBaseline } from "@mui/material";
import './index.css';
import Footer from "./home/footer"
import Home from "./home/home";
import LoggedIn from "./home/loggedIn";
import OptionPage from "./home/optionPage"
import Doctor_Signup from "./doctor/signup";
import Doctor_Profile from "./doctor/dashboard/profile";
import Updates from "./doctor/dashboard/editProfile"

import Doctor_Signin from "./doctor/signin";
import Doctor_Dashboard from "./doctor/dashboard/dashboard";
import Doctor_Signout from "./doctor/dashboard/signout"
import Complete_Details from "./doctor/dashboard/complete_details"
import Notification from "./doctor/dashboard/Notification";
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

  return (
    <>
      {user ? (
        <>
          <CssBaseline>
            <BrowserRouter>
              <AuthProvider>
                <Routes>


              
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
                    path="/complete-details"
                    element={<Complete_Details/>}
                  />
                  {/* PATIENT ROUTES */}
                  <Route
                    exact
                    path="/patient/dashboard"
                    element={<Patient_Dashboard/>}
                  />
                
                  

               
               
                </Routes>
              </AuthProvider>
            </BrowserRouter>
          </CssBaseline>
        </>
      ) : (
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
                                                       <Route
                    exact
                    path="/complete-details"
                    element={<Complete_Details/>}
                  />  
                                                                         <Route
                    exact
                    path="/doctor-signout"
                    element={<Doctor_Signout/>}
                  />  
                                  
                                                       <Route
                    exact
                    path="/updates"
                    element={<Updates/>}
                  />  
<Route
  exact
  path="/doctor/profile"
  element={<Doctor_Profile />}
/>
<Route
  exact
  path="/notifications"
  element={<Notification />}
/>

        <Route exact path="/profile-edit" component={<Updates/>} />
                        <Route
                    exact
                    path="/doctor-dashboard"
                    element={<Doctor_Dashboard/>}
                  />   
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
                <Route exact path="/admin-signin" element={<Admin_Signin/>} />
                <Route exact path="/option" element={<OptionPage/>} />

              </Routes>
            </BrowserRouter>
          </CssBaseline>
          <Footer/>
        </>
      )}
    </>
  );
};

export default App;


