import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

const PrescriptionForm = () => {
  const [patientName, setPatientName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [disease, setDisease] = useState('');
  const [medications, setMedications] = useState([{ name: '', dosage: '', frequency: '', instructions: '' }]);

  const handleAddMedication = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: '', instructions: '' }]);
  };

  const handleMedicationChange = (index, field, value) => {
    const updatedMedications = [...medications];
    updatedMedications[index][field] = value;
    setMedications(updatedMedications);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const prescriptionData = { patientName, date, time, disease, medications };
      const response = await axios.post('https://medicare-video.onrender.com/api/prescriptions', prescriptionData); // API call to submit prescription
      console.log('Prescription submitted:', response.data);
      // Optionally, you can redirect to another page after successful submission
    } catch (err) {
      console.error('Error creating prescription:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <p>Hello</p>
      <p>
        Patient Full Name
      <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Patient Name" className="input" />
      </p>
      <p>
        Appointment Date
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" className="input" />
      </p>
      <p>
        Appointment Time
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time" className="input" />
      </p>
      <p>
        Disease
      <input type="text" value={disease} onChange={(e) => setDisease(e.target.value)} placeholder="Disease" className="input" />
      </p>
      {medications.map((medication, index) => (
              <p>Medications

        <div key={index}>
          <input type="text" value={medication.name} onChange={(e) => handleMedicationChange(index, 'name', e.target.value)} placeholder="Medication Name" className="input" />
          <input type="text" value={medication.dosage} onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)} placeholder="Dosage" className="input" />
          <input type="text" value={medication.frequency} onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)} placeholder="Frequency" className="input" />
          <input type="text" value={medication.instructions} onChange={(e) => handleMedicationChange(index, 'instructions', e.target.value)} placeholder="Instructions" className="input" />
        </div>
        </p>
      ))}
      <button type="button" onClick={handleAddMedication} className="bg-green-500 text-white rounded-md px-4 py-2 mt-4">Add Medication</button>
      <button type="submit" className="bg-green-500 text-white rounded-md px-4 py-2 mt-2">Submit Prescription</button>
    </form>
  );
};

export default PrescriptionForm;
