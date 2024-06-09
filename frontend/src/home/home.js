import { Link } from "react-router-dom";
import doctor from "../assets/images/bg-middle.png";
import bgimage from "../assets/images/bg-image.png";
import bgright from "../assets/images/bg-right.png";
import bgleft from "../assets/images/bg-left.png";
import Header from "./header";
import OptionsPage from './optionPage'
import Posts from './posts'
import Footer from "./footer"
import About from "./about"
const LandingPage = () => {
  return (
    <>
      <Header />
      <section className="relative ">
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
            <div className="lg:w-2/6 lg:text-left my-20">
              <h1 className="text-4xl lg:text-5xl sm:mt-12 text-blue-950 font-thin my-4">
                We're <span className="font-bold">determined</span> for your{" "}
                <span className="font-bold">better life.</span>
              </h1>
              <p className="text-lg lg:text-xl mb-8 text-blue-900">
                You can get the care you need 24/7 – be it online or in person.
                You will be treated by caring specialist doctors.
              </p>
              <Link to="/option" variant="body2" className="text-white rounded-full bg-blue-950 px-5 py-2">
Signup                  
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
<section>
  <About/>
</section>

<Posts/>
<div className="bg-blue-300">
    <Footer/>
    </div>
    </>
  );
};

export default LandingPage;