import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Header from "./header2";
import Footer from "./footer"

const ContactUsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Simulate a successful response from the server
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => {
        setSuccess(false);
      }, 5000); // Hide the success message after 5 seconds
    } catch (error) {
      console.error('Error sending message:', error);
      alert('There was an error sending your message. Please try again later.');
    }
  };

  return (
  <><div className='bg-blue-950'><Header/></div>

    <div className="bg-gray-100 py-16 mt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
              <div className="flex items-center space-x-4 mb-4">
                <FontAwesomeIcon icon={faPhone} className="text-blue-400" />
                <a href="tel:+1234567890" className="text-gray-600 hover:text-blue-400">+1 (234) 567-890</a>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <FontAwesomeIcon icon={faEnvelope} className="text-blue-400" />
                <a href="mailto:info@example.com" className="text-gray-600 hover:text-blue-400">info@example.com</a>
              </div>
              <div className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-400" />
                <span className="text-gray-600">123 Main St, Anytown USA</span>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Send us a Message</h2>
              {success && (
                <p className="text-green-500 mb-4">Your message has been sent successfully!</p>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows={4}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-950 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
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

export default ContactUsPage;