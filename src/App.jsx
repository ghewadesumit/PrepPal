import "./App.css";
import { useState, useEffect } from "react";
import * as QuestionMockData from "./constants/mock";
import * as dsaQuestionMockData from "./constants/mockDsaQuestions";
import * as frontendQuestionMockData from "./constants/mockFrontEndQuestions";
import Grid from "./components/Grid/Grid";
import NavBar from "./components/NavBar/NavBar";
import AddQuestion from "./components/AddQuestion/AddQuestion";

function App() {
  const [sectionData, setSectionData] = useState([]);
  const [selectedNavItem, setSelectedNavItem] = useState("backend");

  useEffect(() => {}, []);

  useEffect(() => {
    const sessionKey =
      selectedNavItem === "backend"
        ? QuestionMockData.dsaQuestionsKey
        : QuestionMockData.frontEndQuestionsKey;
    const sessionRowData = sessionStorage.getItem(sessionKey);

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

  return (
    <>
      <NavBar selected={selectedNavItem} setSelected={setSelectedNavItem} />

      <AddQuestion />
      <div style={{ width: "80vw" }}>
        {sectionData.map((section) => (
          <>
            <h3>{section.sectionName}</h3>
            <Grid rowData={section.questions} />
          </>
        ))}
      </div>
    </>
  );
}

export default App;
