import "./App.css";
import { useState, useEffect } from "react";
import * as QuestionMockData from "./constants/mock";
import * as dsaQuestionMockData from "./constants/mockDsaQuestions";
import * as frontendQuestionMockData from "./constants/mockFrontEndQuestions";
import Grid from "./components/Grid/Grid";
import NavBar from "./components/NavBar/NavBar";
import AddQuestion from "./components/AddQuestion/AddQuestion";
import { Plus } from "lucide-react";

function App() {
  const [sectionData, setSectionData] = useState(null);
  const [selectedNavItem, setSelectedNavItem] = useState("backend");
  const [isOpenAddQuestion, setIsOpenAddQuestion] = useState(false);
  const [questionSections, setQuestionSections] = useState([]);

  useEffect(() => {
    const sessionKey =
      selectedNavItem === "backend"
        ? QuestionMockData.dsaQuestionsKey
        : QuestionMockData.frontEndQuestionsKey;
    const sessionRowData = localStorage.getItem(sessionKey);

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
  }, [selectedNavItem]);

  console.log("section Data", questionSections);
  return (
    <>
      {/* <div className="bg-red-500 text-white p-4">Tailwind Test</div> */}
      <NavBar selected={selectedNavItem} setSelected={setSelectedNavItem} />

      <button
        onClick={() => setIsOpenAddQuestion(true)}
        className="flex items-center justify-center space-x-2"
      >
        <Plus className="w-5 h-5" />
        <span>Add Question</span>
      </button>
      {isOpenAddQuestion && (
        <AddQuestion
          selectedNavItem={selectedNavItem}
          sectionData={sectionData}
          setSectionData={setSectionData}
          questionSectionsData={questionSections}
          setIsOpen={setIsOpenAddQuestion}
        />
      )}
      {sectionData !== null && (
        <div style={{ width: "80vw" }}>
          {Object.keys(sectionData).map((sectionKey) => (
            <div key={sectionKey} className="mb-8">
              <h3>{sectionData[sectionKey].sectionName}</h3>
              <Grid rowData={sectionData[sectionKey].questions} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
