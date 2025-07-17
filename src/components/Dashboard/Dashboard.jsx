import React from "react";
import { useQuestionStore } from "../../store/useQuestionStore";

const Dashboard = () => {
  const {
    totalDsaQuestions,
    completedDsaQuestions,
    revisionDsaQuestions,
    totalFrontEndQuestions,
    completedFrontEndQuestions,
    revisionFrontEndQuestions,
  } = useQuestionStore((state) => state);

  return <div>Dashboard</div>;
};

export default Dashboard;
