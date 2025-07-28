import { create } from "zustand";
import { activityCalendarKey } from "../constants/mock";

export const getInitialCalendarData = () => {
  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear, 0, 1); // January 1st
  const endDate = new Date(currentYear, 11, 31); // December 31st

  const data = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    // Format date manually to avoid timezone issues
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    data.push({
      date: `${year}-${month}-${day}`,
      count: 0,
      level: 0,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

export const useActivityStore = create((set, get) => ({
  calendarData: [],

  activityCalendarData: {},

  setCalendarData: (data) => set({ calendarData: data }),

  setActivityCalendarData: (data) => set({ activityCalendarData: data }),

  setInitialActivityCalendarData: () => {
    const storedData = localStorage.getItem(activityCalendarKey);
    const parsedData = JSON.parse(storedData);
    const currentYear = new Date().getFullYear();

    const { setCalendarData } = get();

    // if there is no data at all, initialize it
    if (!parsedData) {
      const initialData = getInitialCalendarData();
      const newActivityObject = {
        [currentYear]: initialData,
      };
      localStorage.setItem(
        activityCalendarKey,
        JSON.stringify(newActivityObject)
      );
      setCalendarData(newActivityObject[currentYear]);
      set({
        activityCalendarData: newActivityObject,
      });
    } else if (!(currentYear in parsedData)) {
      // if there is no data for the current year, initialize it
      const initialData = getInitialCalendarData();
      parsedData[currentYear] = initialData;
      localStorage.setItem(activityCalendarKey, JSON.stringify(parsedData));
      setCalendarData(initialData);
      set({
        activityCalendarData: parsedData,
      });
    } else {
      // if there is data for the current year, set it

      for (let i = 0; i < parsedData[currentYear].length; i++) {
        const date = new Date(parsedData[currentYear][i].date);
        parsedData[currentYear][i].date = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        parsedData[currentYear][i].count =
          parsedData[currentYear][i].count || 0;
        parsedData[currentYear][i].level =
          parsedData[currentYear][i].level || 0;
      }
      setCalendarData(parsedData[currentYear]);
      set({
        activityCalendarData: parsedData,
      });
    }
  },
}));
