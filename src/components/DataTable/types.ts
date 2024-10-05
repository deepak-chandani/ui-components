import { ReactNode } from "react";

export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type SortData<TData> = {
  field?: keyof TData;
  direction?: SortDirection;
};

type FilterType = "string" | "range";

export type ColumnDef<T> = Readonly<{
  key: string;
  label: string;
  renderCell?: (row: T) => ReactNode;
  filterType?: FilterType;
  comparator?: (a: T, b: T, direction: SortDirection) => number;
}>;

export type Columns<T> = ReadonlyArray<ColumnDef<T>>;

export type Filter =
  | { type: "string"; value: string }
  | {
      type: "range";
      value: { min?: number; max?: number };
    };

export type Filters<TData> = Record<keyof TData, Filter>;