import { Link } from "react-router-dom";
import doctor from "../assets/images/bg-middle.png";
import bgimage from "../assets/images/bg-image.png";
import bgright from "../assets/images/bg-right.png";
import bgleft from "../assets/images/bg-left.png";
import Header from "./header";

const LandingPage = () => {
  return (
    <>
      <Header />
      <section className="relative">
        <div
          className="bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{
            backgroundImage: `url(${bgimage})`,
            minHeight: "80vh",
          }}
        >
          <div className="container mx-auto px-8 lg:flex items-center justify-center">
            <div className="lg:w-2/6 text-center lg:text-left mt-32">
              <h1 className="text-4xl lg:text-5xl text-blue-950 font-thin mb-4">
                We're <span className="font-bold">determined</span> for your{" "}
                <span className="font-bold">better life.</span>
              </h1>
              <p className="text-lg lg:text-xl mb-8 text-blue-900">
                You can get the care you need 24/7 – be it online or in person.
                You will be treated by caring specialist doctors.
              </p>
              <Link
                to="/contact"
                className="inline-block px-8 py-3 text-lg text-white font-medium bg-blue-950 rounded-3xl hover:bg-blue-800"
              >
                Make an Appointment
              </Link>
            </div>
            <div className="lg:w-1/3 z-10 mt-44 ">
              <img
                src={doctor}
                alt="Health Care Image"
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="absolute top-44 left-24 w-24 h-24 hidden lg:block">
          <
          img src={bgleft} 
          alt="Health Care Image" 
          className="object-cover" />
        </div>
        <div className="absolute top-56 right-24 w-56 h-56 hidden lg:block">
          <img src={bgright} alt="Health Care Image" className="object-cover" />
        </div>
      </section>

      <section className="p-10" id="signUp">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col items-center gap-8 mb-16">
            <h3 className="text-4xl font-semibold">Services We Offer</h3>
            <p className="text-lg text-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius
              voluptatibus, maiores labore modi consequatur ducimus doloribus
              voluptas error asperiores!
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
              <h4 className="text-xl font-semibold mb-4">
                Register as Patient
              </h4>
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

      {/* <footer className="bg-gray-200 bg-opacity-75 py-4 text-gray-600">
        <div className="container mx-auto flex items-center justify-between">
          <span className="text-sm">
            © 2024 Ashewa TechnologyAll rights reserved.
          </span>
          <span className="text-sm">
            Made with <span className="text-red-500">&hearts;</span> byAshewa
            Tech Team
          </span>
        </div>
      </footer> */}
    </>
  );
};

export default LandingPage;
