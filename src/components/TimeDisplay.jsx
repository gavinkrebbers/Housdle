import PropTypes from "prop-types";

export default function TimeDisplay({ label, best, current }) {
  return (
    <div className="p-2 transition-colors duration-200 bg-white rounded shadow dark:bg-gray-800">
      <h3 className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">
        {label}
      </h3>
      <div className="flex justify-between">
        <div>
          <span className="text-xs text-gray-500 dark:text-gray-400">Best</span>
          <p className="text-sm font-bold text-green-600 dark:text-green-400">
            {best ? best : "--.--"}
          </p>
        </div>
        <div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Current
          </span>
          <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
            {current}
          </p>
        </div>
      </div>
    </div>
  );
}

TimeDisplay.propTypes = {
  label: PropTypes.string,
  best: PropTypes.string,
  current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
