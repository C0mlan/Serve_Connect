import communityEngagement from "../assets/community-engagement.jpg";
import happyVolunteer from "../assets/happy-volunteer.jpg";
import screenshot from "../assets/screenshot.png";
import check from "../assets/check.png";
import OpportunityCard from "./OpportunityCard";

import ReuseableSection from "./ReuseableSection";
const Opportunity = () => {
  return (
    <section className="mx-auto p-6 md:px-24">
      <div className="py-12">
        {/* Header Section */}
        <h3 className="text-5xl text-center font-bold mb-4">
          EMPOWER YOURSELF <span className="md:block"></span>
          THROUGH VOLUNTEERING
        </h3>
      </div>
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-24 mb-24">
        {/* Left Container - Londis Care Home */}
        <OpportunityCard
          spanText="Lend a Helping Hand"
          image={communityEngagement}
          title="UNLOCK THE POWER OF COMMMUNITY ENGAGEMENT"
          body="Discover how you can makes a positive impact in your community by
          exploring our wide range of volunteer opportunities."
          footer="Volunteer Today, Transform Tomorrow"
        />
        <OpportunityCard
          spanText="Embrace the Spirit of Service"
          image={happyVolunteer}
          title="IGNITE CHANGE THROUGH VOLUNTEERING"
          body="Join our vibrant community of volunteers and make a meaningful
              difference in the lives of those in need."
          footer="Volunteer, Connect, Transform"
        />
      </div>
      <ReuseableSection
        image={screenshot}
        icon={check}
        title="EMPOWERING VOLUNTEERS, ENRICHING COMMUNITIES!"
        body="Our volunteer program offers a diverse range of opportunities to make
          a tangible impact on the lives of others"
        buttonText="Apply now"
      />
    </section>
  );
};

export default Opportunity;
