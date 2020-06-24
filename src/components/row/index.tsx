import React, { forwardRef } from "react";
import { IReactGridRowProps, IReactGridColumn } from "../../models/interfaces";
import { ReactGridCell } from "../cell";

const RowComponent = (props: IReactGridRowProps, ref: any) => {
  return (
    <div className="react-grid-row">
      {props.columns.map((column: IReactGridColumn, index: number) => {
        return (
          <ReactGridCell
            {...props}
            key={index}
            rowIndex={props.rowIndex}
            columnIndex={index}
            row={props.data}
            column={column}
          ></ReactGridCell>
        );
      })}
    </div>
  );
};

export const ReactGridRow = forwardRef(RowComponent);
