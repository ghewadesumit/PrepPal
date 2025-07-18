import { create } from "zustand";
import * as QuestionMockData from "../constants/mock";
import * as dsaQuestionMockData from "../constants/mockDsaQuestionsCopy";
// import * as frontendQuestionMockData from "../constants/mockFrontEndQuestions";

const selectedNavItemArray = [
  {
    nav: "backend",
    sectionSessionKey: QuestionMockData.dsaSectionKey,
    questionSetSessionKey: QuestionMockData.dsaQuestionSetKey,
    defaultRowData: dsaQuestionMockData.questions,
    questionSet: dsaQuestionMockData.dsaQuestions,
  },
  // {
  //   nav: "frontend",
  //   sessionKey: QuestionMockData.frontEndQuestionsKey,
  //   defaultRowData: frontendQuestionMockData.questions,
  // },
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
    const dsaQuestionSet = dsaQuestionMockData.dsaQuestions;
    for (let item of selectedNavItemArray) {
      const {
        nav,
        sectionSessionKey,
        questionSetSessionKey,
        defaultRowData,
        questionSet,
      } = item;

      //get section and question id object
      let sessionRowData = localStorage.getItem(sectionSessionKey);
      sessionRowData = sessionRowData
        ? JSON.parse(sessionRowData)
        : defaultRowData;

      // get all the questions related to the selected nav item
      let questionSetData = localStorage.getItem(questionSetSessionKey);
      questionSetData = questionSetData
        ? JSON.parse(questionSetData)
        : questionSet["allQuestions"];

      const dataKeys = Object.keys(sessionRowData);
      let currentTotalQuestions = 0;
      let currentCompletedQuestions = 0;
      let currentRevisionQuestions = 0;
      for (let key of dataKeys) {
        currentTotalQuestions += sessionRowData[key].length;

        sessionRowData[key].forEach((question) => {
          if (dsaQuestionSet[question].completed) {
            currentCompletedQuestions += 1;
          }
          if (dsaQuestionSet[question].revision) {
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
