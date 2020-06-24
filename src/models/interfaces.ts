import { MutableRefObject } from "react";
import { ColumnSizeType, CallBackType } from "./enums";

export interface IReactGridProps {
  dataSource?: any[];
  columns: IReactGridColumn[];
  sizeColumns?: ColumnSizeType;
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

export interface IReactGridRowProps extends IReactGridRowBase {
  rowIndex: number;
  data: any;
}

export interface IReactGridHeaderRowProps extends IReactGridRowBase {}

interface IReactGridCellBase extends IReactGridProps {
  callBack: (type: CallBackType) => void;
  column: IReactGridColumn;
}

export interface IReactGridHeaderCellProps extends IReactGridCellBase {}

export interface IReactGridCellProps extends IReactGridCellBase {
  rowIndex: number;
  columnIndex: number;
  row: any;
}
