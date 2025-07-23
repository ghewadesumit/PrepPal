import { create } from "zustand";
import * as QuestionMockData from "../constants/mock";
import * as dsaQuestionMockData from "../constants/mockDsaQuestionsCopy";
import * as frontendQuestionMockData from "../constants/mockFrontEndQuestionsCopy";

const selectedNavItemArray = [
  {
    nav: "backend",
    sectionSessionKey: QuestionMockData.dsaSectionKey,
    questionSetSessionKey: QuestionMockData.dsaQuestionsKey,
    defaultRowData: dsaQuestionMockData.questions,
    questionSet: dsaQuestionMockData.dsaQuestions,
  },
  {
    nav: "frontend",
    sectionSessionKey: QuestionMockData.frontEndSectionKey,
    questionSetSessionKey: QuestionMockData.frontEndQuestionsKey,
    defaultRowData: frontendQuestionMockData.questions,
    questionSet: frontendQuestionMockData.frontendQuestions,
  },
];

export const useQuestionStore = create((set, get) => ({
  sectionData: null,
  selectedNavItem: "backend",

  allDsaQuestionsSet: null,
  allFrontEndQuestionsSet: null,
  questionSections: [],
  setQuestionSections: (data) => set({ questionSections: data }),
  setAllDsaQuestionsSet: (data) => set({ allDsaQuestionsSet: data }),
  setAllFrontEndQuestionsSet: (data) => set({ allFrontEndQuestionsSet: data }),

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
    const {
      setTotalDsaQuestions,
      setCompletedDsaQuestions,
      setRevisionDsaQuestions,
      setTotalFrontEndQuestions,
      setCompletedFrontEndQuestions,
      setRevisionFrontEndQuestions,
      setAllDsaQuestionsSet,
      setAllFrontEndQuestionsSet,
      setQuestionSections,
    } = get();

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
          if (questionSetData[question].completed) {
            currentCompletedQuestions += 1;
          }
          if (questionSetData[question].revision) {
            currentRevisionQuestions += 1;
          }
        });
      }

      if (nav === "backend") {
        setAllDsaQuestionsSet(questionSetData);
        setTotalDsaQuestions(currentTotalQuestions);
        setCompletedDsaQuestions(currentCompletedQuestions);
        setRevisionDsaQuestions(currentRevisionQuestions);
        setQuestionSections;
      }

      if (nav === "frontend") {
        setAllFrontEndQuestionsSet(questionSetData);
        setTotalFrontEndQuestions(currentTotalQuestions);
        setCompletedFrontEndQuestions(currentCompletedQuestions);
        setRevisionFrontEndQuestions(currentRevisionQuestions);
        setQuestionSections;
      }
    }
  },
}));
