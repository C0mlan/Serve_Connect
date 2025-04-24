import { useParams } from "react-router-dom";
import api from "../helpers/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SingleListingPage = () => {
  const [listing, setListing] = useState({});

  const param = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getListing = async () => {
      try {
        const res = await api.get(`/listings/all_service/${param.id}/`);
        setListing(res.data);
        console.log(res.data);
      } catch (error) {
        if (error.status === 404) {
          navigate("/not-found");
        }
      }
    };
    getListing();
  }, []);
  return (
    <>
      <h1>SingleListingPage</h1>
      <div>title: {listing.title}</div>
      <div>brief: {listing.brief_des}</div>
      <div>duration: {listing.duration}</div>
      <div>desc: {listing.description}</div>
      <div>
        exp:
        {listing.expectation &&
          listing.expectation.map((el, index) => <p key={index}>{el}</p>)}
        <div>cat: {listing.category}</div>
      </div>
    </>
  );
};

export default SingleListingPage;
