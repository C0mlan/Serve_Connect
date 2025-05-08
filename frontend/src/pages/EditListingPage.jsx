import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import api from "../helpers/api";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";

const EditListingPage = () => {
  const [title, setTitle] = useState("");
  const [briefDes, setBriefDes] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [expectation, setExpectation] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState();

  const navigate = useNavigate();
  const param = useParams();
  //add logic to make sure it's creator who is editing
  useEffect(() => {
    const getListing = async () => {
      try {
        const res = await api.get(`/listings/all_service/${param.id}/`);
        setTitle(res.data.title);
        setBriefDes(res.data.brief_des);
        setDuration(res.data.duration);
        setDescription(res.data.description);
        setExpectation(res.data.expectation);
        setCategory(res.data.category);
      } catch (error) {
        if (error.status === 404) {
          navigate("/not-found");
        }
        console.error(error);
      }
    };
    getListing();
  }, []);

  const handleDescriptionChange = (e) => {
    const description = e.target.value;
    if (description.length > 3500) {
      enqueueSnackbar(
        "The description field should not contain more than 3500 characters!",
        { variant: "error" }
      );
      return;
    } else {
      setDescription(description.slice(0, 3500));
    }
  };
  const handleBriefDesChange = (e) => {
    const briefDes = e.target.value;
    if (briefDes.length > 200) {
      enqueueSnackbar(
        "The brief description field should not contain more than 200 characters!",
        { variant: "error" }
      );
      return;
    } else {
      setBriefDes(briefDes.slice(0, 200));
    }
  };

  const handleEditListing = async (e) => {
    e.preventDefault();
    if (!title || !briefDes || !duration || !description || !category) {
      enqueueSnackbar("All fields msut be filled", { variant: "error" });
      return;
    }
    setLoading(true);
    const data = {
      title,
      brief_des: briefDes,
      duration,
      description,
      expectation,
      category,
    };
    setLoading(true);
    try {
      const res = await api.put(
        `/listings/all_service/edit/${param.id}/`,
        data
      );
      console.log(res);
      enqueueSnackbar("Listing has been edited succesfully!", {
        variant: "success",
      });
      navigate(`/listing/${param.id}`);
    } catch (error) {
      console.error(error);
      if (error.status === 400) {
        if (error.response.data["description"][0].includes("no more than")) {
          enqueueSnackbar(
            "The descrption field should not contain more than 5000 characters!",
            {
              variant: "error",
            }
          );
        }
        if (error.response.data["brief_des"][0].includes("no more than")) {
          enqueueSnackbar(
            "The brief descrption field should not contain more than 200 characters!",
            {
              variant: "error",
            }
          );
        }
      }
    } finally {
      setLoading(false);
    }

    // console.log(data);
  };

  const handleExpectationChange = (e) => {
    if (!expectation.includes(e.target.value) && e.target.checked === true) {
      setExpectation([...expectation, e.target.value]);
    } else {
      let basedOnCopy = expectation.filter((el) => el !== e.target.value);
      setExpectation(basedOnCopy);
    }
  };
  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
      <h1 className="mb-4 text-3xl font-semibold text-center">
        Edit a listing
      </h1>
      <form onSubmit={handleEditListing}>
        <label htmlFor="listing-title" className="block mb-2">
          Title
        </label>
        <input
          type="text"
          id="listing-title"
          value={title}
          className="bg-gray-50 border mb-2 border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none block w-full p-2.5"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label
          htmlFor="brief-description"
          className="flex justify-between mb-2"
        >
          Brief Description
          {briefDes.length >= 190 ? (
            <span className="text-sm text-red-500">
              {briefDes.length}/200 characters
            </span>
          ) : (
            <span className="text-sm">{briefDes.length}/200 characters</span>
          )}
        </label>
        <input
          type="text"
          id="brief-description"
          value={briefDes}
          className="bg-gray-50 border mb-2 border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none block w-full p-2.5"
          onChange={handleBriefDesChange}
          placeholder="This program is about care for the elderly"
        />
        <label htmlFor="duration" className="block mb-2">
          Duration
        </label>
        <select
          id="duration"
          value={duration}
          className="bg-gray-50 border mb-2 border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none block w-full p-2.5"
          onChange={(e) => setDuration(e.target.value)}
        >
          <option value="">Select duration</option>
          <option value="One-time">One-time</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Occasional">Occasional</option>
          <option value="Full-time">Full-time</option>
        </select>
        <div className="mb-2">
          <p className="mb-1">Accepting volunteers based on:</p>
          <div className="flex gap-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="skills"
                value="skills"
                checked={expectation.includes("skills")}
                onChange={handleExpectationChange}
                className="w-4 h-4 mr-1 text-gray-600 bg-gray-100 border-gray-300 rounded-sm  focus:outline-none"
              />
              <label htmlFor="skills">SKills</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                value="interests"
                id="interests"
                checked={expectation.includes("interests")}
                onChange={handleExpectationChange}
                className="w-4 h-4 mr-1 text-gray-600 bg-gray-100 border-gray-300 rounded-sm  focus:outline-none"
              />
              <label htmlFor="interests">Interests</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                value="availability"
                id="availability"
                checked={expectation.includes("availability")}
                onChange={handleExpectationChange}
                className="w-4 h-4 mr-1 text-gray-600 bg-gray-100 border-gray-300 rounded-sm  focus:outline-none"
              />
              <label htmlFor="availability">Availability</label>
            </div>
          </div>
        </div>
        <label htmlFor="category" className="block mb-2">
          Category
        </label>
        <select
          id="category"
          value={category}
          className="bg-gray-50 border mb-2 border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none block w-full p-2.5"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          <option value="Education & Literacy">Education & Literacy</option>
          <option value="Health & Medcial Outreach">
            Health & Medcial Outreach
          </option>
          <option value="Technology & Digital Skills">
            Technology & Digital Skills
          </option>
          <option value="Women & Gender Advocacy">
            Women & Gender Advocacy
          </option>
          <option value="Environmental Conservation">
            Environmental Conservation
          </option>
          <option value="Agriculture & Food Security">
            Agriculture & Food Security
          </option>
          <option value="Other">Other</option>
        </select>
        <label htmlFor="description" className="flex justify-between mb-2">
          Description
          {description.length >= 3000 ? (
            <span className="text-sm text-red-500">
              {description.length}/3500 characters
            </span>
          ) : (
            <span className="text-sm">
              {description.length}/3500 characters
            </span>
          )}
        </label>
        <textarea
          id="description"
          value={description}
          className="block mb-2 p-2.5 w-full h-48 bg-gray-50 rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-none "
          onChange={handleDescriptionChange}
        ></textarea>

        <Button
          disabled={loading}
          text="Edit Listing"
          loading={loading}
        ></Button>
      </form>
    </div>
  );
};

export default EditListingPage;
