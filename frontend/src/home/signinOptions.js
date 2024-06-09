import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/s4.svg'; 
import headerImage from '../images/s5.svg'; 

const OptionPage = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);

    const handleDoctorSignup = () => {
        setSelectedOption('doctor');
    };

    const handlePatientSignup = () => {
        setSelectedOption('patient');
    };

    const handleAdminSignin = () => {
        setSelectedOption('admin');
    };

    const handleSignup = () => {
        if (selectedOption === 'doctor') {
            navigate('/doctor-signin');
        } else if (selectedOption === 'patient') {
            navigate('/patient-signin');
        } else if (selectedOption === 'admin') {
            navigate('/admin-signin');
        }
    };

    return (
        <div className="min-h-screen mx-4 mt-1 mb-6 flex flex-col text-black items-center justify-center relative">
            <img src={headerImage} alt="Background" className="mt-1  w-1/2 h-24 " />

            <div className="bg-gray-300 border rounded-md w-full max-w-lg p-4 flex flex-col items-center">

                <div className="mb-8">
                    <p className="text-lg text-center font-bold">Join HealthLink</p>
                    <p className="text-xl text-center font-bold mb-4">Connecting Care Anywhere</p>

                    <img src={backgroundImage} alt="Background" className="mt-4 w-72 h-36" />
                </div>
                <div className="flex flex-col w-full">
                    <h2 className="text-lg font-bold mb-4">Join as :</h2>

                    <div className="flex bg-white border rounded-md px-8 py-2 text-black items-center mb-4">
                        <input 
                            type="radio" 
                            id="doctorOption" 
                            name="signupOption" 
                            value="doctor" 
                            checked={selectedOption === 'doctor'}
                            onChange={handleDoctorSignup}
                            className="hidden"
                        />
                        <label 
                            htmlFor="doctorOption" 
                            className={`cursor-pointer rounded-full w-6 h-6 border-2 mr-4 ${selectedOption === 'doctor' ? 'border-blue-900' : 'border-gray-400'}`}
                        >
                        </label>
                        <label htmlFor="doctorOption" className="cursor-pointer">Join as Doctor</label>
                    </div>
                    <div className="flex bg-white border rounded-md px-8 py-2 text-black items-center mb-4 ">
                        <input 
                            type="radio" 
                            id="adminOption" 
                            name="signupOption" 
                            value="admin" 
                            checked={selectedOption === 'admin'}
                            onChange={handleAdminSignin}
                            className="hidden"
                        />
                        <label 
                            htmlFor="adminOption" 
                            className={`cursor-pointer rounded-full w-6 h-6 border-2 mr-4 ${selectedOption === 'admin' ? 'border-yellow-900' : 'border-gray-400'}`}
                        >
                        </label>
                        <label htmlFor="adminOption" className="cursor-pointer">{selectedOption === 'admin' ? 'Sign In as Admin' : 'Admin Signin'}</label>
                    </div>
                    <div className="flex bg-white border rounded-md px-8 py-2 text-black items-center ">
                        <input 
                            type="radio" 
                            id="patientOption" 
                            name="signupOption" 
                            value="patient" 
                            checked={selectedOption === 'patient'}
                            onChange={handlePatientSignup}
                            className="hidden"
                        />
                        <label 
                            htmlFor="patientOption" 
                            className={`cursor-pointer rounded-full w-6 h-6 border-2 mr-4 ${selectedOption === 'patient' ? 'border-green-900 text-black' : 'border-gray-400'}`}
                        >
                        </label>
                        <label htmlFor="patientOption" className="cursor-pointer">Sign in as Patient</label>
                    </div>
                </div>
                <button
                    onClick={handleSignup}
                    disabled={!selectedOption}
                    className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded-md mt-4"
                >
                    {selectedOption === 'admin' ? 'Sign In' : 'Sign In'}
                </button>
            </div>
        </div>
    );
};

export default OptionPage;
