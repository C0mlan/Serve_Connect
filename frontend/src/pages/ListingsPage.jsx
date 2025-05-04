import { useEffect, useState } from "react";
import api from "../helpers/api";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ACCESS_TOKEN, USER } from "../helpers/constants";
import SearchFilter from "../components/SearchFilter";
import ListingCard from "../components/ListingCard";

const ListingsPage = () => {
  const [listings, setListings] = useState([]);

  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  // console.log(user);
  useEffect(() => {
    const getListings = async () => {
      try {
        const res = await api.get(`/listings/all_service/`);
        setListings(res.data);
        // console.log(listings);
      } catch (error) {
        if (error.status === 404) {
          console.error(error);
        } else if (error.status === 401) {
          enqueueSnackbar(
            "Your session has expired, please login to continue",
            { variant: "error" }
          );
          localStorage.removeItem(USER);
          localStorage.removeItem(ACCESS_TOKEN);
          setIsAuthenticated(false);
          navigate("/login");
        }
      }
    };
    getListings();
  }, []);

  return (
    <section className="mx-8 mt-6 mb-12">
      <SearchFilter />
      <div className="grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {listings && listings.length > 0 ? (
          listings.map((listing) => (
            <ListingCard listing={listing} key={listing.id} />
          ))
        ) : (
          <p>No listings available.</p>
        )}
      </div>
    </section>
  );
};

export default ListingsPage;
