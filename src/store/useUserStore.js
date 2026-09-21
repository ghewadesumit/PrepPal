import { create } from "zustand";


export const useUserStore = create((set) => ({
  calendarData: [],

  userInfo: {
    pictureUrl: "",
    name: "",
    email: "",
    googleId: "",
  },

  setUserInfo: (data) => set({ userInfo: data }),

}));
