import React, { useEffect, useState } from "react";
import { updateCalendarActivity } from "../../utils/helper";
import { useActivityStore } from "../../store/useActivityStore";
import { RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

/**
 * Features I want to show:
 * number of pomodoros completed
 * number of focus hours worked
 * number of tasks completed
 * number of breaks taken
 * rain music or lofi music during pomodoro
 * pomodoro timer with start, pause, reset functionality
 */

const Pomodoro = () => {
  const [isStart, setIsStart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [activeTab, setActiveTab] = useState("focus");
  // const [task, setTask] = useState("");
  const timerRef = React.useRef(null);

  const {
    calendarData,
    setCalendarData,
    activityCalendarData,
    setActivityCalendarData,
  } = useActivityStore((state) => state);

  const handleStartOrPause = () => {
    setIsStart((prev) => !prev);
  };

  const handleReset = () => {
    setIsStart(false);
    setTimeLeft(25 * 60);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const updateTimeLeft = () => {
    setTimeLeft((prev) => {
      if (prev <= 0) {
        clearInterval(timerRef.current);

        // update calendar activity when you complete a pomodoro
        if (activeTab === "focus") {
          confetti({ particleCount: 150, spread: 60 });
          updateCalendarActivity(
            calendarData,
            activityCalendarData,
            setCalendarData,
            setActivityCalendarData
          );
        }
        setIsStart(false);
        return 0;
      }

      return prev - 1;
    });
  };

  useEffect(() => {
    if (activeTab === "focus") {
      setTimeLeft(25 * 60); // 25 minutes for focus
      clearInterval(timerRef.current);
      setIsStart(false);
    } else if (activeTab === "break") {
      setTimeLeft(5 * 60); // 5 minutes for short break
      clearInterval(timerRef.current);
      setIsStart(false);
    } else if (activeTab === "long-break") {
      setTimeLeft(15 * 60); // 15 minutes for long break
      clearInterval(timerRef.current);
      setIsStart(false);
    }
  }, [activeTab]);

  useEffect(() => {
    if (isStart) {
      timerRef.current = setInterval(updateTimeLeft, 1000);
    } else {
      clearInterval(timerRef.current); // Clear interval when paused
    }

    return () => clearInterval(timerRef.current); // Cleanup on unmount
  }, [isStart]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 relative">
      <div className="max-w-2xl mx-auto backdrop-blur-lg bg-gray-900/60 rounded-2xl p-8 shadow-2xl border border-gray-700/50">
        {/* {showConfetti && <MyCelebrationPage />} */}
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-8 text-center">
          Pomodoro Timer
        </h1>
        {/* Timer */}
        <div className="text-white flex flex-col items-center justify-center space-y-8">
          <div className="flex space-x-4 bg-gray-800/50 p-2 rounded-lg">
            <button
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "focus"
                  ? "bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg transform scale-105"
                  : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
              }`}
              onClick={() => setActiveTab("focus")}
            >
              Focus
            </button>
            <button
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "break"
                  ? "bg-gradient-to-r from-yellow-400 to-pink-500 text-white shadow-lg transform scale-105"
                  : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
              }`}
              onClick={() => setActiveTab("break")}
            >
              Break
            </button>
            <button
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "long-break"
                  ? "bg-gradient-to-r from-purple-400 to-indigo-500 text-white shadow-lg transform scale-105"
                  : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
              }`}
              onClick={() => setActiveTab("long-break")}
            >
              Long Break
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 blur-3xl rounded-full transform scale-110"></div>
            <div className="relative text-8xl font-bold tracking-wider bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent py-8">
              {formattedMinutes}:{formattedSeconds}
            </div>
          </div>
          {/* <div className="w-full flex flex-col items-center mb-4">
            <label
              htmlFor="pomodoro-task"
              className="text-lg font-medium text-gray-200 mb-2"
            >
              What task will you focus on?
            </label>
            <input
              id="pomodoro-task"
              type="text"
              className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div> */}
          <div className="flex space-x-6">
            <button
              onClick={handleStartOrPause}
              className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                isStart
                  ? "bg-gradient-to-r from-yellow-400 to-pink-500 text-white shadow-lg hover:shadow-pink-500/25"
                  : "bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg hover:shadow-blue-500/25"
              }`}
            >
              {isStart ? "Pause" : "Start"}
            </button>

            <button
              onClick={handleReset}
              className="px-4 py-4 rounded-lg font-semibold bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 transition-all duration-300 flex items-center justify-center"
              aria-label="Reset"
            >
              <RotateCcw className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
