import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import { completeProfile } from "../../actions/doctor_authActions"; 

const CompleteDetails = (props) => {
  const [name, setName] = useState("");
  const [medicalSpeciality, setMedicalSpeciality] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [degree, setDegree] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [yearOfReg, setYearOfReg] = useState("");
  const [stateMedicalCouncil, setStateMedicalCouncil] = useState("");
  const [experience, setExperience] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId); // Access userId safely


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        completeProfile(userId, {  // Pass userId as the first argument
          name,
          medicalSpeciality,
          age,
          gender,
          degree,
          regNumber,
          yearOfReg,
          stateMedicalCouncil,
          experience,
          address1,
          address2,
          city,
          state,
          pincode,
          country,
          startTime,
          endTime,
        })
      );
    } catch (error) {
      console.error("Failed to complete profile:", error.message);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <div className="mx-6">
          <h6 className="text-xl font-semibold">Complete/Edit Your Details</h6>
          <p className="text-sm text-gray-600 mb-4">
            Be careful while editing the important details!
          </p>
          <div className=" flex justify-center rounded-md bg-gray-100 p-4">
            <div className="w-1/3">
            <div>
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Medical Speciality</label>
            <input
              type="text"
              value={medicalSpeciality}
              onChange={(e) => setMedicalSpeciality(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Degree</label>
            <input
              type="text"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Registration Number</label>
            <input
              type="text"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Year of Registration</label>
            <input
              type="text"
              value={yearOfReg}
              onChange={(e) => setYearOfReg(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">State Medical Council</label>
            <input
              type="text"
              value={stateMedicalCouncil}
              onChange={(e) => setStateMedicalCouncil(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          </div>
          <div className="w-1/3 ml-5">
     
          <div>
            <label className="block text-sm font-semibold mb-1">Experience</label>
            <input
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Address Line 1</label>
            <input
              type="text"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Address Line 2</label>
            <input
              type="text"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Pincode</label>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Start-Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">End-Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
                required
              />
            </div>
            </div>
          </div>

          </div>
        </div>
        <div className="mt-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Update
            </button>
          </div>
      </div>
    </form>
  );
};

export default CompleteDetails;
