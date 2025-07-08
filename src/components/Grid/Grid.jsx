import { useEffect } from "react";

import { AgGridReact } from "ag-grid-react";
import * as QuestionMockData from "../../constants/mock";

const Grid = ({ rowData }) => {
  const colInitialData = QuestionMockData.questionsColumnDefinition;

  useEffect(() => {
    sessionStorage.getItem(QuestionMockData.questionsKey);
  }, []);

  const defaultColDef = {
    flex: 1,
  };

  const handleCellClick = (event) => {
    console.log("Cell clicked:", event);
  };

  // Container: Defines the grid's theme & dimensions.
  return (
    <div style={{ width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colInitialData}
        defaultColDef={defaultColDef}
        domLayout="autoHeight"
        onCellClicked={handleCellClick}
      />
    </div>
  );
};

export default Grid;
