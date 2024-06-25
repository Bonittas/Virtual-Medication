import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faCalendarAlt, faUserShield } from '@fortawesome/free-solid-svg-icons';
import Header from "./header2";
import Footer from "./footer"

const HelpComponent = () => {
  return (
    <><div className='bg-blue-950'><Header/></div>
    <div className="bg-gray-100 mb-6 rounded-lg p-8 mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Help Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <svg
              className="h-8 w-8 text-blue-500 mr-3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-xl font-bold text-gray-800">Need Help?</h3>
          </div>
          <p className="text-gray-600 mb-4">
            If you have any questions or need assistance, don't hesitate to reach out to our team. We're here to help you every step of the way.
          </p>
          <div className="flex justify-end">
            <a
              href="/contact"
              className="bg-blue-950 hover:bg-blue-400 text-white font-medium py-2 px-5 rounded-md transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium text-blue-500 mb-2">How do I schedule a consultation?</h4>
              <p className="text-gray-600">
                To schedule a consultation, simply click the "Schedule Appointment" button on our website or call our customer support line.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-blue-500 mb-2">What type of payment methods do you accept?</h4>
              <p className="text-gray-600">
                We accept a variety of payment methods, including credit/debit cards, PayPal, and bank transfers. You can securely pay for your consultation through our online portal.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Get in Touch</h3>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faPhone} className="h-6 w-6 text-blue-500 mr-3" />
              <p className="text-gray-600">+1 (123) 456-7890</p>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="h-6 w-6 text-blue-500 mr-3" />
              <p className="text-gray-600">support@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Our Features</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCalendarAlt} className="h-6 w-6 text-blue-500 mr-3" />
            <p className="text-gray-700">Easy Scheduling</p>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUserShield} className="h-6 w-6 text-blue-500 mr-3" />
            <p className="text-gray-700">Secure Consultations</p>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faPhone} className="h-6 w-6 text-blue-500 mr-3" />
            <p className="text-gray-700">24/7 Support</p>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faEnvelope} className="h-6 w-6 text-blue-500 mr-3" />
            <p className="text-gray-700">Email Assistance</p>
          </div>
        </div>
      </div>
    </div>
    <div className='bg-blue-950'>
    <Footer/>
    </div>
    </>
  );
};

export default HelpComponent;