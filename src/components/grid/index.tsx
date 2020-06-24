import React, { forwardRef, useState, useEffect, useRef } from "react";
import { IReactGridProps, IReactGridColumn } from "../../models/interfaces";
import "../../assets/grid.css";
import { ReactGridRow } from "../row";
import { ColumnSizeType } from "../../models/enums";
import { ReactGridHeaderRow } from "../headerRow";

const GridComponent = (props: IReactGridProps, ref: any) => {
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

  return (
    <div className="react-grid-main-wrapper" ref={mainWrapperDiv}>
      <ReactGridHeaderRow columns={columns}></ReactGridHeaderRow>
      {props.dataSource &&
        props.dataSource.map((rowValue: any, index: number) => {
          return (
            <ReactGridRow
              key={index}
              data={rowValue}
              columns={columns}
            ></ReactGridRow>
          );
        })}
    </div>
  );
};

export const ReactGrid = forwardRef(GridComponent);
