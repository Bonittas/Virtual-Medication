import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className=" py-4">
      <div className="container flex-cols items-center justify-center py-4 mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
       
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-white mb-4">Quick Links</h2>
            <ul>
              <li className="mb-2"><a href="#" className="text-white hover:text-white transition duration-300">Home</a></li>
              <li className="mb-2"><a href="#" className="text-white hover:text-white transition duration-300">About</a></li>
              <li className="mb-2"><a href="#" className="text-white hover:text-white transition duration-300">Services</a></li>
              <li className="mb-2"><a href="#" className="text-white hover:text-white transition duration-300">Contact</a></li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold font-cursive text-white mb-4">Health Care</h2>
            <p className="text-white mb-2">123 Street Name</p>
            <p className="text-white mb-2">City, Country</p>
            <p className="text-white mb-2">info@company.com</p>
            <p className="text-white mb-2">+1234567890</p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-lg font-bold text-white mb-4">Follow Us</h2>
            <div className="flex">
              <a href="#" className="text-white hover:text-white transition duration-300 mx-2"><FontAwesomeIcon icon={faFacebookF} size="lg" /></a>
              <a href="#" className="text-white hover:text-white transition duration-300 mx-2"><FontAwesomeIcon icon={faTwitter} size="lg" /></a>
              <a href="#" className="text-white hover:text-white transition duration-300 mx-2"><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-white">&copy; {new Date().getFullYear()} Health Care. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
