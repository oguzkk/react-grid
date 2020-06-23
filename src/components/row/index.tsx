import React, { forwardRef } from "react";
import { IReactGridRowProps, IReactGridColumn } from "../../models/interfaces";
import { ReactGridCell } from "../cell";

const RowComponent = (props: IReactGridRowProps, ref: any) => {
  return (
    <div className="react-grid-row">
      {props.columns.map((column: IReactGridColumn, index: number) => {
        return (
          <ReactGridCell
            key={index}
            value={props.data[column.field]}
            column={column}
          ></ReactGridCell>
        );
      })}
    </div>
  );
};

export const ReactGridRow = forwardRef(RowComponent);
