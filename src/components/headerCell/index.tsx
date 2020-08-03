import React, {
  forwardRef,
  RefForwardingComponent,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import { ColumnSizeType } from "../../models/enums";
import {
  IReactGridHeaderCellProps,
  IReactGridHeaderCellHandles,
} from "../../models/interfaces";

const HeaderCellComponent: RefForwardingComponent<
  IReactGridHeaderCellHandles,
  IReactGridHeaderCellProps
> = (props, ref) => {
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

  useImperativeHandle(ref, () => ({
    get innerDivRef() {
      return reactGridCellInnerDiv;
    },
  }));

  return (
    <div ref={reactGridCellInnerDiv} className="react-grid-header-cell">
      {props.column.header || props.column.field}
    </div>
  );
};

export const ReactGridHeaderCell = forwardRef(HeaderCellComponent);
