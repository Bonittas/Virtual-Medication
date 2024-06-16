import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeDetails, fetchUserData } from "../../actions/doctor_authActions";
import Nav from "./dashboard";

const CompleteDetails = (props) => {
  const userData = useSelector((state) => state.userData);

  const [name, setName] = useState(userData ? userData.name : "");
  const [medicalSpeciality, setMedicalSpeciality] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [degree, setDegree] = useState("");
  const [stateMedicalCouncil, setStateMedicalCouncil] = useState("");
  const [experience, setExperience] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [image, setImage] = useState(null);
  const [cv, setCv] = useState(null); // New state for CV upload
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePicture", image);
    formData.append("cvFile", cv); // Append CV to form data with the correct field name
  
    formData.append(
      "details",
      JSON.stringify({
        name,
        medicalSpeciality,
        age,
        gender,
        degree,
        stateMedicalCouncil,
        experience,
        address1,
        address2,
        city,
        country,
        startTime,
        endTime,
      })
    );
  
    try {
      await dispatch(completeDetails(formData));
      setSuccessMessage('Profile successfully updated.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error while editing profile.');
      setSuccessMessage('');
    }
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleCvChange = (e) => { // Handler for CV upload
    const file = e.target.files[0];
    setCv(file);
  };

  return (
    <>
      <Nav />
      <form onSubmit={handleSubmit}>
        <div className="mt-20">
          <div className="mx-6">
            <h6 className="text-xl font-semibold">Complete Details</h6>
            <p className="text-sm text-right text-green-600 mb-4">
              Be careful while editing the important details!
            </p>
            {successMessage && <p className="text-black w-1/4 text-center bg-green-300 p-4 mb-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-500 bg-red-100 mb-4">{errorMessage}</p>}
            <div className="flex justify-center rounded-md bg-green-100 p-4">
              <div className="w-1/3">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    name="profilePicture"
                    onChange={handleImageChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    CV (PDF)
                  </label>
                  <input
                    type="file"
                    name="cv"
                    accept="application/pdf"
                    onChange={handleCvChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>
                <label className="block text-sm font-semibold my-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                  autoComplete="name"
                />
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Medical Speciality
                  </label>
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
                  <label className="block text-sm font-semibold mb-1">
                    Gender
                  </label>
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
                  <label className="block text-sm font-semibold mb-1">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    State Medical Council
                  </label>
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
                  <label className="block text-sm font-semibold mb-1">
                    Experience
                  </label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Address Line 2
                  </label>
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
                    <label className="block text-sm font-semibold mb-1">
                      Start-Time
                    </label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-black font-semibold mb-1">
                      End-Time
                    </label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="border text-black border-gray-300 rounded-md p-2 w-full"
                      required
                    />
                  </div>
                </div>
                <div className="w-full">
                  <button
                    type="submit"
                    className="my-3 w-full text-white bg-green-500 hover:bg-green-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CompleteDetails;
