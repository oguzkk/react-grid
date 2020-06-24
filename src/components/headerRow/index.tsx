import React, { forwardRef } from "react";
import {
  IReactGridColumn,
  IReactGridHeaderRowProps,
} from "../../models/interfaces";
import { ReactGridHeaderCell } from "../headerCell";

const HeaderRowComponent = (props: IReactGridHeaderRowProps, ref: any) => {
  return (
    <div className="react-grid-header-row">
      {props.columns.map((column: IReactGridColumn, index: number) => {
        return (
          <ReactGridHeaderCell
            key={index}
            column={column}
          ></ReactGridHeaderCell>
        );
      })}
    </div>
  );
};

export const ReactGridHeaderRow = forwardRef(HeaderRowComponent);
