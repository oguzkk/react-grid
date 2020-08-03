import React, {
  forwardRef,
  useRef,
  useEffect,
  RefForwardingComponent,
  useImperativeHandle,
} from "react";
import {
  IReactGridCellProps,
  IReactGridCellHandles,
} from "../../models/interfaces";
import { ColumnSizeType, CallBackType } from "../../models/enums";

const CellComponent: RefForwardingComponent<
  IReactGridCellHandles,
  IReactGridCellProps
> = (props, ref) => {
  const reactGridCellInnerDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    switch (props.sizeColumns) {
      case ColumnSizeType.fitToGrid: {
        break;
      }
      case ColumnSizeType.fixedWidth: {
        break;
      }
      case ColumnSizeType.autoSize:
      default:
        const requiredCellWidth =
          reactGridCellInnerDiv.current!.scrollWidth + 5;
        if (requiredCellWidth > (props.column.width || 0)) {
          props.column.width = requiredCellWidth;
        }
        break;
    }
    if (
      props.dataSource?.length === props.rowIndex + 1 &&
      props.columns.length === props.columnIndex + 1
    ) {
      props.callBack(CallBackType.lastCellRendered);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [null]);

  useImperativeHandle(ref, () => ({
    get innerDivRef() {
      return reactGridCellInnerDiv;
    },
  }));

  const renderInner = () => {
    if (props.valueFormatter) {
      return props.valueFormatter({
        value: props.row[props.column.field],
        rowData: props.row,
        column: props.column,
      });
    }
    return props.row[props.column.field];
  };

  return (
    <div ref={reactGridCellInnerDiv} className="react-grid-cell">
      {renderInner()}
    </div>
  );
};

export const ReactGridCell = forwardRef(CellComponent);
