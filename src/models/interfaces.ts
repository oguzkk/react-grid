import { ColumnSizeType } from "./enums";

export interface IReactGridProps {
  dataSource?: any[];
  columns: IReactGridColumn[];
  sizeColumns?: ColumnSizeType;
}

export interface IReactGridColumn {
  field: string;
  header?: string;
  width?: number;
}

export interface IReactGridRowProps {
  data: any;
  columns: IReactGridColumn[];
}

export interface IReactGridCellProps {
  value: any;
  column: IReactGridColumn;
}
