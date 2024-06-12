import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const PostPrescription = () => {
    const [form, setForm] = useState({
        patientName: '',
        date: '',
        time: '',
        disease: '',
        bloodPressure: '',
        medications: [{ name: '', dosage: '', dosageUnit: 'mg', frequency: '', frequencyUnit: 'times per day', instructions: '' }]
    });
    const [notification, setNotification] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleMedicationsChange = (index, field, value) => {
        const newMedications = form.medications.map((medication, i) =>
            i === index ? { ...medication, [field]: value } : medication
        );
        setForm({ ...form, medications: newMedications });
    };

    const addMedication = () => {
        setForm({ ...form, medications: [...form.medications, { name: '', dosage: '', dosageUnit: 'mg', frequency: '', frequencyUnit: 'times per day', instructions: '' }] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError("Unauthorized: No token found");
                setLoading(false);
                return;
            }
            const res = await axios.post('http://localhost:5000/api/auth/prescriptions', form, {
                headers: {
                    'x-auth-token': token
                }
            });

            if (res.data && res.data._id) {
                setForm({
                    patientName: '',
                    date: '',
                    time: '',
                    disease: '',
                    bloodPressure: '',
                    medications: [{ name: '', dosage: '', dosageUnit: 'mg', frequency: '', frequencyUnit: 'times per day', instructions: '' }]
                });
                setNotification('Prescription created successfully!');
            } else {
                setNotification('Failed to create prescription. Invalid server response.');
                console.error('Invalid server response:', res.data);
            }
        } catch (err) {
            console.error('Error creating prescription:', err.response ? err.response.data.message : err.message);
            setNotification('Failed to create prescription. Please try again.');
        }
    };

    return (
        <div className="container w-1/2 mx-auto my-2 p-4">
            <h1 className="text-2xl font-bold mb-4">Fill patient's data after appointment</h1>
            {notification && <div className="bg-green-100 w-1/2 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">{notification}</div>}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-4">
                    <label htmlFor="patientName" className="block text-gray-700 font-bold mb-2">Patient Name:</label>
                    <input
                        type="text"
                        name="patientName"
                        value={form.patientName}
                        onChange={handleChange}
                        placeholder="Enter patient name"
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="time" className="block text-gray-700 font-bold mb-2">Time:</label>
                    <input
                        type="time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="disease" className="block text-gray-700 font-bold mb-2">Disease:</label>
                    <input
                        type="text"
                        name="disease"
                        value={form.disease}
                        onChange={handleChange}
                        placeholder="Enter disease"
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="bloodPressure" className="block text-gray-700 font-bold mb-2">Blood Pressure:</label>
                    <input
                        type="text"
                        name="bloodPressure"
                        value={form.bloodPressure}
                        onChange={handleChange}
                        placeholder="Enter blood pressure"
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                {form.medications.map((medication, index) => (
                    <div key={index} className="mb-4">
                        <label htmlFor={`medication-${index}`} className="block text-gray-700 font-bold mb-2">Medication {index + 1}</label>
                        <input
                            type="text"
                            name="name"
                            id={`medication-${index}`}
                            value={medication.name}
                            onChange={(e) => handleMedicationsChange(index, 'name', e.target.value)}
                            placeholder="Medication Name"
                            required
                            className="w-full p-2 border rounded mb-1"
                        />
                        <input
                            type="text"
                            name="dosage"
                            value={medication.dosage}
                            onChange={(e) => handleMedicationsChange(index, 'dosage', e.target.value)}
                            placeholder="Dosage"
                            required
                            className="w-full p-2 border rounded mb-1"
                        />
                        <select
                            name="dosageUnit"
                            value={medication.dosageUnit}
                            onChange={(e) => handleMedicationsChange(index, 'dosageUnit', e.target.value)}
                            className="w-full p-2 border rounded mb-1"
                        >
                            <option value="mg">mg</option>
                            <option value="g">g</option>
                            <option value="ml">ml</option>
                        </select>
                        <input
                            type="text"
                            name="frequency"
                            value={medication.frequency}
                            onChange={(e) => handleMedicationsChange(index, 'frequency', e.target.value)}
                            placeholder="Frequency"
                            required
                            className="w-full p-2 border rounded mb-1"
                        />
                        <select
                            name="frequencyUnit"
                            value={medication.frequencyUnit}
                            onChange={(e) => handleMedicationsChange(index, 'frequencyUnit', e.target.value)}
                            className="w-full p-2 border rounded mb-1"
                        >
                            <option value="times per day">times per day</option>
                            <option value="times per week">times per week</option>
                            <option value="times per month">times per month</option>
                        </select>
                        <input
                            type="text"
                            name="instructions"
                            value={medication.instructions}
                            onChange={(e) => handleMedicationsChange(index, 'instructions', e.target.value)}
                            placeholder="Instructions"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                ))}
                <button type="button" onClick={addMedication} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add Medication
                </button>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default PostPrescription;
