import React, {
  createRef,
  forwardRef,
  RefForwardingComponent,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import "../../assets/grid.css";
import { Constants } from "../../models/constants";
import { CallBackType, ColumnSizeType } from "../../models/enums";
import {
  IReactGridColumn,
  IReactGridHandles,
  IReactGridProps,
  IReactGridRowHandles,
  IReactGridHeaderRowHandles,
} from "../../models/interfaces";
import { ReactGridHeaderRow } from "../headerRow";
import { ReactGridRow } from "../row";

const GridComponent: RefForwardingComponent<
  IReactGridHandles,
  IReactGridProps
> = (props, ref) => {
  const mainWrapperDiv = useRef<HTMLDivElement>(null);
  const rowHeaderRef = useRef<IReactGridHeaderRowHandles>(null);
  const rowRefList = useRef<React.RefObject<IReactGridRowHandles>[]>([]);

  useEffect(() => {
    if (props.visible === false) {
      mainWrapperDiv.current!.style.display = "none";
    } else {
      mainWrapperDiv.current!.style.display = "block";
    }
  }, [props.visible]);

  useImperativeHandle(ref, () => ({
    get sizeColumns() {
      return props.sizeColumns;
    },
  }));

  const callBack = (callBackType: CallBackType) => {
    switch (callBackType) {
      case CallBackType.lastCellRendered: {
        const mainWrapperWidth =
          mainWrapperDiv.current?.getBoundingClientRect().width || 0;
        props.columns.forEach((column: IReactGridColumn) => {
          switch (props.sizeColumns) {
            case ColumnSizeType.fixedWidth: {
              if (column.width === undefined) {
                column.width = Constants.fixedColumnWidth;
              }
              break;
            }
            case ColumnSizeType.autoSize: {
              break;
            }
            case ColumnSizeType.fitToGrid: {
              column.width = mainWrapperWidth / props.columns.length;
              break;
            }
            default: {
              column.width = mainWrapperWidth / props.columns.length;
              break;
            }
          }
        });
        rowRefList.current.forEach(
          (rowRef: React.RefObject<IReactGridRowHandles>) => {
            rowRef.current?.rearrangeCellWidths();
          }
        );
        rowHeaderRef.current?.rearrangeCellWidths();
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
        ref={rowHeaderRef}
        callBack={callBack}
      ></ReactGridHeaderRow>
      {props.dataSource &&
        props.dataSource.map((rowValue: any, index: number) => {
          const rowRef = createRef<IReactGridRowHandles>();
          rowRefList.current.push(rowRef);
          return (
            <ReactGridRow
              {...props}
              ref={rowRef}
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
