import React, {
  forwardRef,
  createRef,
  useRef,
  RefForwardingComponent,
  useImperativeHandle,
} from "react";
import {
  IReactGridColumn,
  IReactGridHeaderRowProps,
  IReactGridHeaderCellHandles,
  ICellRefList,
  IReactGridHeaderRowHandles,
} from "../../models/interfaces";
import { ReactGridHeaderCell } from "../headerCell";

const HeaderRowComponent: RefForwardingComponent<
  IReactGridHeaderRowHandles,
  IReactGridHeaderRowProps
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
    <div className="react-grid-header-row">
      {props.columns.map((column: IReactGridColumn, columnIndex: number) => {
        const cellRef = createRef<IReactGridHeaderCellHandles>();
        cellRefList.current.push({
          cellRef,
          columnIndex,
        });
        return (
          <ReactGridHeaderCell
            {...props}
            ref={cellRef}
            key={columnIndex}
            column={column}
          ></ReactGridHeaderCell>
        );
      })}
    </div>
  );
};

export const ReactGridHeaderRow = forwardRef(HeaderRowComponent);
