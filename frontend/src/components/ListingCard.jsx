import moment from "moment";
import clock from "../assets/clock.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

const ListingCard = ({ listing }) => {
  const [canApply, setCanApply] = useState(false);
  const {
    id,
    title,
    brief_des,
    duration,
    expectation,
    category,
    created,
    user: userId,
  } = listing;

  const formattedDate = moment(created, "DD MMM YYYY, h:mm A").fromNow();
  // console.log(formattedDate);

  const { user } = useAuth();

  useEffect(() => {
    // console.log(user.basedOn);
    // console.log(expectation);
    const containsElement = expectation.some((element) =>
      user.basedOn.includes(element)
    );

    setCanApply(user.accountType == "volunteer" && containsElement);
  }, []);

  return (
    <div>
      {id} {userId}
      {String(canApply)}
      <div className="p-4 rounded-lg shadow-sm select-none hover:shadow-lg">
        <div className="p-2 rounded-md ">
          <div className="flex items-center mb-4 space-x-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full"></div>
            <div className="flex-auto">
              <div className="text-base font-semibold">
                Poster Name (Org type)
              </div>
              <div className="mt-0.5 ">{formattedDate}</div>
            </div>
          </div>
          <h1 className="mb-2 text-2xl font-bold">{title}</h1>
          <p className="mb-2 text-xl">{brief_des}</p>
          <div className="flex mb-4 gap-x-2">
            <img src={clock} className="w-6 h-6" />
            <span>{duration}</span>
          </div>
          <div className="mb-3">
            Accepting volunteers based on:{" "}
            {expectation.map((el, index) => (
              <span
                key={index}
                className="bg-gray-200  text-xs font-medium px-3 mr-2 py-1 rounded-full"
              >
                {el}
              </span>
            ))}
          </div>
          <div className="mb-4">
            Category:<span className="font-medium"> {category}</span>
          </div>
          <div className="">
            <Link to={`/listing/${id}`}>
              <button
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 cursor-pointer w-full mx-auto"
              >
                View Details
              </button>
            </Link>
            <Link to={`/listing/${id}#match`}>
              <button
                type="submit"
                disabled={!canApply}
                className="disabled:bg-gray-500 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 w-full  cursor-pointer"
              >
                Apply Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
