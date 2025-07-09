import "./App.css";
import { useState, useEffect } from "react";
import * as QuestionMockData from "./constants/mock";
import * as dsaQuestionMockData from "./constants/mockDsaQuestions";
import * as frontendQuestionMockData from "./constants/mockFrontEndQuestions";
import Grid from "./components/Grid/Grid";
import NavBar from "./components/NavBar/NavBar";
import AddQuestion from "./components/AddQuestion/AddQuestion";
import NewGrid from "./components/NewGrid/NewGrid";

import { Plus, ChevronDown, ChevronRight } from "lucide-react";

function App() {
  const [sectionData, setSectionData] = useState(null);
  const [selectedNavItem, setSelectedNavItem] = useState("backend");
  const [isOpenAddQuestion, setIsOpenAddQuestion] = useState(false);
  const [questionSections, setQuestionSections] = useState([]);
  const [expandedSections, setExpandedSections] = useState({});
  const [companies, setCompanies] = useState({});

  useEffect(() => {
    const sessionKey =
      selectedNavItem === "backend"
        ? QuestionMockData.dsaQuestionsKey
        : QuestionMockData.frontEndQuestionsKey;
    const sessionRowData = localStorage.getItem(sessionKey);
    const localStorageCompaniesData = localStorage.getItem(
      QuestionMockData.companiesKey
    );

    const sectionData =
      selectedNavItem === "backend"
        ? dsaQuestionMockData.sections
        : frontendQuestionMockData.sections;

    setQuestionSections(sectionData);

    if (sessionRowData?.length) {
      setSectionData(JSON.parse(sessionRowData));
    } else {
      const rowInitialData =
        selectedNavItem === "backend"
          ? dsaQuestionMockData.questions
          : frontendQuestionMockData.questions;
      setSectionData(rowInitialData);
    }

    if (localStorageCompaniesData?.length) {
      setCompanies(JSON.parse(localStorageCompaniesData));
    } else {
      setCompanies(QuestionMockData.companiesData);
    }

    // Reset expanded sections when switching tabs
    setExpandedSections({});
  }, [selectedNavItem]);

  const toggleSection = (sectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  console.log("section Data", questionSections);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <div className="sticky top-0 z-40 backdrop-blur-lg bg-gray-900/95 border-b border-gray-800">
        <NavBar selected={selectedNavItem} setSelected={setSelectedNavItem} />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Question Bank
            </h1>
            <p className="text-gray-400 mt-2">
              Manage your {selectedNavItem} interview questions
            </p>
          </div>

          {/* Add Question Button */}
          <button
            onClick={() => setIsOpenAddQuestion(true)}
            className="group relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-200" />
            <span>Add Question</span>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-200" />
          </button>
        </div>

        {/* Add Question Modal */}
        {isOpenAddQuestion && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsOpenAddQuestion(false)}
            />
            <div className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
              <AddQuestion
                selectedNavItem={selectedNavItem}
                sectionData={sectionData}
                setSectionData={setSectionData}
                questionSectionsData={questionSections}
                setIsOpen={setIsOpenAddQuestion}
                companies={companies}
                setCompanies={setCompanies}
              />
            </div>
          </div>
        )}

        {/* Accordion Sections */}
        {sectionData !== null && (
          <div className="space-y-4">
            {Object.keys(sectionData).map((sectionKey, index) => (
              <div
                key={sectionKey}
                className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleSection(sectionKey)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-750 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        {sectionData[sectionKey].sectionName}
                      </h2>
                      <p className="text-gray-400 text-sm mt-1">
                        {sectionData[sectionKey].questions?.length || 0}{" "}
                        questions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="px-3 py-1 bg-gray-700 text-gray-300 text-sm font-medium rounded-full">
                      {sectionData[sectionKey].questions?.length || 0} items
                    </div>
                    {expandedSections[sectionKey] ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Accordion Content */}
                {expandedSections[sectionKey] && (
                  <div className="border-t border-gray-700 p-6">
                    {/* <AgGrid rowData={sectionData[sectionKey].questions} /> */}
                    {/* <Grid rowData={sectionData[sectionKey].questions} /> */}
                    <NewGrid
                      rowData={sectionData[sectionKey].questions}
                      companies={companies}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {sectionData === null && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No questions yet
            </h3>
            <p className="text-gray-400 text-center max-w-md">
              Get started by adding your first question to build your interview
              question bank.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
