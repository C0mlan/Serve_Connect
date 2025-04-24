import React, { useRef, useEffect } from "react";

const OTPInput = ({ otp, setOtp, length }) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
    if (index === length - 1 && value) {
      setOtp(newOtp.join("").slice(0, 6));
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="number"
          maxLength="1"
          disabled={otp.length == 6}
          className="w-16 h-16 p-4 py-3 mx-auto mr-2 text-3xl font-bold text-center text-gray-900 bg-white border border-gray-300 rounded-lg disabled:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:outline-none"
          value={otp[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          ref={(ref) => (inputRefs.current[index] = ref)}
        />
      ))}
    </div>
  );
};

export default OTPInput;
