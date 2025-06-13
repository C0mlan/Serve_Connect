import { useEffect, useState } from "react";
import api from "../helpers/api";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ACCESS_TOKEN, USER } from "../helpers/constants";
import SearchFilter from "../components/SearchFilter";
import ListingCard from "../components/ListingCard";
import Spinner from "../components/Spinner";

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState(listings);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);

  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    getListings();
  }, []);

  const getListings = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/listings/all_service/`);
      setListings(res.data);
      setFilteredListings(res.data);
      // console.log(listings);
    } catch (error) {
      if (error.status === 404) {
        console.error(error);
      } else if (error.status === 401) {
        enqueueSnackbar("Your session has expired, please login to continue", {
          variant: "error",
        });
        localStorage.removeItem(USER);
        localStorage.removeItem(ACCESS_TOKEN);
        setIsAuthenticated(false);
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };
  // console.log(user);

  const handleSearch = (searchTerm) => {
    if (searchTerm !== "") {
      const filteredListings = listings.filter(
        (listing) =>
          listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          listing.brief_des.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredListings.length === 0) {
        setNoData(true);
        setFilteredListings([]);
      } else {
        setNoData(false);
        setFilteredListings(filteredListings);
      }
    } else {
      // If search term is empty, reset to original listings
      setNoData(false);
      setFilteredListings(listings);
      // getListings();
    }
  };

  const handleCategoryFilter = (category) => {
    if (category !== "") {
      const filteredListings = listings.filter(
        (listing) => listing.category === category
      );
      if (filteredListings.length === 0) {
        setNoData(true);
        setFilteredListings([]);
      } else {
        setNoData(false);
        setFilteredListings(filteredListings);
      }
    } else {
      setNoData(false);
      // If filter is empty, reset to original listings
      setFilteredListings(listings);
    }
  };

  const handleDurationFilter = (duration) => {
    if (duration !== "") {
      const filteredListings = listings.filter(
        (listing) => listing.duration === duration
      );
      if (filteredListings.length === 0) {
        setNoData(true);
        setFilteredListings([]);
      } else {
        setNoData(false);
        setFilteredListings(filteredListings);
      }
    } else {
      // If filter is empty, reset to original listings
      setNoData(false);
      setFilteredListings(listings);
    }
  };

  return (
    <section className="md:mx-12 mb-12">
      <SearchFilter
        handleSearch={handleSearch}
        handleCategoryFilter={handleCategoryFilter}
        handleDurationFilter={handleDurationFilter} // Placeholder for duration filter
      />
      <h1 className="text-center text-4xl my-6">Available Opportunities</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner color="black" size="10" />
        </div>
      ) : listings.length > 0 ? (
        <>
          {noData ? (
            <p className="text-center text-xl mt-4">
              There are no volunteer opportunities that match your query at the
              moment. Please check back later!
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {filteredListings.map((listing) => (
                <ListingCard listing={listing} key={listing.id} />
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-xl mt-4">
          There are no volunteer opportunities available at the moment. Please
          check back later!
        </p>
      )}
    </section>
  );
};

export default ListingsPage;
