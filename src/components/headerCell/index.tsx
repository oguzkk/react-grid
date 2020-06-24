import React, { forwardRef, useRef, useEffect } from "react";
import { IReactGridHeaderCellProps } from "../../models/interfaces";
import { ColumnSizeType } from "../../models/enums";

const HeaderCellComponent = (props: IReactGridHeaderCellProps, ref: any) => {
  const reactGridCellInnerDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    switch (props.sizeColumns) {
      case ColumnSizeType.autoSize: {
        const requiredCellWidth =
          reactGridCellInnerDiv.current!.scrollWidth + 10;
        if (requiredCellWidth < (props.column.width || 0)) {
          props.column.width = requiredCellWidth;
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
