import Discover from "../components/Discover";
import Hero from "../components/Hero";
import Opportunity from "../components/Opportunity";
const HomePage = () => {
  return (
    <div>
      <Hero />
      <div className="bg-white mx-4 md:mx-8 pb-12">
        <Opportunity />
        <Discover />
      </div>
    </div>
  );
};

export default HomePage;
