import { Link } from "react-router-dom";
import heroImage from "../assets/heroImage.png";
import Button from "./Button";

const Hero = () => {
  return (
    <section className="flex-grow bg-gray-50">
      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row sm:gap-x-60 items-center">
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
        <div className="md:w-1/2 bg-white pt-4 px-6 rounded-2xl">
          <img src={heroImage} alt="Hero" className="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
