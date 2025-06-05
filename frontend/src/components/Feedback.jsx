import React from "react";

const Feedback = () => {
  return (
    <>
      <div className="py-12 bg-gray-100 my-16">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-left mb-10">
            <h3 className="text-4xl text-center font-bold mb-4">
              Volunteers Feedback
            </h3>
            <p className="mt-4 text-lg text-center text-gray-700">
              Read what some volunteers have to say about their experience
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900">
                Emily Johnson
              </h3>
              <p className="mt-2 text-gray-600">
                "I found the perfect volunteer opportunity that aligned with my
                passion for helping others. Thank you for the amazing
                experience!"
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900">
                Sophia Brown
              </h3>
              <p className="mt-2 text-gray-600">
                "I've had a fantastic time volunteering with this app. The
                support from the team and the impact I've been able to make have
                been truly fulfilling."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900">
                Michael Smith
              </h3>
              <p className="mt-2 text-gray-600">
                "Volunteering through this platform has been incredibly
                rewarding. I appreciate the variety of opportunities available
                and the seamless process of getting involved."
              </p>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900">
                Daniel Wilson
              </h3>
              <p className="mt-2 text-gray-600">
                "Being a volunteer through this platform has been a game-changer
                for me. The opportunities provided have allowed me to grow
                personally and contribute to causes I care about. " Lorem ipsum,
                dolor sit amet consectetur adipisicing elit. Sequi repudiandae
                voluptatibus molestiae esse earum unde expedita ab ipsam
                assumenda quibusdam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;
