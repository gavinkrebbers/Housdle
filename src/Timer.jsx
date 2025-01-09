import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import { clear, get, set } from "idb-keyval";
import Sidebar from "./components/SideBar";
import { Scrambow } from "scrambow";

const AppContext = createContext(null);
export const useAppContext = () => useContext(AppContext);

const scrambow = new Scrambow();

export default function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [scramble, setScramble] = useState("");
  const [times, setTimes] = useState([]);
  const [Ao5s, setAo5s] = useState([]);
  const [Ao12s, setAo12s] = useState([]);
  const [Ao50s, setAo50s] = useState([]);
  const [startingTimer, setStartingTimer] = useState(false);
  const [curAo5, setCurAo5] = useState();
  const [curAo12, setCurAo12] = useState();
  const [curAo50, setCurAo50] = useState();
  const [restartDelay, setRestartDelay] = useState(false); // New state for delay

  const getAoX = (timeArray, averageSize) => {
    let max = Math.max(...timeArray);
    let min = Math.min(...timeArray);
    let average = 0;
    for (let time of timeArray) {
      if (time != max && time != min) {
        average += time;
      }
    }
    return average / (averageSize - 2);
  };

  const getNewScramble = () => {
    setScramble(scrambow.get(1)[0].scramble_string);
  };

  const getAoXs = (timeArray, averageSize) => {
    let AoXs = [];
    let timesInMS = timeArray.map(parseTimeToMs);
    for (let i = 0; i <= timesInMS.length - averageSize; i++) {
      let curTime = timesInMS.slice(i, i + averageSize);
      AoXs.push(getAoX(curTime, averageSize));
    }
    return AoXs;
  };

  const lastAoX = (timeArray, averageSize) => {
    const lastXElements = timeArray.slice(0, averageSize);
    const newAverage = getAoX(lastXElements.map(parseTimeToMs), averageSize);
    return formatTime(newAverage);
  };

  const updateAverages = (timeArray) => {
    const lastAo5 = timeArray.length >= 5 ? lastAoX(timeArray, 5) : "--.--";
    const lastAo12 = timeArray.length >= 12 ? lastAoX(timeArray, 12) : "--.--";
    const lastAo50 = timeArray.length >= 50 ? lastAoX(timeArray, 50) : "--.--";

    setAo5s([lastAo5, ...Ao5s]);
    setAo12s([lastAo12, ...Ao12s]);
    setAo50s([lastAo50, ...Ao50s]);
  };

  const getCurTimes = () => {
    setCurAo5(Ao5s[0] || "--.--");
    setCurAo12(Ao12s[0] || "--.--");
    setCurAo50(Ao50s[0] || "--.--");
  };

  const getAverages = (timeArray) => {
    const Ao5s = timeArray.length >= 5 ? getAoXs(timeArray, 5) : [];
    const Ao12s = timeArray.length >= 12 ? getAoXs(timeArray, 12) : [];
    const Ao50s = timeArray.length >= 50 ? getAoXs(timeArray, 50) : [];
    setAo5s(Ao5s.map(formatTime));
    setAo12s(Ao12s.map(formatTime));
    setAo50s(Ao50s.map(formatTime));
  };

  useEffect(() => {
    const loadTimes = async () => {
      const prevTimes = await get("times");
      if (prevTimes) {
        setTimes(prevTimes);
        getAverages(prevTimes);
        getCurTimes(prevTimes);
        setTime(parseTimeToMs(prevTimes[0]));
      }
    };
    loadTimes();
    getNewScramble();
  }, []);

  useEffect(() => {
    getCurTimes();
  }, [Ao5s, Ao12s, Ao50s]);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    if (minutes > 0) {
      return `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds
        .toString()
        .padStart(2, "0")}`;
    } else {
      return `${seconds.toString().padStart(2, "0")}.${milliseconds
        .toString()
        .padStart(2, "0")}`;
    }
  };

  const parseTimeToMs = (timeString) => {
    const [minutes, seconds] = timeString.split(":").map(parseFloat);
    if (isNaN(seconds)) {
      return minutes * 1000;
    }
    return minutes * 60 * 1000 + seconds * 1000;
  };

  const handleKeyDown = useCallback(
    async (event) => {
      if (isRunning) {
        setIsRunning(false);
        setIsStopped(true);
        const curTime = Date.now() - startTime;
        setTime(curTime);
        addTime(curTime);
      } else if (!isStopped && event.code === "Space" && !restartDelay) {
        setStartingTimer(true);
        setTime(0);
        setStartTime(0);
      }
    },
    [isRunning, isStopped, startTime, restartDelay]
  );

  const handleKeyUp = useCallback(
    (event) => {
      setStartingTimer(false);
      if (event.code === "Space" && !isRunning && !isStopped && !restartDelay) {
        setIsRunning(true);
        setStartTime(Date.now());

        setRestartDelay(true);
        setTimeout(() => {
          setRestartDelay(false);
        }, 750);
      } else if (isStopped) {
        setIsStopped(false);
      }
    },
    [isRunning, isStopped, restartDelay]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    let animationFrameId;

    const updateTime = () => {
      if (isRunning) {
        setTime(Date.now() - startTime);
        animationFrameId = requestAnimationFrame(updateTime);
      }
    };

    if (isRunning) {
      animationFrameId = requestAnimationFrame(updateTime);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isRunning, startTime]);

  const addTime = async (time) => {
    const newTime = formatTime(time);
    const updatedTimes = [newTime, ...times];
    setTimes(updatedTimes);
    getCurTimes(updatedTimes);
    updateAverages(updatedTimes);
    getNewScramble();

    await set("times", updatedTimes);
  };

  const removeTime = async (index) => {
    const updatedTimes = times.filter((_, i) => i != index);
    setTimes(updatedTimes);
    getAverages(updatedTimes);
    setTime(0);

    await set("times", updatedTimes);
  };

  const clearAllData = async () => {
    await clear();
    setIsRunning(false);
    setIsStopped(false);
    setTimes([]);
    setTime(0);
    setAo5s([]);
    setAo12s([]);
    setAo50s([]);
    setCurAo5("--.--");
    setCurAo12("--.--");
    setCurAo50("--.--");
  };

  const sharedData = {
    parseTimeToMs,
    formatTime,
    time,
    curAo5,
    curAo12,
    curAo50,
  };

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <AppContext.Provider value={sharedData}>
        <Sidebar
          times={times}
          Ao5s={Ao5s}
          Ao12s={Ao12s}
          Ao50s={Ao50s}
          removeTime={removeTime}
          clearAllData={clearAllData}
        />
      </AppContext.Provider>
      <div className="flex flex-col items-center justify-center flex-1 p-8 transition-colors duration-200">
        <div className="w-full max-w-2xl p-8 text-center transition-colors duration-200 bg-gray-100 rounded-lg shadow-lg dark:bg-gray-700">
          <h2 className="text-xl font-normal text-gray-800 dark:text-gray-200 mb-4">
            {scramble}
          </h2>
          <div
            className={`select-none font-mono text-9xl mb-4 transition-colors duration-300 ease-in-out ${
              startingTimer
                ? "text-green-600 dark:text-green-400"
                : "text-blue-600 dark:text-blue-400"
            }`}
          >
            {formatTime(time)}
          </div>
          <div className="grid grid-cols-4 gap-4 text-lg font-semibold">
            <div className="p-2 transition-colors duration-200 bg-white rounded dark:bg-gray-600">
              <span className="block text-sm text-gray-600 dark:text-gray-300">
                Mean
              </span>
              <span className="text-gray-900 dark:text-gray-400">
                {formatTime(
                  times.map(parseTimeToMs).reduce((acc, cur) => acc + cur, 0) /
                    (times.length || 1)
                )}
              </span>
            </div>
            <div className="p-2 transition-colors duration-200 bg-white rounded dark:bg-gray-600">
              <span className="block text-sm text-gray-600 dark:text-gray-300">
                Ao5
              </span>
              <span className="text-gray-900 dark:text-gray-400">{curAo5}</span>
            </div>
            <div className="p-2 transition-colors duration-200 bg-white rounded dark:bg-gray-600">
              <span className="block text-sm text-gray-600 dark:text-gray-300">
                Ao12
              </span>
              <span className="text-gray-900 dark:text-gray-400">
                {curAo12}
              </span>
            </div>
            <div className="p-2 transition-colors duration-200 bg-white rounded dark:bg-gray-600">
              <span className="block text-sm text-gray-600 dark:text-gray-300">
                Ao50
              </span>
              <span className="text-gray-900 dark:text-gray-400">
                {curAo50}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
