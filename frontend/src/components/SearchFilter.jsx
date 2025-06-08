import { useState } from "react";
import Button from "./Button";

const SearchFilter = ({
  handleSearch,
  handleCategoryFilter,
  handleDurationFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    handleSearch(value);
  };

  const handleCategoryFilterChange = (value) => {
    setCategory(value);
    setDuration("");
    handleDurationFilter("");
    if (value !== "") {
      handleCategoryFilter(value);
    }
  };
  const handleDurationFilterChange = (value) => {
    setDuration(value);
    setCategory("");
    handleCategoryFilter("");
    if (value !== "") {
      handleDurationFilter(value);
    }
  };

  const handleClearFilter = () => {
    setSearchTerm("");
    handleSearch("");
    setDuration("");
    handleDurationFilter("");
    setCategory("");
    handleCategoryFilter("");
  };

  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-5">
      <form className="items-center justify-between mx-auto sm:flex gap-x-4">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <input
          onChange={(e) => handleSearchChange(e.target.value)}
          value={searchTerm}
          type="text"
          className="bg-gray-50 border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none block w-full sm:w-1/2 p-2.5  "
          placeholder="Search..."
          required
        />
        <div className="flex my-2 gap-x-4 sm:my-0">
          <select
            id="duration"
            value={duration}
            onChange={(e) => handleDurationFilterChange(e.target.value)}
            className="bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 block w-1/2 p-2.5 "
          >
            <option value="">Duration</option>
            <option value="One-time">One-time</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Occasional">Occasional</option>
            <option value="Full-time">Full-time</option>
          </select>
          <select
            id="category"
            onChange={(e) => handleCategoryFilterChange(e.target.value)}
            value={category}
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

        <Button type="button" text="Clear" onClick={handleClearFilter}></Button>
      </form>
    </div>
  );
};

export default SearchFilter;
