import React, { useState, useEffect } from "react";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CssBaseline } from "@mui/material";
import './index.css';
import Footer from "./home/footer"
import Home from "./home/home";
import LoggedIn from "./home/loggedIn";
import OptionPage from "./home/optionPage"
import SignInOptions from "./home/signinOptions"
import Doctor_Signup from "./doctor/signup";
import Doctor_Profile from "./doctor/dashboard/profile";
import Updates from "./doctor/dashboard/editProfile"
import PatientUpdates from "./patient/dashboard/editProfile"
import Doctor_Signin from "./doctor/signin";
import Doctor_Dashboard from "./doctor/dashboard/dashboard";
import Doctor_Signout from "./doctor/dashboard/signout"
import Complete_Details from "./doctor/dashboard/complete_details"
import Notification from "./doctor/dashboard/Notification";
import VideoMeet from "./doctor/dashboard/videoMeeting/Room/Room";
import VideoMeets from "./doctor/dashboard/videoMeeting/videoMeetig";
import Controls from "./doctor/dashboard/videoMeeting/controls";
import PrescriptionForm from "./doctor/dashboard/videoMeeting/prescrption";
import PrescriptionList from "./patient/prescription";
import PatientRoom from "./doctor/dashboard/videoMeeting/videoMeetig";
import Patient_Signup from "./patient/signup";
import Patient_Signin from "./patient/signin";
import Patient_Dashboard from "./patient/dashboard/dashboard";
import Patient_Profile from "./patient/dashboard/profile"
import Admin_Signin from "./admin/signin";
import Doctors from "./admin/doctors";
import Patients from "./admin/patients";
import Create_Post from "./admin/create_post";
import Latest_Updates from "./admin/latest_updates";
import Signout from "./admin/signout"
import AdminDashboard from "./admin/dashboard"
import Patient_Complete_Details from "./patient/dashboard/complete_details"
import Doctors_Patient_Page from "./patient/doctors"
import Appointments from "./doctor/dashboard/appointmentRequests"
import AppointmentStatus from "./patient/dashboard/appointmentStatus"
import PatientsStatus from "./doctor/dashboard/patients"
import PatientProfile from "./doctor/dashboard/patientsDetail"
import Payment from "./patient/Payment";
import VerifyPayment from "./patient/VerifyPayment";
import BookAppointment from './patient/bookAppointment'
import styled from 'styled-components';
import Video from './doctor/dashboard/videoMeeting/Main/Main'
import ApprovedD from './patient/approvedDoctors'
import PatientPage from "./patient/dashboard/videoMeeting/JoinVideo";
import DoctorPage from "./doctor/dashboard/Joinvideo";
import AddPatientsData from "./doctor/dashboard/addPatientsData"
import PastAppointments from "./doctor/dashboard/pastAppointments"
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
                                    <Route
  exact
  path="/patient/profile"
  element={<Patient_Profile />}
/>          
                                <Route exact path="/doctor-signup" element={<Doctor_Signup/>} />
                <Route exact path="/doctor-signin" element={<Doctor_Signin/>} />
                <Route exact path="/admin-signin" element={<Admin_Signin/>} />
                <Route exact path="/create-post" element={<Create_Post/>} />
                <Route exact path="/controls" element={<Controls/>} />


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
                                  <Route
                    exact
                    path="/prescription-form"
                    element={<PrescriptionForm/>}
                  />
                                                  <Route
                    exact
                    path="/prescription-detail"
                    element={<PrescriptionList/>}
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
            <AppContainer>

              <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/option" element={<OptionPage/>} />
                <Route exact path="/signin-option" element={<SignInOptions/>} />
                <Route exact path="/payment" element={<Payment/>} />
                <Route exact path="/payment/verify" element={<VerifyPayment/>} />

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
                    path="/complete-detail"
                    element={<Patient_Complete_Details/>}
                  />  
                              <Route path="/doctor" element={<DoctorPage />} />
                              <Route path="/past-appointments" element={<PastAppointments />} />
                              <Route path="/add-data" element={<AddPatientsData/>} />


        <Route path="/patient" element={<PatientPage />} />                                                   <Route
                    exact
                    path="/complete-details"
                    element={<Complete_Details/>}
                  /> 
                          <Route path="/patients/:id" element={<PatientProfile />} />

        <Route
          path="/video-call"
          element={<VideoMeets/>}
          />
                  <Route
          path="/room/:roomId"
          element={<VideoMeet/>}
          />
                  <Route
          path="/video"
          element={<Video/>}
          />
                                            <Route
                    exact
                    path="/prescription-form"
                    element={<PrescriptionForm/>}
                  />
                                                  <Route
                    exact
                    path="/prescription-detail"
                    element={<PrescriptionList/>}
                  />

                          <Route exact path="/controls" element={<Controls/>} />

                                                                         <Route
                    exact
                    path="/doctor-signout"
                    element={<Doctor_Signout/>}
                  />  
                                                                                           <Route
                    exact
                    path="/appointments"
                    element={<Appointments/>}
                  /> 
                                                                                           <Route
                    exact
                    path="/doctorsList"
                    element={<Doctors_Patient_Page/>}
                  />
                                  
                                                       <Route
                    exact
                    path="/updates"
                    element={<Updates/>}
                  />  
                                                                         <Route
                    exact
                    path="/patient-updates"
                    element={<PatientUpdates/>}
                  /> 
                                                      <Route
  exact
  path="/patient/profile"
  element={<Patient_Profile />}
/>  
<Route
  exact
  path="/doctor/profile"
  element={<Doctor_Profile />}
/>
<Route exact path="/appointment-status" element={<AppointmentStatus />} />
<Route exact path="/patients-status" element={<PatientsStatus />} />
<Route exact path="/book-appointment" element={<BookAppointment />} />
<Route exact path="/doctrsList" element={<ApprovedD />} />


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
              </AppContainer>

            </BrowserRouter>
          </CssBaseline>
        </>
      )}
    </>
  );
};

export default App;


const AppContainer = styled.div`
align-items: center;
justify-content: center;
color: black;
`;
