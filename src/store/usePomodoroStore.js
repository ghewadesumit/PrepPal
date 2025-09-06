import { create } from "zustand";
import { updateCalendarActivity } from "../utils/helper";
import { appName } from "../constants/mock";
import confettiSound from "../assets/mp3/confetti-pop.mp3";
import alarmSound from "../assets/mp3/alarm.mp3";

export const usePomodoroStore = create((set, get) => ({
  isStart: false,
  timeLeft: 25 * 60,
  activeTab: "focus",

  setIsStart: (value) => set({ isStart: value }),
  setTimeLeft: (value) => set({ timeLeft: value }),

  setActiveTab: (tab) => {
    const timeMap = {
      focus: 25 * 60,
      break: 5 * 60,
      "long-break": 15 * 60,
    };

    set({
      activeTab: tab,
      timeLeft: timeMap[tab],
      isStart: false,
    });
  },

  updateTimeLeft: (
    calendarData,
    activityCalendarData,
    setCalendarData,
    setActivityCalendarData
  ) => {
    const { timeLeft, activeTab, setTimeLeft, setIsStart } = get();

    if (timeLeft <= 0) {
      if (activeTab === "focus") {
        const audio = new Audio(confettiSound);
        audio.play().then(() => {
          import("canvas-confetti").then((confetti) => {
            confetti.default({ particleCount: 150, spread: 60 });
          });

          setTimeLeft(25 * 60);
        });

        updateCalendarActivity(
          calendarData,
          activityCalendarData,
          setCalendarData,
          setActivityCalendarData
        );
      } else {
        const audio = new Audio(alarmSound);
        audio.play();
      }
      setIsStart(false);
      document.title = `${appName}`;
      return;
    }
    const newTimeLeft = timeLeft - 1;
    document.title = `(${Math.floor(newTimeLeft / 60)}:${(newTimeLeft % 60)
      .toString()
      .padStart(2, "0")}) ${appName}`;
    setTimeLeft(newTimeLeft);
  },

  handleReset: () => {
    set({
      isStart: false,
      timeLeft: 25 * 60,
    });
    document.title = `${appName}`;
  },
}));
