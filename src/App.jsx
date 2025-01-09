import { useEffect, useState } from "react";
import Timer from "./Timer";
import Background from "./components/Background";
import { Moon, Sun } from "lucide-react";
import { Gradient } from "whatamesh";
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <div
        className={`min-h-screen max-h-screen overflow-hidden ${
          isDarkMode ? "dark" : ""
        }`}
      >
        <Background isDarkMode={isDarkMode} />
        <div className="relative z-10 w-full h-full p-4">
          <button
            onClick={toggleDarkMode}
            className="fixed p-2 text-gray-800 transition-colors duration-200 bg-gray-200 rounded-full top-4 right-4 dark:bg-gray-700 dark:text-gray-200"
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {isDarkMode ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </button>
          <Timer />
        </div>
      </div>
    </>
  );
}
