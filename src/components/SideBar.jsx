import PropTypes from "prop-types";
import BestTimes from "./BestTimes";
import Graph from "./Graph";
import PopUp from "./PopUp";

export default function Sidebar({
  times,
  Ao5s,
  Ao12s,
  Ao50s,
  removeTime,
  clearAllData,
}) {
  return (
    <div
      style={{ height: "96%" }}
      className="flex flex-col w-1/4 overflow-hidden transition-colors duration-200 bg-white shadow-md rounded-xl dark:bg-gray-800"
    >
      <div className="flex flex-col h-full">
        <BestTimes times={times} Ao5s={Ao5s} Ao12s={Ao12s} Ao50s={Ao50s} />
        <Graph times={times} Ao5s={Ao5s} Ao12s={Ao12s} />
        <div className="flex-grow overflow-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="sticky top-0 bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  className="px-3 py-2 text-xs font-medium text-center text-gray-500 uppercase dark:text-gray-400"
                  style={{ width: "10%" }}
                >
                  No.
                </th>
                <th
                  className="px-3 py-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                  style={{ width: "25%" }}
                >
                  Time
                </th>
                <th
                  className="px-3 py-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                  style={{ width: "20%" }}
                >
                  Ao5
                </th>
                <th
                  className="px-3 py-2 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                  style={{ width: "20%" }}
                >
                  Ao12
                </th>
                <th
                  className="px-3 py-2 text-xs font-medium text-center text-gray-500 uppercase dark:text-gray-400"
                  style={{ width: "10%" }}
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {times.map((time, index) => (
                <tr
                  key={times.length - 1 - index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-3 py-2 text-sm text-center text-gray-500 dark:text-gray-400">
                    {times.length - index}
                  </td>
                  <td className="px-3 py-2 text-sm text-left text-gray-900 dark:text-gray-100">
                    {time}
                  </td>
                  <td className="px-3 py-2 text-sm text-left text-gray-500 dark:text-gray-400">
                    {index < times.length - 4 ? Ao5s[index] || "--" : "--"}
                  </td>
                  <td className="px-3 py-2 text-sm text-left text-gray-500 dark:text-gray-400">
                    {index < times.length - 11 ? Ao12s[index] || "--" : "--"}
                  </td>
                  <td className="px-3 py-2 text-sm text-center text-gray-500 dark:text-gray-400">
                    <PopUp
                      onContinue={() => removeTime(index)}
                      index={index}
                      buttonType="delete"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex p-4 space-x-4 border-t dark:border-gray-700">
          <PopUp onContinue={clearAllData} buttonType="clearData" />
        </div>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  times: PropTypes.arrayOf(PropTypes.string).isRequired,
  Ao5s: PropTypes.arrayOf(PropTypes.string).isRequired,
  Ao12s: PropTypes.arrayOf(PropTypes.string).isRequired,
  Ao50s: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeTime: PropTypes.func.isRequired,
  clearAllData: PropTypes.func.isRequired,
};
