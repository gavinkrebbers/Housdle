import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Trash2 } from "lucide-react";

PopUp.propTypes = {
  onContinue: PropTypes.func.isRequired,
  index: PropTypes.number,
  buttonType: PropTypes.string.isRequired,
};

export default function PopUp({ onContinue, index, buttonType }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const handleContinue = () => {
    if (index === undefined) {
      onContinue();
    } else {
      onContinue(index);
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const renderButton = () => {
    if (buttonType === "delete") {
      return (
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(true)}
          className="p-1 text-red-600 transition-colors duration-200 rounded-full dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400"
          aria-label="Delete"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      );
    } else if (buttonType === "clearData") {
      return (
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(true)}
          className="w-full px-4 py-2 text-white transition-colors duration-200 bg-red-500 rounded dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
        >
          Clear All Data
        </button>
      );
    }
    return "error";
  };

  return (
    <>
      {renderButton()}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pt-16 bg-black bg-opacity-50 dark:bg-opacity-70">
          <div
            className="w-full max-w-sm p-6 transition-opacity duration-200 ease-in-out bg-white rounded-lg shadow-xl opacity-0 dark:bg-gray-800 animate-fade-in"
            // style={{
            //   position: "absolute",
            //   top: `${position.top}px`,
            //   left: `${position.left}px`,
            // }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Confirm Deletion
              </h2>
            </div>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Are you sure you want to delete this time? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 transition-colors bg-gray-200 rounded dark:text-gray-300 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                className="px-4 py-2 text-white transition-colors bg-red-500 rounded dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
