import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handlePrevBtnClick = () => {
    navigate(-2);
  };

  return (
    <div>
      <div className="  flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="mb-8">
            <h2 className="mt-6 text-6xl font-extrabold text-gray-900 ">404</h2>
            <p className="mt-2 text-3xl font-bold text-gray-900 ">
              Page not found
            </p>
            <p className="mt-2 text-sm text-gray-600 ">
              Sorry, we couldn't find the page you're looking for.
            </p>
          </div>
          <div className="mt-8">
            <Button
              type="button"
              text="Go back"
              onClick={handlePrevBtnClick}
            ></Button>
          </div>
        </div>
        <div className="mt-16 w-full max-w-2xl">
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300 "></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-gray-100 text-sm text-gray-500 ">
                If you think this is a mistake, please contact support
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
