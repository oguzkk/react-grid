import React, {
  forwardRef,
  RefForwardingComponent,
  useImperativeHandle,
  useRef,
  createRef,
} from "react";
import {
  IReactGridRowProps,
  IReactGridColumn,
  IReactGridCellHandles,
  IReactGridRowHandles,
  ICellRefList,
} from "../../models/interfaces";
import { ReactGridCell } from "../cell";

const RowComponent: RefForwardingComponent<
  IReactGridRowHandles,
  IReactGridRowProps
> = (props, ref) => {
  const cellRefList = useRef<ICellRefList[]>([]);

  useImperativeHandle(ref, () => ({
    rearrangeCellWidths() {
      cellRefList.current.forEach((cellRefItem) => {
        if (
          cellRefItem.cellRef.current &&
          cellRefItem.cellRef.current.innerDivRef.current
        ) {
          cellRefItem.cellRef.current.innerDivRef.current.style.width =
            props.columns[cellRefItem.columnIndex].width + "px";
        }
      });
    },
  }));

  return (
    <div className="react-grid-row">
      {props.columns.map((column: IReactGridColumn, columnIndex: number) => {
        const cellRef = createRef<IReactGridCellHandles>();
        cellRefList.current.push({
          cellRef,
          columnIndex,
        });
        return (
          <ReactGridCell
            {...props}
            ref={cellRef}
            key={columnIndex}
            rowIndex={props.rowIndex}
            columnIndex={columnIndex}
            row={props.data}
            column={column}
          ></ReactGridCell>
        );
      })}
    </div>
  );
};

export const ReactGridRow = forwardRef(RowComponent);
