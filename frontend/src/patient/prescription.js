import React from 'react';
import axios from 'axios';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  prescriptionItem: {
    marginBottom: 10,
  },
  border: {
    border: 1,
    borderColor: '#000',
    marginBottom: 20,
    padding: 10,
  },
});

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = React.useState([]);

  React.useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/prescriptions');
        setPrescriptions(response.data);
      } catch (err) {
        console.error('Error fetching prescriptions:', err);
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    <div className="max-w-md my-4 border-b border-gray-200 border border-black  mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Prescription</h2>
      <ul className="space-y-4">
        {prescriptions.map((prescription, index) => (
            
          <li key={index} className="pb-4">
            <div className="mb-5 p-4 bg-gray-300 border ">
  {/* <h3 className="font-bold mb-2">Hospital Information</h3> */}
  <p className="mb-1"><span className="font-bold"></span> HealthCare</p>
  {/* <p className="mb-1"><span className="font-bold">Address:</span> 123 Main Street, City, Country</p>
  <p className="mb-1"><span className="font-bold">Contact:</span> +123-456-7890</p> */}
</div>
<div className='flex '>
    <div>
            <p className="text-lg font-semibold mb-2 text-gray-800">Patient Full Name: {prescription.patientName}</p>
            <p className="text-gray-600 mb-1">Appointment Date: {new Date(prescription.date).toLocaleDateString()}</p>
            <p className="text-gray-600 mb-1">TAppointment Time: {prescription.time}</p>
            <p className="text-gray-600 mb-1">Disease: {prescription.disease}</p>
            <p className="text-gray-600 mb-1">Instructions: {prescription.instructions}</p>
          
            <p className="text-gray-600 mb-1">Hospital: {prescription.hospital}</p>
            </div>
            <div className='mx-4 ml-12 mb-6'>
            <p className="text-gray-600  ml-4 font-bold mb-4">Medications:</p>
         
            <ul className="ml-4 space-y-2">
              {prescription.medications.map((medication, medIndex) => (
                <li key={medIndex} className="bg-gray-100 p-2 rounded-md">
                  <p className="font-semibold text-gray-800 mb-1"> Medication Name: {medication.name}</p>
                  <p className="text-gray-600 mb-1">Dosage: {medication.dosage}</p>
                  <p className="text-gray-600 mb-1">Frequency: {medication.frequency}</p>
                 
                  <p className="text-gray-600">Instructions: {medication.instructions}</p>

                </li>
              ))}
            </ul>
            </div>
            </div>
            <div className="mt-4">
              <PDFDownloadLink document={<PrescriptionPDF prescription={prescription} />} fileName={`prescription_${index}.pdf`} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
              </PDFDownloadLink>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PrescriptionPDF = ({ prescription }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.border}>
          <Text style={styles.header}>Hospital Information</Text>
          <Text style={styles.text}>Name: Sample Hospital</Text>
          <Text style={styles.text}>Address: 123 Main Street, City, Country</Text>
          <Text style={styles.text}>Contact: +123-456-7890</Text>
        </View>
        <Text style={styles.header}>Prescription</Text>
        <Text style={styles.subHeader}>Patient: {prescription.patientName}</Text>
        <Text style={styles.text}>Date: {new Date(prescription.date).toLocaleDateString()}</Text>
        <Text style={styles.text}>Time: {prescription.time}</Text>
        <Text style={styles.text}>Disease: {prescription.disease}</Text>
        <Text style={styles.text}>Instructions: {prescription.instructions}</Text>
        <Text style={styles.text}>Hospital: {prescription.hospital}</Text>
        <Text style={[styles.text, styles.prescriptionItem]}>Medications:</Text>
        {prescription.medications.map((medication, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.subHeader}>Medication {index + 1}</Text>
            <Text style={styles.text}>Name: {medication.name}</Text>
            <Text style={styles.text}>Dosage: {medication.dosage}</Text>
            <Text style={styles.text}>Frequency: {medication.frequency}</Text>
            <Text style={styles.text}>Instructions: {medication.instructions}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PrescriptionList;
