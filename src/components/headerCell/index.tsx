import React, { forwardRef } from "react";
import { IReactGridHeaderCellProps } from "../../models/interfaces";

const HeaderCellComponent = (props: IReactGridHeaderCellProps, ref: any) => {
  return (
    <div
      className="react-grid-header-cell"
      style={{
        width: props.column.width,
      }}
    >
      {props.column.header || props.column.field}
    </div>
  );
};

export const ReactGridHeaderCell = forwardRef(HeaderCellComponent);
