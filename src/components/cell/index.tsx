import React, { forwardRef } from "react";
import { IReactGridCellProps } from "../../models/interfaces";

const CellComponent = (props: IReactGridCellProps, ref: any) => {
  return (
    <div
      className="react-grid-cell"
      style={{
        width: props.column.width,
      }}
    >
      {props.value}
    </div>
  );
};

export const ReactGridCell = forwardRef(CellComponent);
