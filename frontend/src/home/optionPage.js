import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/s3.svg'; // Update the path to your image file

const OptionPage = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);

    const handleDoctorSignup = () => {
        setSelectedOption('doctor');
    };

    const handlePatientSignup = () => {
        setSelectedOption('patient');
    };

    const handleSignup = () => {
        if (selectedOption === 'doctor') {
            navigate('/doctor-signup');
        } else if (selectedOption === 'patient') {
            navigate('/patient-signup');
        }
    };

    return (
        <div className="min-h-screen flex flex-col text-black items-center justify-center relative">
            <div className="bg-gray-300 border rounded-md w-full max-w-lg p-4 flex flex-col items-center">
                <div className="mb-8">
                    <p className="text-lg text-center font-bold">Join HealthLink</p>
                    <p className="text-xl text-center font-bold mb-4">Connecting Care Anywhere</p>

                    <img src={backgroundImage} alt="Background" className="mt-4 w-64 h-64" />
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
                            className={`cursor-pointer rounded-full w-6 h-6 border-2 mr-4 ${selectedOption === 'doctor' ? 'border-blue-500' : 'border-gray-400'}`}
                        >
                            {selectedOption === 'doctor' && <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black w-2 h-2 rounded-full"></span>}
                        </label>
                        <label htmlFor="doctorOption" className="cursor-pointer">Join as Doctor</label>
                    </div>
                    <div className="flex bg-white border rounded-fmd px-8 py-2 text-black items-center ">
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
                            className={`cursor-pointer rounded-full w-6 h-6 border-2 mr-4 ${selectedOption === 'patient' ? 'border-green-500' : 'border-gray-400'}`}
                        >
                            {selectedOption === 'patient' && <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black w-2 h-2 rounded-full"></span>}
                        </label>
                        <label htmlFor="patientOption" className="cursor-pointer">Sign Up as Patient</label>
                    </div>
                </div>
                {/* Signup button */}
                <button
                    onClick={handleSignup}
                    disabled={!selectedOption}
                    className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded-md mt-4"
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default OptionPage;
