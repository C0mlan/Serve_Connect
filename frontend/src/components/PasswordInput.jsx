import { useState } from "react";
// import { FiEye, FiEyeOff } from "react-icons/fi";
import show from "../assets/eye-password-show-svgrepo-com.svg";
import hide from "../assets/eye-password-hide-svgrepo-com.svg";

const PasswordInput = ({ id, label, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative z-0">
      {label && (
        <label htmlFor={id} className="block text-base font-medium mb-2">
          {label}
        </label>
      )}
      <div className="relative z-4">
        <input id={id} type={showPassword ? "text" : "password"} {...props} />
        <button
          type="button"
          className="absolute z-4 inset-y-0 right-0 px-3 rounded-tr-md rounded-br-md hover:bg-gray-300 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <img src={show} className="h-4 w-4" />
          ) : (
            <img src={hide} className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
