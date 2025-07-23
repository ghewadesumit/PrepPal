import { cloneDeep } from "lodash";
import { activityCalendarKey } from "../constants/mock";

export const updateCalendarActivity = (
  calendarData,
  activityCalendarData,
  setCalendarData,
  setActivityCalendarData
) => {
  const date = new Date();
  const storageKey = activityCalendarKey;
  const formattedDate = date.toISOString().split("T")[0];

  const newCalendarData = cloneDeep(calendarData);
  const newActivityCalendarData = cloneDeep(activityCalendarData);
  const dayData = newCalendarData.find((item) => item.date === formattedDate);
  if (dayData) {
    dayData.count += 1;
    dayData.level = Math.min(Math.ceil(dayData.count / 2), 4); // 0-4 levels based on count
  }
  setCalendarData(newCalendarData);
  // todo: we will fetch the year from the selected year
  newActivityCalendarData[new Date().getFullYear()] = newCalendarData;

  localStorage.setItem(storageKey, JSON.stringify(newActivityCalendarData));

  setActivityCalendarData(newActivityCalendarData);
};
