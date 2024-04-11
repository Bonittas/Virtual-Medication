import { Link } from "react-router-dom";
import doctor from "../images/home.jpg";
import bg from "../images/blue2.jpg";

const LandingPage = () => {
  return (
    <>
      <section className="bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
        <div className="">
          <div className="pt-16">
            <section className="flex items-center justify-center p-4">
              <div className="w-1/2 border border-blue-300 mr-4 rounded-full">
                <img src={doctor} alt="Ashewa Technology Logo" className="object-cover w-full border border-blue-300 rounded-full" />
              </div>
              <div className="w-1/2">
                <h1 className="text-5xl font-bold mb-8 text-black">Welcome to HealthCare</h1>
                <p className="text-lg mb-8 text-black">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas accusantium fuga quasi dignissimos incidunt
                  maxime, aperiam aliquid necessitatibus possimus perspiciatis amet consectetur, magni, eos rem recusandae
                  voluptatum voluptate officiis consequatur.
                </p>
                <Link
                  to="/contact"
                  className="px-6 py-3 text-lg text-white font-medium bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Contact Us
                </Link>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="p-10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col items-center gap-8 mb-16">
            <h3 className="text-4xl font-semibold">Services We Offer</h3>
            <p className="text-lg text-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius voluptatibus, maiores labore modi
              consequatur ducimus doloribus voluptas error asperiores!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-300 p-8 shadow-md rounded-md">
              <img
                className="w-20 h-20 mb-4 mx-auto"
                src="/doctor-svgrepo-com.svg"
                alt="Doctor Icon"
              />
              <h4 className="text-xl font-semibold mb-4">Register as Doctor</h4>
              <div className="flex justify-center">
                <Link
                  to="/doctor-signup"
                  className="px-6 py-3 text-lg bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Sign Up
                </Link>
                <Link
                  to="/doctor-signin"
                  className="px-6 py-3 text-lg bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-4"
                >
                  Sign In
                </Link>
              </div>
            </div>
            <div className="bg-gray-300 p-8 shadow-md rounded-md">
              <img
                className="w-20 h-20 mb-4 mx-auto"
                src="/doctor-health.svg"
                alt="Patient Icon"
              />
              <h4 className="text-xl font-semibold mb-4">Register as Patient</h4>
              <div className="flex justify-center">
                <Link
                  to="/patient-signup"
                  className="px-6 py-3 text-lg bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Sign Up
                </Link>
                <Link
                  to="/patient-signin"
                  className="px-6 py-3 text-lg bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-4"
                >
                  Sign In
                </Link>
              </div>
            </div>
            <div className="bg-gray-300 p-8 shadow-md rounded-md">
              <img
                className="w-20 h-20 mb-4 mx-auto"
                src="/doctor-14-svgrepo-com.svg"
                alt="Admin Icon"
              />
              <h4 className="text-xl font-semibold mb-4">Sign in as Admin</h4>
              <div className="flex justify-center">
                <Link
                  to="/admin-sign-in"
                  className="px-6 py-3 text-lg bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-200 bg-opacity-75 py-4 text-gray-600">
        <div className="container mx-auto flex items-center justify-between">
          <span className="text-sm">© 2024 Ashewa TechnologyAll rights reserved.</span>
          <span className="text-sm">
            Made with <span className="text-red-500">&hearts;</span> byAshewa Tech Team
          </span>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
