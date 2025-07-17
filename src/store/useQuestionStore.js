import { create } from "zustand";

export const useQuestionStore = create((set) => ({
  sectionData: null,
  selectedNavItem: "backend",
  setSelectedNavItem: (item) => set({ selectedNavItem: item }),
  totalDsaQuestions: 0,
  completedDsaQuestions: 0,
  revisionDsaQuestions: 0,

  setRevisionDsaQuestions: (revision) =>
    set({ revisionDsaQuestions: revision }),
  setCompletedDsaQuestions: (completed) =>
    set({ completedQuestions: completed }),
  setTotalDsaQuestions: (total) => set({ totalQuestions: total }),

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
}));
