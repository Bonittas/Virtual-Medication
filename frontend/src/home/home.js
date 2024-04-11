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
      <section className="relative mb-10">
        <div
          className="flex items-center justify-center"
          style={{
            backgroundImage: `url(${bgimage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="px-4 lg:flex items-center justify-center">
            <div className="lg:w-2/6 lg:text-left ">
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
            <div className="lg:w-2/5 z-10 mt-36">
              <img
                src={doctor}
                alt="Health Care Image"
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="absolute top-32 left-20 w-24 h-24 hidden lg:block">
          <img src={bgleft} alt="Health Care Image" className="object-cover" />
        </div>
        <div className="absolute top-44 right-16 w-56 h-56 hidden lg:block">
          <img src={bgright} alt="Health Care Image" className="object-cover" />
        </div>
      </section>

      <section className="p-8" id="signUp">
        <div className="max-w-screen-xl mx-auto">
          <div className="relative flex flex-col items-center gap-8 mb-16">
            <h3 className="text-4xl font-semibold relative z-10 text-blue-900 uppercase">
              Register as
            </h3>
            <p className="text-lg text-center relative z-10">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius
              voluptatibus, maiores labore modi consequatur ducimus doloribus
              voluptas error asperiores!
            </p>
            <div className="absolute -top-8 left-0 w-full h-full flex items-center justify-center">
              <p className="text-6xl uppercase text-blue-950 opacity-10">
                Register as
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 shadow-lg rounded-lg bg-gray-50">
              <img
                className="w-20 h-20 mb-4 mx-auto"
                src="/doctor-svgrepo-com.svg"
                alt="Doctor Icon"
              />
              <h4 className="text-xl font-semibold mb-4 text-center">
                Register as Doctor
              </h4>
              <div className="flex justify-center">
                <Link
                  to="/doctor-signup"
                  className="px-8 py-3 text-lg bg-blue-950 text-white rounded-3xl hover:bg-blue-800"
                >
                  Sign Up
                </Link>
                <Link
                  to="/doctor-signin"
                  className="px-8 py-3 text-lg bg-blue-950 text-white rounded-3xl hover:bg-blue-800 ml-4"
                >
                  Sign In
                </Link>
              </div>
            </div>
            <div className="p-8 shadow-lg rounded-lg bg-gray-50">
              <img
                className="w-20 h-20 mb-4 mx-auto"
                src="/doctor-health.svg"
                alt="Patient Icon"
              />
              <h4 className="text-xl font-semibold mb-4 text-center">
                Register as Patient
              </h4>
              <div className="flex justify-center">
                <Link
                  to="/patient-signup"
                  className="px-8 py-3 text-lg bg-blue-950 text-white rounded-3xl hover:bg-blue-800"
                >
                  Sign Up
                </Link>
                <Link
                  to="/patient-signin"
                  className="px-8 py-3 text-lg bg-blue-950 text-white rounded-3xl hover:bg-blue-800 ml-4"
                >
                  Sign In
                </Link>
              </div>
            </div>
            <div className="p-8 shadow-lg rounded-lg bg-gray-50">
              <img
                className="w-20 h-20 mb-4 mx-auto"
                src="/doctor-14-svgrepo-com.svg"
                alt="Admin Icon"
              />
              <h4 className="text-xl font-semibold mb-4 text-center">
                Sign in as Admin
              </h4>
              <div className="flex justify-center">
                <Link
                  to="/admin-signin"
                  className="px-8 py-3 text-lg bg-blue-950 text-white rounded-3xl hover:bg-blue-800"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
