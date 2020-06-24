import React, { forwardRef, useRef, useEffect } from "react";
import { IReactGridCellProps } from "../../models/interfaces";
import { ColumnSizeType, CallBackType } from "../../models/enums";

const CellComponent = (props: IReactGridCellProps, ref: any) => {
  const reactGridCellInnerDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    switch (props.sizeColumns) {
      case ColumnSizeType.autoSize: {
        const requiredCellWidth =
          reactGridCellInnerDiv.current!.scrollWidth + 5;
        if (requiredCellWidth > (props.column.width || 0)) {
          props.column.width = requiredCellWidth;
        }

        if (
          props.dataSource?.length === props.rowIndex + 1 &&
          props.columns.length === props.columnIndex + 1
        ) {
          props.callBack(CallBackType.lastCellRendered);
        }
        break;
      }
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [null]);

  return (
    <div
      ref={reactGridCellInnerDiv}
      className="react-grid-cell"
      style={{
        width: props.column.width,
      }}
    >
      {props.row[props.column.field]}
    </div>
  );
};

export const ReactGridCell = forwardRef(CellComponent);
