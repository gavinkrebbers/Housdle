import { useAppContext } from "../Timer";
import PropTypes from "prop-types";
import TimeDisplay from "./TimeDisplay";

BestTimes.propTypes = {
  times: PropTypes.arrayOf(PropTypes.string).isRequired,
  Ao5s: PropTypes.arrayOf(PropTypes.string).isRequired,
  Ao12s: PropTypes.arrayOf(PropTypes.string).isRequired,
  Ao50s: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function BestTimes({ times, Ao5s, Ao12s, Ao50s }) {
  const { parseTimeToMs, formatTime, time, curAo5, curAo12, curAo50 } =
    useAppContext();
  const timesInMS = times.map(parseTimeToMs);
  const Ao5sInMS = Ao5s.map(parseTimeToMs);
  const Ao12sInMS = Ao12s.map(parseTimeToMs);
  const Ao50sInMS = Ao50s.map(parseTimeToMs);

  const getMinIndex = (timeArray) => {
    let min = Infinity;
    let index = 0;
    for (const [i, value] of timeArray.entries()) {
      if (value < min) {
        min = value;
        index = i;
      }
    }
    return index;
  };

  const minTime = times[getMinIndex(timesInMS)];
  const minAo5 = Ao5s[getMinIndex(Ao5sInMS)];
  const minAo12 = Ao12s[getMinIndex(Ao12sInMS)];
  const minAo50 = Ao50s[getMinIndex(Ao50sInMS)];

  return (
    <div className="p-4 transition-colors duration-200 border-b bg-gray-50 dark:bg-gray-700">
      <h2 className="mb-3 text-lg font-semibold text-gray-700 dark:text-gray-200">
        Best Times
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <TimeDisplay label="Single" best={minTime} current={formatTime(time)} />
        <TimeDisplay label="Ao5" best={minAo5} current={curAo5} />
        <TimeDisplay label="Ao12" best={minAo12} current={curAo12} />
        <TimeDisplay label="Ao50" best={minAo50} current={curAo50} />
      </div>
    </div>
  );
}
