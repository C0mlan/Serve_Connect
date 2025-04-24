import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import api from "../helpers/api";
import { useNavigate } from "react-router-dom";

const CreateListingPage = () => {
  const [title, setTitle] = useState("");
  const [briefDes, setBriefDes] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [expectation, setExpectation] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreateListing = async (e) => {
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

    try {
      const res = await api.post("/listings/create_service/", data);
      console.log(res);
      enqueueSnackbar("Listing has been created succesfully!", {
        variant: "success",
      });
      navigate("/listings");
    } catch (error) {
      console.error(error);
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
    <div class="w-full max-w-lg mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
      <h1 className="mb-4 text-3xl font-semibold text-center">
        Create a new listing
      </h1>
      <form onSubmit={handleCreateListing}>
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
        <label htmlFor="brief-description" className="block mb-2">
          Brief Descripton
        </label>
        <input
          type="text"
          id="brief-description"
          value={briefDes}
          className="bg-gray-50 border mb-2 border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none block w-full p-2.5"
          onChange={(e) => setBriefDes(e.target.value)}
          placeholder="This program is about care for the elderly"
        />
        <label htmlFor="duration" className="block mb-2">
          Duration
        </label>
        <select
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          class="bg-gray-50 mb-2 border border-gray-300 text-gray-900 rounded-lg focus:border-gray-500  focus:outline-none block w-full p-2.5 "
        >
          <option value="">Select duration</option>
          <option value="One-time">One-time</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Occasionaly">Occasionaly</option>
          <option value="Fulltime">Fulltime</option>
        </select>
        <label htmlFor="description" className="block mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          className="block mb-2 p-2.5 w-full h-24 bg-gray-50 rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-none "
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="mb-2">
          <p className="mb-1">Accepting volunteers based on:</p>
          <div className="flex gap-6">
            <div class="flex items-center">
              <input
                type="checkbox"
                id="skills"
                value="skills"
                onChange={handleExpectationChange}
                class="w-4 h-4 mr-1 text-gray-600 bg-gray-100 border-gray-300 rounded-sm  focus:outline-none"
              />
              <label htmlFor="skills">SKills</label>
            </div>
            <div class="flex items-center">
              <input
                type="checkbox"
                value="interests"
                id="interests"
                onChange={handleExpectationChange}
                class="w-4 h-4 mr-1 text-gray-600 bg-gray-100 border-gray-300 rounded-sm  focus:outline-none"
              />
              <label htmlFor="interests">Interests</label>
            </div>
            <div class="flex items-center">
              <input
                type="checkbox"
                value="availability"
                id="availability"
                onChange={handleExpectationChange}
                class="w-4 h-4 mr-1 text-gray-600 bg-gray-100 border-gray-300 rounded-sm  focus:outline-none"
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
          onChange={(e) => setCategory(e.target.value)}
          class="bg-gray-50 mb-2 border border-gray-300 text-gray-900 rounded-lg focus:border-gray-500  focus:outline-none block w-full p-2.5 "
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
        <button
          disabled={loading}
          type="submit"
          class="mt-2 disabled:bg-gray-500 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 focus:outline-none font-medium rounded-lg px-5 py-2.5 cursor-pointer w-full sm:w-auto"
        >
          {loading && (
            <svg
              aria-hidden="true"
              role="status"
              class="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          )}
          {loading ? "Creating..." : "Create Listing"}
        </button>
      </form>
    </div>
  );
};

export default CreateListingPage;
