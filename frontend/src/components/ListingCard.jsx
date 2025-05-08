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
    org_type,
    org_name,
    first_name,
    last_name,
  } = listing;

  const formattedDate = moment(created, "DD MMM YYYY, h:mm A").fromNow();

  const { user } = useAuth();

  useEffect(() => {
    // console.log(user.basedOn);
    // console.log(expectation);

    expectation.length == 0
      ? setCanApply(true)
      : setCanApply(
          expectation &&
            expectation.some((element) => user.basedOn.includes(element))
        );
  }, []);

  return (
    <div>
      <div className="p-4 rounded-lg shadow-sm bg-white select-none hover:shadow-lg">
        <div className="p-2 rounded-md ">
          <h1 className="mb-2 text-2xl">{title}</h1>
          <div className="mb-2">
            <div className="text-base font-semibold">
              By:{" "}
              {org_name !== ""
                ? `${org_name} (${org_type})`
                : `${first_name} ${last_name}`}{" "}
              <span className="text-sm font-normal text-gray-500">
                {formattedDate}
              </span>
            </div>
          </div>
          <p className="mb-2 text-xl">{brief_des}</p>
          <div className="flex mb-4 gap-x-2">
            <img src={clock} className="w-6 h-6" />
            <span>{duration}</span>
          </div>
          <div className="mb-3">
            Accepting volunteers based on:{" "}
            {expectation.length > 0 ? (
              expectation.map((el, index) => (
                <span
                  key={index}
                  className="bg-gray-200  text-xs font-medium px-3 mr-2 py-1 rounded-full"
                >
                  {el}
                </span>
              ))
            ) : (
              <span className="bg-gray-200  text-xs font-medium px-3 mr-2 py-1 rounded-full">
                All
              </span>
            )}
          </div>
          <div className="mb-4">
            Category:<span className="font-medium"> {category}</span>
          </div>
          <div className="">
            <Link to={`/listing/${id}#details`}>
              <button
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 cursor-pointer w-full mx-auto"
              >
                View Details
              </button>
            </Link>
            <Link to={`/listing/${id}#match`}>
              <button
                disabled={!canApply}
                className="disabled:bg-gray-500 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 w-full  cursor-pointer"
              >
                Connect
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
