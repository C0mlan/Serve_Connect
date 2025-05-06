import { Link } from "react-router-dom";
import hero1 from "../assets/hero1.avif";
import hero2 from "../assets/hero2.avif";
import hero3 from "../assets/hero3.jpg";
import Button from "./Button";

const Hero = () => {
  return (
    <section className="flex-grow bg-gray-50">
      <div className="mx-4 md:mx-12 py-16 flex flex-col md:flex-row gap-x-10 items-center">
        {/* Left Column - Text Content */}
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-bold uppercase text-black leading-tight mb-6">
            DISCOVER OPPORTUNITIES TO MAKE A DIFFERENCE IN YOUR COMMUNITY
          </h1>
          <p className="text-lg text-gray-600 mb-8 md:text-2xl">
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
        <div className="md:w-1/2 bg-white pt-4 px-6 pb-4 rounded-2xl gap-y-2 flex flex-col">
          <img
            src={hero1}
            alt="Hero"
            className="h-3/4 scale-95 hover:scale-100 transition-all ease-in-out duration-300 rounded-2xl"
          />
          <div className="grid sm:grid-cols-2 gap-1">
            <img
              src={hero2}
              alt="Hero"
              className="h-full scale-95 sm:scale-90 hover:scale-100 transition-all ease-in-out duration-300 rounded-2xl"
            />
            <img
              src={hero3}
              alt="Hero"
              className="h-full scale-95 sm:scale-90 hover:scale-100 transition-all ease-in-out duration-300 rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
