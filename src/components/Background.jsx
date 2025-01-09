import PropTypes from "prop-types";
import { useEffect } from "react";
import { Gradient } from "whatamesh";

Background.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};

export default function Background({ isDarkMode }) {
  useEffect(() => {
    const gradient = new Gradient();
    if (isDarkMode) {
      gradient.initGradient("#gradient-canvas-dark");
    } else {
      gradient.initGradient("#gradient-canvas-light");
    }
  }, [isDarkMode]);
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden transition-colors duration-300"
      aria-hidden="true"
    >
      {/* {isDarkMode ? (
        <canvas id="gradient-canvas-dark"></canvas>
      ) : (
        <canvas id="gradient-canvas-light"></canvas>
      )} */}
      <div
        className={`absolute inset-0 transition-colors duration-300 ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 to-gray-800"
            : "bg-gradient-to-br from-blue-50 to-indigo-100"
        }`}
      ></div>

      <div
        className={`absolute inset-0 opacity-50 transition-colors duration-300 ${
          isDarkMode
            ? "bg-gradient-to-tr from-transparent via-gray-800 to-gray-900"
            : "bg-gradient-to-tr from-transparent via-blue-100 to-indigo-200"
        }`}
      ></div>

      {/* Grid pattern */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke={
                isDarkMode ? "rgba(75, 85, 99, 0.1)" : "rgba(59, 130, 246, 0.2)"
              }
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}
