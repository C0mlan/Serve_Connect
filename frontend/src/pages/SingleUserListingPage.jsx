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
    <div>
      SingleUserListing
      <ul>
        {userListings && userListings.length > 0 ? (
          userListings.map((listing) => (
            <li key={listing.id}>
              <Link to={`/listing/${listing.id}`}>{listing.title}</Link>
              <div>
                <button onClick={() => handleEdit(listing.id)}>Edit</button>
                <buton onClick={() => handleDelete(listing.id)}>Delete</buton>
              </div>
            </li>
          ))
        ) : (
          <li>
            You have no listing. Click <Link to="/create-listing">here</Link> to
            create one
          </li>
        )}
      </ul>
    </div>
  );
};

export default SingleUserListing;
