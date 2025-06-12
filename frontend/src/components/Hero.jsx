import { Link } from "react-router-dom";
import hero1 from "../assets/hero1.avif";
import hero2 from "../assets/hero2.avif";
import hero3 from "../assets/hero3.jpg";
import Button from "./Button";

const Hero = () => {
  return (
    <section className="flex-grow bg-gray-100">
      <div className="md:mx-12 pt-4 pb-16 flex flex-col md:flex-row gap-x-10 items-center">
        {/* Left Column - Text Content */}
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-bold uppercase text-black leading-tight mb-6">
            DISCOVER OPPORTUNITIES TO MAKE A DIFFERENCE IN YOUR COMMUNITY
          </h1>
          <p className="text-xl text-gray-600 mb-8 md:text-2xl">
            Embark on a meaningful Journey: Explore various Volunteer
            Opportunities and make a lasting impact in your community. From
            teaching underpriviledged children to caring for the elderly,
            ServeConnect will bridge the connection you desire.
          </p>
          <Link to="/register">
            <Button>Join Now</Button>
          </Link>
        </div>

        {/* Right Column - Image */}
        <div className="md:w-1/2 bg-white p-4 rounded-2xl gap-y-3 flex flex-col">
          <img src={hero1} alt="Hero" className="h-3/4 rounded-2xl" />
          <div className="grid sm:grid-cols-2 gap-3">
            <img src={hero2} alt="Hero" className="rounded-2xl" />
            <img src={hero3} alt="Hero" className="rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
