import discoverImg1 from "../assets/discover-1.png";
import discoverImg2 from "../assets/discover-2.png";
import discoverImg3 from "../assets/discover-3.png";
import tool from "../assets/tool.png";
import empowerLady from "../assets/empower-lady.png";

import DiscoverGridItem from "./DiscoverGridItem";
import ReuseableSection from "./ReuseableSection";

const Discover = () => {
  return (
    <section className="mx-auto p-6 md:px-24">
      <div className="py-12">
        {/* Header Section */}
        <h3 className="text-4xl text-center font-bold mb-4">
          DISCOVER YOUR PASSION, <span className="md:block"></span>
          MAKE A DIFFERENCE
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-24">
        <DiscoverGridItem
          image={discoverImg1}
          title="VOLUNTEER OPPORTUNITIES"
          body="Discover inspiring stories of volunteers who have made a lasting
              impact in their communities."
        />
        <DiscoverGridItem
          image={discoverImg2}
          title="VOLUNTEER PROFILES"
          body="Stay organized and track your volunteer hours, achievements, and upcoming commitments."
        />
        <DiscoverGridItem
          image={discoverImg3}
          title="VOLUNTEER DASHBOARD"
          body="Stay organized and track your volunteer hours, achievements, and
              upcoming commitments."
        />
      </div>
      <ReuseableSection
        reverse={true}
        icon={tool}
        image={empowerLady}
        title="EMPOWERING VOLUNTEERS, TRANSFORMING COMMUNITIES!"
        body="Join our vibrant community of volunteers and make a lasting
impact. Whether you have a few hours a week or a few days
a month, we habe a wide range of opportunities that will
inspire and empower ypu to create positive change."
        buttonText="Get Started"
      />
    </section>
  );
};

export default Discover;
