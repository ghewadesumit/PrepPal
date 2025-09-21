import { create } from "zustand";
import { updateCalendarActivity } from "../utils/helper";
import { appName } from "../constants/mock";
import confettiSound from "../assets/mp3/confetti-pop.mp3";
import alarmSound from "../assets/mp3/alarm.mp3";

const pomodoTime = 25 * 60;
const breakTime = 5 * 60;
const longBreakTime = 15 * 60;
// const pomodoTime = 5;
export const usePomodoroStore = create((set, get) => ({
  isStart: false,

  timeLeft: pomodoTime,
  activeTab: "focus",
  timerRef: null,

  setTimerRef: (ref) => set({ timerRef: ref }),

  setIsStart: (value) => set({ isStart: value }),
  setTimeLeft: (value) => set({ timeLeft: value }),
  clearTimer: () => {
    const { timerRef } = get();
    if (timerRef) {
      clearInterval(timerRef);
      set({ timerRef: null });
    }
  },
  setActiveTab: (tab) => {
    const timeMap = {
      focus: pomodoTime,
      break: breakTime,
      "long-break": longBreakTime,
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
    const { timeLeft, activeTab, setTimeLeft, setIsStart, clearTimer } = get();

    if (timeLeft <= 0) {
      if (activeTab === "focus") {
        const audio = new Audio(confettiSound);
        audio.play().then(() => {
          import("canvas-confetti").then((confetti) => {
            confetti.default({ particleCount: 150, spread: 60 });
          });

          setTimeLeft(pomodoTime);
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
      clearTimer();
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
      timeLeft: pomodoTime,
    });

    document.title = `${appName}`;
  },
}));
