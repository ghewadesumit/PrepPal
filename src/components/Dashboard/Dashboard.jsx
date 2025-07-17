import React, { useEffect } from "react";
import { useQuestionStore } from "../../store/useQuestionStore";
import * as QuestionMockData from "../../constants/mock";
import * as dsaQuestionMockData from "../../constants/mockDsaQuestions";
import * as frontendQuestionMockData from "../../constants/mockFrontEndQuestions";

const ProgressBar = ({
  label,
  value,
  max,
  color,
  reverse = false,
  showZeroGood = false,
}) => {
  const percent = max > 0 ? Math.round((value / max) * 100) : 0;
  const displayValue = reverse ? max - value : value;
  const displayPercent =
    reverse && max > 0 ? Math.round(((max - value) / max) * 100) : percent;
  const barColor = color || "bg-blue-600";
  const bgColor = "bg-gray-700";
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-200">{label}</span>
        <span className="text-sm font-medium text-gray-400">
          {reverse && showZeroGood && value === 0 ? (
            <span className="text-green-400 font-semibold">Good!</span>
          ) : (
            `${displayValue} / ${max}`
          )}
        </span>
      </div>
      <div className={`w-full h-4 ${bgColor} rounded-full overflow-hidden`}>
        <div
          className={`${barColor} h-4 transition-all duration-500`}
          style={{ width: `${displayPercent}%` }}
        />
      </div>
    </div>
  );
};

const Dashboard = () => {
  const {
    totalDsaQuestions,
    completedDsaQuestions,
    revisionDsaQuestions,
    totalFrontEndQuestions,
    completedFrontEndQuestions,
    revisionFrontEndQuestions,
    setCompletedDsaQuestions,
    setRevisionDsaQuestions,
    setTotalDsaQuestions,
    setCompletedFrontEndQuestions,
    setRevisionFrontEndQuestions,
    setTotalFrontEndQuestions,
  } = useQuestionStore((state) => state);

  useEffect(() => {
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
        console.log("parsedData", sessionRowData[key].questions);
        sessionRowData[key].questions.forEach((question) => {
          if (question.completed) {
            currentCompletedQuestions += 1;
          }
          if (question.revision) {
            currentRevisionQuestions += 1;
          }
        });
      }

      console.log(
        "Tota Questions:",
        currentTotalQuestions,
        "Completed  Questions:",
        currentCompletedQuestions,
        "Revision  Questions:",
        currentRevisionQuestions
      );
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
  }, []);

  console.log("Dashboard ", totalDsaQuestions);
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
