import "./App.css";
import { useState, useEffect } from "react";
import * as QuestionMockData from "./constants/mock";

import Grid from "./components/Grid/Grid";

function App() {
  const [sectionData, setSectionData] = useState([]);
  useEffect(() => {
    const rowInitialData = QuestionMockData.dsaQuestions;
    const sessionRowData = sessionStorage.getItem(
      QuestionMockData.questionsKey
    );

    if (sessionRowData?.length) {
      setSectionData(JSON.parse(sessionRowData));
    } else {
      setSectionData(rowInitialData);
    }
  }, []);
  // const rowInitialData = QuestionMockData.dsaQuestions[0].questions;

  // Container: Defines the grid's theme & dimensions.
  return (
    <div style={{ width: "80vw" }}>
      {sectionData.map((section) => (
        <>
          <h3>{section.sectionName}</h3>
          <Grid rowData={QuestionMockData.dsaQuestions[0].questions} />
        </>
      ))}
    </div>
  );
}

export default App;
