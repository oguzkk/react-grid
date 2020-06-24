import React, {
  forwardRef,
  RefForwardingComponent,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "../../assets/grid.css";
import { ColumnSizeType, CallBackType } from "../../models/enums";
import {
  IReactGridColumn,
  IReactGridHandles,
  IReactGridProps,
} from "../../models/interfaces";
import { ReactGridHeaderRow } from "../headerRow";
import { ReactGridRow } from "../row";

const GridComponent: RefForwardingComponent<
  IReactGridHandles,
  IReactGridProps
> = (props, ref) => {
  const [columns, setColumns] = useState(props.columns);
  const mainWrapperDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mainWrapperWidth =
      mainWrapperDiv.current?.getBoundingClientRect().width || 0;
    columns.forEach((column: IReactGridColumn) => {
      switch (props.sizeColumns) {
        case ColumnSizeType.autoSize: {
          break;
        }
        case ColumnSizeType.fitToGrid: {
          column.width = mainWrapperWidth / columns.length;
          break;
        }
        default: {
          break;
        }
      }
    });
    setColumns([...columns]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(ref, () => ({
    get sizeColumns() {
      return props.sizeColumns;
    },
  }));

  const callBack = (callBackType: CallBackType) => {
    switch (callBackType) {
      case CallBackType.lastCellRendered: {
        if (props.sizeColumns === ColumnSizeType.autoSize) {
          setColumns([...columns]);
        }
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="react-grid-main-wrapper" ref={mainWrapperDiv}>
      <ReactGridHeaderRow
        {...props}
        columns={columns}
        callBack={callBack}
      ></ReactGridHeaderRow>
      {props.dataSource &&
        props.dataSource.map((rowValue: any, index: number) => {
          return (
            <ReactGridRow
              {...props}
              columns={columns}
              key={index}
              callBack={callBack}
              rowIndex={index}
              data={rowValue}
            ></ReactGridRow>
          );
        })}
    </div>
  );
};

export const ReactGrid = forwardRef(GridComponent);
