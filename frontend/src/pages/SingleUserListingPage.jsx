import api from "../helpers/api";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const SingleUserListing = () => {
  const [userListings, setUserListings] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getListing = async () => {
      try {
        const res = await api.get("/listings/user_service/");
        setUserListings(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getListing();
  }, []);

  const handleEdit = (id) => {
    navigate(`/listing/${id}/edit`);
  };
  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/listings/all_service/delete/${id}/`);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4  sm:p-6 md:p-8 space-y-6">
      <h1 className="text-3xl font-bold text-center">My Listings</h1>
      <ul>
        {userListings && userListings.length > 0 ? (
          userListings.map((listing) => (
            <li
              key={listing.id}
              className="bg-white border-b p-4 border-gray-200 hover:bg-gray-100 flex justify-between"
            >
              <Link
                to={`/listing/${listing.id}`}
                className="text-blue-700 hover: underline"
              >
                {listing.title}
              </Link>
              <div>
                <button
                  onClick={() => handleEdit(listing.id)}
                  className="text-green-700 hover:underline mr-3 font-semibold cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(listing.id)}
                  className="text-red-700 hover:underline mr-3 font-semibold cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="bg-white border-b p-4 border-gray-200  flex justify-between">
            You have not created a listing yet.
            <Link
              to="/create-listing"
              className="text-blue-700 hover:underline"
            >
              Create listing
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SingleUserListing;
