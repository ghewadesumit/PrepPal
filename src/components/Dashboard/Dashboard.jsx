import React from "react";
import { useQuestionStore } from "../../store/useQuestionStore";
import ProgressBar from "../ProgressBar/ProgressBar";

const Dashboard = () => {
  const {
    totalDsaQuestions,
    completedDsaQuestions,
    revisionDsaQuestions,
    totalFrontEndQuestions,
    completedFrontEndQuestions,
    revisionFrontEndQuestions,
  } = useQuestionStore((state) => state);

  //   console.log("Dashboard ", totalDsaQuestions);
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-8">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Backend (DSA) Progress */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            Back-End (DSA) Progress
          </h2>
          <ProgressBar
            label="Completed Questions"
            value={completedDsaQuestions}
            max={totalDsaQuestions}
            color="bg-blue-600"
          />
          <ProgressBar
            label="Revision Questions (Strive for 0)"
            value={revisionDsaQuestions}
            max={totalDsaQuestions}
            color="bg-purple-600"
            reverse={true}
            showZeroGood={true}
          />
        </div>
        {/* Front-End Progress */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            Front-End Progress
          </h2>
          <ProgressBar
            label="Completed Questions"
            value={completedFrontEndQuestions}
            max={totalFrontEndQuestions}
            color="bg-blue-600"
          />
          <ProgressBar
            label="Revision Questions (Strive for 0)"
            value={revisionFrontEndQuestions}
            max={totalFrontEndQuestions}
            color="bg-purple-600"
            reverse={true}
            showZeroGood={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
