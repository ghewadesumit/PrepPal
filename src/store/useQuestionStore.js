import { create } from "zustand";
import * as QuestionMockData from "../constants/mock";
import * as dsaQuestionMockData from "../constants/mockDsaQuestions";
import * as frontendQuestionMockData from "../constants/mockFrontEndQuestions";

const selectedNavItemArray = [
  {
    nav: "backend",
    sessionKey: QuestionMockData.dsaQuestionsKey,
    defaultRowData: dsaQuestionMockData.questions,
  },
  {
    nav: "frontend",
    sessionKey: QuestionMockData.frontEndQuestionsKey,
    defaultRowData: frontendQuestionMockData.questions,
  },
];

export const useQuestionStore = create((set, get) => ({
  sectionData: null,
  selectedNavItem: "backend",
  setSelectedNavItem: (item) => set({ selectedNavItem: item }),

  totalDsaQuestions: 0,
  completedDsaQuestions: 0,
  revisionDsaQuestions: 0,

  setRevisionDsaQuestions: (revision) =>
    set({ revisionDsaQuestions: revision }),
  setCompletedDsaQuestions: (completed) =>
    set({ completedDsaQuestions: completed }),
  setTotalDsaQuestions: (total) => set({ totalDsaQuestions: total }),

  totalFrontEndQuestions: 0,
  completedFrontEndQuestions: 0,
  revisionFrontEndQuestions: 0,
  setRevisionFrontEndQuestions: (revision) =>
    set({ revisionFrontEndQuestions: revision }),
  setCompletedFrontEndQuestions: (completed) =>
    set({ completedFrontEndQuestions: completed }),
  setTotalFrontEndQuestions: (total) => set({ totalFrontEndQuestions: total }),

  setSectionData: (data) => {
    return set({ sectionData: data });
  },

  // this will count all the questions in the local storage only once.
  initializeStatusCount: () => {
    for (let item of selectedNavItemArray) {
      const { nav, sessionKey, defaultRowData } = item;
      let sessionRowData = localStorage.getItem(sessionKey);

      sessionRowData = sessionRowData
        ? JSON.parse(sessionRowData)
        : defaultRowData;
      const dataKeys = Object.keys(sessionRowData);
      let currentTotalQuestions = 0;
      let currentCompletedQuestions = 0;
      let currentRevisionQuestions = 0;
      for (let key of dataKeys) {
        currentTotalQuestions += sessionRowData[key].questions.length;

        sessionRowData[key].questions.forEach((question) => {
          if (question.completed) {
            currentCompletedQuestions += 1;
          }
          if (question.revision) {
            currentRevisionQuestions += 1;
          }
        });
      }

      const {
        setTotalDsaQuestions,
        setCompletedDsaQuestions,
        setRevisionDsaQuestions,
        setTotalFrontEndQuestions,
        setCompletedFrontEndQuestions,
        setRevisionFrontEndQuestions,
      } = get();

      if (nav === "backend") {
        setTotalDsaQuestions(currentTotalQuestions);
        setCompletedDsaQuestions(currentCompletedQuestions);
        setRevisionDsaQuestions(currentRevisionQuestions);
      }

      if (nav === "frontend") {
        setTotalFrontEndQuestions(currentTotalQuestions);
        setCompletedFrontEndQuestions(currentCompletedQuestions);
        setRevisionFrontEndQuestions(currentRevisionQuestions);
      }
    }
  },
}));
