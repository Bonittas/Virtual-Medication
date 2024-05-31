import React, { useState } from "react";
import axios from "axios";
import Nav from "./dashboard/dashboard";

const Payment = () => {
  const [formData, setFormData] = useState({
    email: "",
    fname: "",
    lname: "",
    phone: "",
    address: "",
    appointmentDate: "",
    appointmentTime: "",
    symptoms: "",
    medicalHistory: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const currency = "ETB";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePurchaseSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setLoading(true);

      // Initialize payment
      const response = await axios.post(
        "http://localhost:5000/api/auth/payment/initialize",
        {
          first_name: formData.fname,
          last_name: formData.lname,
          email: formData.email,
          phone_number: formData.phone,
          amount: formData.amount,
          currency: currency,
          ...formData,
          tx_ref: `TX${Math.floor(100000 + Math.random() * 900000)}`,
          callback_url: "https://example.com/callback",
          return_url: "http://localhost:3000/doctrsList",
          customization: {
            title: "Patient Payment",
            description: formData.symptoms,
          },
        }
      );
      window.location.href = response.data.data.checkout_url;
    } catch (error) {
      console.error("Error processing payment:", error);
      setErrorMessage("Error processing payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const requiredFields = [
      "fname",
      "lname",
      "email",
      "phone",
      "address",
      "appointmentDate",
      "appointmentTime",
      "symptoms",
      "medicalHistory",
      "amount",
    ];
    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        setErrorMessage(
          `Please enter your ${
            field === "fname"
              ? "first name"
              : field === "lname"
              ? "last name"
              : field
          }.`
        );
        return false;
      }
    }
    setErrorMessage("");
    return true;
  };

  return (
    <>
    <Nav/>
      <div className=" relative top-24 bg-slate-100 p-4 w-full md:max-w-3xl mx-auto my-4 flex rounded-md shadow-md">
        <div className="bg-white p-4 w-full md:w-1/2 mx-auto rounded shadow-md">
          <h2 className="text-xl font-semibold text-center mb-4">
            Patient Payment Form
          </h2>
          <form onSubmit={handlePurchaseSubmit}>
            <div className="mb-4 flex justify-between">
              <div className="w-1/2 mr-2">
                <label htmlFor="fname" className="block text-sm font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder="First Name"
                  value={formData.fname}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                />
              </div>
              <div className="w-1/2 ml-2">
                <label htmlFor="lname" className="block text-sm font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  placeholder="Last Name"
                  value={formData.lname}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                />
              </div>
            </div>
            <div className="mb-4 flex justify-between">
              <div className="w-1/2 mr-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                />
              </div>
              <div className="w-1/2 ml-2">
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone
                </label>
                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  placeholder="phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                />
              </div>
            </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                />
              </div>
           
            <div className="mb-4 flex justify-between">
              <div className="w-1/2 mr-2">
                <label
                  htmlFor="appointmentDate"
                  className="block text-sm font-medium"
                >
                  Appointment Date
                </label>
                <input
                  type="date"
                  id="appointmentDate"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                />
              </div>
              <div className="w-1/2 ml-2">
                <label
                  htmlFor="appointmentTime"
                  className="block text-sm font-medium"
                >
                  Appointment Time
                </label>
                <input
                  type="time"
                  id="appointmentTime"
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="symptoms" className="block text-sm font-medium">
                Symptoms
              </label>
              <textarea
                id="symptoms"
                name="symptoms"
                placeholder="Describe your symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="medicalHistory"
                className="block text-sm font-medium"
              >
                Medical History
              </label>
              <textarea
                id="medicalHistory"
                name="medicalHistory"
                placeholder="Provide your medical history"
                value={formData.medicalHistory}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
              />
            </div>
            {errorMessage && (
              <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
            )}
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-green-500 text-white rounded hover:bg-green-600"
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;