import Discover from "../components/Discover";
import Hero from "../components/Hero";
import Opportunity from "../components/Opportunity";
const HomePage = () => {
  return (
    <div>
      <Hero />
      <div className="bg-white md:mx-12 pb-12 px-4">
        <Opportunity />
        <Discover />
      </div>
    </div>
  );
};

export default HomePage;
