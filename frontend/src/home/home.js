import { Link } from "react-router-dom";
import bgimage from "../assets/images/bg.webp";
import bgright from "../assets/images/bg-right.png";
import bgleft from "../assets/images/bg-left.png";
import OptionsPage from './optionPage'
import Posts from './posts'
import Header from "./header";

import Footer from "./footer"
import About from "./about"

const LandingPage = () => {
  return (
    <>
      <Header />
      <section className="relative text-white">
  <div className="flex items-center h-full justify-center">
    <img src={bgimage} alt="Health Care Image" className="object-cover" />
    <div className="absolute top-0 left-0 h-full w-full bg-black opacity-50"></div>
    <div className="absolute top-24 left-20 w-2/3 lg:w-1/2">
      <h1 className="mb-4 text-4xl font-bold text-gray-300">
        Unlock Personalized <span className="text-blue-400 px-1">Healthcare</span> with Our Expert Professionals
      </h1>
      <p className="mb-8 text-lg text-gray-300">
      Experience secure and confidential video or audio sessions tailored to your needs.
      </p>
      <div className="lg:text-left">
        <Link
          to="/option"
          variant="body2"
          className="inline-block rounded-full hover:bg-blue-400 px-6 py-3 hover:text-blue-950 font-bold bg-blue-950 text-blue-400 transition-colors duration-300"
        >
          Sign Up
        </Link>
      </div>
    </div>

  </div>
  <div className="absolute top-32 left-20 w-24 h-24 hidden lg:block">
    {/* <img src={bgleft} alt="Health Care Image" className="object-cover" /> */}
  </div>
  <div className="absolute top-44 right-16 w-56 h-56 hidden lg:block">
    {/* <img src={bgright} alt="Health Care Image" className="object-cover" /> */}
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