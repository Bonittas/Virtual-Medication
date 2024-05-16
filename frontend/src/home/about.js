import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faLaptopMedical, faComments } from '@fortawesome/free-solid-svg-icons';

const AboutUs = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container text-blue-950">
        <h2 className="text-3xl font-semibold text-center mb-12">About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="bg-blue-200 p-6 rounded-full mb-6">
              <FontAwesomeIcon icon={faUserMd} className="text-4xl text-blue-950" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Experienced Doctors</h3>
            <p className="text-gray-700 text-center">Our platform connects you with experienced doctors who specialize in various medical fields.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-200 p-6 rounded-full mb-6">
              <FontAwesomeIcon icon={faLaptopMedical} className="text-4xl text-blue-950" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Online Consultations</h3>
            <p className="text-gray-700 text-center">Get medical consultations from the comfort of your home using our secure online platform.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-200 p-6 rounded-full mb-6">
              <FontAwesomeIcon icon={faComments} className="text-4xl text-blue-950" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Instant Messaging</h3>
            <p className="text-gray-700 text-center">Communicate with your doctor through instant messaging for quick and efficient consultations.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
