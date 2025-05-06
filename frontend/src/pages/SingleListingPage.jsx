import { useParams } from "react-router-dom";
import api from "../helpers/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import { enqueueSnackbar } from "notistack";
import moment from "moment";

const SingleListingPage = () => {
  const [listing, setListing] = useState({});
  const [canApply, setCanApply] = useState(false);
  const [listingInteractions, setListingInteractions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [reason, setReason] = useState();

  const param = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    const getListing = async () => {
      try {
        const res = await api.get(`/listings/all_service/${param.id}/`);
        setListing(res.data);
        // console.log(res.data);
      } catch (error) {
        if (error.status === 404) {
          navigate("/not-found");
        }
      }
    };
    getListing();
    getInteractions();
  }, []);

  useEffect(() => {
    handleCanApply();
  }, [listing]);
  const getInteractions = async () => {
    try {
      const res = await api.get(`/listings/services/${param.id}/interaction/`);
      setListingInteractions(res.data);
      // console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCanApply = () => {
    if (user.accountType == "volunteer") {
      listing.expectation && listing.expectation.length == 0
        ? setCanApply(true)
        : setCanApply(
            listing.expectation &&
              listing.expectation.some((element) =>
                user.basedOn.includes(element)
              )
          );
    }
  };

  const handleMatchListing = async (e) => {
    e.preventDefault();

    const data = {
      reason,
    };
    setLoading(true);
    try {
      const res = await api.post(
        `listings/all_service/${param.id}/create_reason/`,
        data
      );
      if (res.status === 201) {
        enqueueSnackbar("You have succesfully indicated your interest!", {
          variant: "success",
        });
        setReason("");
        setCanApply(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <article>
      <div className="max-w-lg mx-4 md:mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
        <h1 className="text-3xl font-bold text-center uppercase">
          {listing.title}
        </h1>
        <p className="text-center text-lg">Poster Name goes here</p>
        <div className="text-center">Duration: {listing.duration}</div>
        <div className="font-medium my-2">{listing.description}</div>
        <div>
          Accepting volunteers based on:{" "}
          {listing.expectation &&
            (listing.expectation.length > 0 ? (
              listing.expectation.map((el, index) => (
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
            ))}
        </div>
        <div>
          Category:
          <span className="font-medium"> {listing.category}</span>
        </div>
      </div>
      {user.accountType == "volunteer" && (
        <div
          id="match"
          className="mt-4 max-w-lg mx-4 md:mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8"
        >
          <h1 className="mb-2 text-xl font-semibold">Indicate Interest</h1>
          <form onSubmit={handleMatchListing}>
            <label htmlFor="reason" className="block mb-2">
              Why do you think you're a good fit for this? (optional)
            </label>
            <textarea
              value={reason}
              className="block mb-2 p-2.5 w-full h-24 bg-gray-50 rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-none "
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
            <Button
              loading={loading}
              disabled={!canApply || loading}
              text="Match now"
            ></Button>
          </form>
        </div>
      )}
      {user.accountType !== "volunteer" && user.id === listing.user && (
        <div className="mt-4 max-w-lg mx-4 md:mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
          <h1 className="mb-2 text-xl font-semibold">Interactions</h1>
          {listingInteractions.length > 0 ? (
            <>
              <ul>
                {listingInteractions.map((interaction) => (
                  <li
                    className="bg-white border-b p-2 border-gray-200 hover:bg-gray-100"
                    key={interaction.id}
                  >
                    {">"} User {interaction.username} has indicated interest
                    with reason "{interaction.reason}"{" "}
                    {moment(
                      interaction.created,
                      "DD MMM YYYY, h:mm A"
                    ).fromNow()}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div>This listing has no interactions yet. Check back later!</div>
          )}
        </div>
      )}
    </article>
  );
};

export default SingleListingPage;
