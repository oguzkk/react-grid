import { MutableRefObject } from "react";
import { ColumnSizeType, CallBackType } from "./enums";

export interface IReactGridProps extends IReactGridEvents {
  dataSource?: any[];
  columns: IReactGridColumn[];
  sizeColumns?: ColumnSizeType;
  visible?: boolean;
}

export interface IValueFormatterParams {
  value: any;
  rowData: any;
  column: IReactGridColumn;
}

interface IReactGridEvents {
  /** Value Formatter call back function for cell values. */
  valueFormatter?: (params: IValueFormatterParams) => any;
}

export interface IReactGridHandles {
  readonly sizeColumns?: ColumnSizeType;
}

export interface IReactGridColumn {
  field: string;
  header?: string;
  width?: number;
}

interface IReactGridRowBase extends IReactGridProps {
  callBack: (type: CallBackType) => void;
}

interface IReactGridRowHandleBase {
  rearrangeCellWidths: () => void;
}

export interface IReactGridRowProps extends IReactGridRowBase {
  rowIndex: number;
  data: any;
}

export interface IReactGridRowHandles extends IReactGridRowHandleBase {}

export interface IReactGridHeaderRowProps extends IReactGridRowBase {}

export interface IReactGridHeaderRowHandles extends IReactGridRowHandleBase {}

interface IReactGridCellBase extends IReactGridProps {
  callBack: (type: CallBackType) => void;
  column: IReactGridColumn;
}

interface IReactGridCellHandlesBase {
  /** Ref of wrapper div */
  readonly innerDivRef: React.RefObject<HTMLDivElement>;
}

export interface IReactGridHeaderCellProps extends IReactGridCellBase {}

export interface IReactGridHeaderCellHandles
  extends IReactGridCellHandlesBase {}

export interface IReactGridCellProps extends IReactGridCellBase {
  rowIndex: number;
  columnIndex: number;
  row: any;
}

export interface IReactGridCellHandles extends IReactGridCellHandlesBase {}

export interface ICellRefList {
  columnIndex: number;
  cellRef: React.RefObject<IReactGridCellHandles>;
}
