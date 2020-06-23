import React from "react";
import { ReactGrid } from "./components/grid";
import { ColumnSizeType } from "./models/enums";

function App() {
  return (
    <div className="test-div" style={{ width: 500, height: 500 }}>
      <ReactGrid
        sizeColumns={ColumnSizeType.fitToGrid}
        dataSource={[{ a: 1, b: "B datası" }, { a: 2 }]}
        columns={[
          {
            field: "a",
            header: "A",
          },
          {
            field: "b",
          },
        ]}
      ></ReactGrid>
    </div>
  );
}

export default App;
