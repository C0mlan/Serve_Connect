import React from "react";

const SearchFilter = () => {
  return (
    <div className="mb-8">
      <form className="items-center justify-between mx-auto sm:flex gap-x-4">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none block w-full p-2.5  "
          placeholder="Search for an outreach..."
          required
        />
        <div className="flex my-2 gap-x-4 sm:my-0">
          <select
            id="duration"
            className="bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 block w-1/2 p-2.5 "
          >
            <option value="">Duration</option>
            <option value="One-time">One-time</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Occasionaly">Occasionaly</option>
            <option value="Fulltime">Fulltime</option>
          </select>
          <select
            id="category"
            className="bg-gray-50 border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none block w-1/2 p-2.5  "
          >
            <option value="">Category</option>
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
        </div>

        <button
          type="button"
          className="block p-2.5 font-medium w-full sm:w-40 text-white bg-gray-700 hover:bg-gray-800 rounded-lg border focus:ring-4 focus:outline-none focus:ring-gray-300 cursor-pointer"
        >
          <span className="sr-only">Clear filter</span>
          Clear filter
        </button>
      </form>
    </div>
  );
};

export default SearchFilter;
