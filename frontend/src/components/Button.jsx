import Spinner from "./Spinner";

const Button = ({ children, loading, text, ...props }) => {
  return (
    <button
      type="submit"
      {...props}
      className="mt-2 mb-2 disabled:bg-gray-500 text-white bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 focus:outline-none font-medium text-lg rounded-lg px-6 py-2.5 cursor-pointer w-full sm:w-[200px]"
    >
      {loading && <Spinner />}
      <span className="sr-only">{children}</span>
      {text ? text : children}{" "}
    </button>
  );
};

export default Button;
