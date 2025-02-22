import { Link } from "react-router-dom";
import bgimage from "../assets/images/bg.webp";
import bgright from "../assets/images/bg-right.png";
import bgleft from "../assets/images/bg-left.png";
import OptionsPage from './optionPage';
import Posts from './posts';
import Header from "./header";
import Footer from "./footer";
import About from "./about";

const LandingPage = () => {
  return (
    <>
      <Header />
      <section className="relative text-white h-screen">
        <div className="flex items-center justify-center h-full">
          <img src={bgimage} alt="Health Care Image" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="absolute top-24 left-4 sm:left-10 md:left-20 w-11/12 lg:w-1/2">
            <h1 className="mb-4 text-3xl sm:text-4xl font-bold text-white">
              Unlock Personalized <span className="text-blue-400">Healthcare</span> with Our Expert Professionals
            </h1>
            <p className="mb-8 text-base sm:text-lg text-white">
              Experience secure and confidential video or audio sessions tailored to your needs.
            </p>
            <div className="text-center lg:text-left">
              <Link
                to="/option"
                className="inline-block rounded-full hover:bg-blue-400 px-6 py-3 hover:text-blue-950 font-bold bg-blue-950 text-blue-400 transition-colors duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-32 left-20 w-24 h-24 hidden lg:block">
          <img src={bgleft} alt="Left Decoration" className="object-cover h-full" />
        </div>
        <div className="absolute top-44 right-16 w-56 h-56 hidden lg:block">
          <img src={bgright} alt="Right Decoration" className="object-cover h-full" />
        </div>
      </section>
      <section>
        <About />
      </section>
      <Posts />
      <div className="bg-blue-950">
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;