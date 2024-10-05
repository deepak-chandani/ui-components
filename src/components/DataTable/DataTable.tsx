import React, { useState } from "react";
import "./styles.css";
import SelectItemsPerPage from "./SelectItemsPerPage";
import PaginationControls from "./PaginationControls";
import HeaderFilterInput from "./HeaderFilterInput";
import { ColumnDef, Columns, Filters, SortData, SortDirection } from "./types";
import { filterData, paginateData } from "./utils";

type DataTableProps<TData> = {
  columns: Columns<TData>;
  data: Array<TData>;
};

export default function DataTable<TData extends { id: string | number }>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [perPage, setPerPage] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [sortData, setSortData] = useState<SortData<TData>>({
    field: undefined,
    direction: undefined,
  });
  const [filters, setFilters] = useState<Filters<TData>>({} as Filters<TData>);

  function handlePerPageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setPerPage(+e.target.value);
    setPage(1);
  }

  function handleColumnClick(e: React.MouseEvent<HTMLElement>) {
    const target = e.target;
    // this handler is being triggered when mouse-click is done on HeaderInput, below condition ignores such clicks
    if (target.tagName == "INPUT") return;
    const sortField = target.dataset.field as SortData<TData>["field"];
    const oppositeDirection =
      sortData.direction === SortDirection.ASC
        ? SortDirection.DESC
        : SortDirection.ASC;
    const newSortData = {
      field: sortField,
      direction:
        sortData.field !== sortField ? SortDirection.ASC : oppositeDirection,
    };
    console.log(newSortData);
    setSortData(newSortData);
    // TODO: should we reset page to 1 whenever sort field/direction is changed
  }

  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();
    const target = e.target;
    const { name: field, value } = target;
    const { filterType } = target.dataset;
    console.log(filterType);
    let newFilter = { type: "string", value };
    if (filterType !== "string") {
      const { key } = target.dataset;
      newFilter = {
        type: "range",
        value: {
          ...filters[field]?.value,
          [key]: value ? parseInt(value) : undefined,
        },
      };
    }

    setFilters((prevFilters) => {
      if (!prevFilters) return { [field]: newFilter };
      //
      const newFilters = { ...prevFilters };
      newFilters[field] = newFilter;

      // delete empty filter values
      if (newFilter.value === "") {
        // delete newFilters[field]
      }
      return newFilters;
    });
    setPage(1);
  }

  let records = [...data];
  console.log(filters);
  // const filteredRecords = filterData(records, filters)
  records = filterData(records, filters);

  if (sortData.field) {
    const { field, direction = SortDirection.ASC } = sortData;
    const columnComparator = columns.find(
      (col) => col.key === field
    )?.comparator;
    records.sort((a, b) => {
      if (columnComparator) {
        return columnComparator(a, b, direction);
      }

      const values = [a[field], b[field]];
      if (direction === SortDirection.DESC) {
        values.reverse();
      }
      // for string comparison its better to `str1.localeCompare(str2)`
      const [aValue, bValue] = values;
      if (typeof aValue === "string") {
        return aValue.localeCompare(bValue);
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        return aValue - bValue;
      }
      return 0;
      // this will not work for strings which contain special chars (see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#sorting_non-ascii_characters)
      // return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    });
  }

  const { items, totalPageCount } = paginateData(records, page, perPage);

  function renderFilterInput(c: ColumnDef<TData>) {
    const field = c.key as keyof TData;
    const filter = filters && filters[field];
    return (
      <HeaderFilterInput
        column={c}
        filter={filter}
        onChange={handleFilterChange}
      />
    );
  }

  return (
    <div className="datatable-container">
      <table>
        <thead>
          <tr>
            {columns.map((c) => {
              const { field, direction } = sortData;
              const arrow =
                c.key === field
                  ? direction === SortDirection.ASC
                    ? "⬆"
                    : "⬇"
                  : null;
              return (
                <th key={c.key} data-field={c.key} onClick={handleColumnClick}>
                  {c.label} {arrow}
                  {c.filterType ? renderFilterInput(c) : null}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return (
              <tr key={item.id}>
                {columns.map((col) => {
                  const cellValue =
                    col.renderCell?.(item) ?? item[col.key as keyof TData];
                  return <td key={col.key}>{cellValue}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="controls">
        <SelectItemsPerPage value={perPage} onChange={handlePerPageChange} />
        <PaginationControls
          currentPage={page}
          totalPageCount={totalPageCount}
          onNext={() => setPage((p) => p + 1)}
          onPrevious={() => setPage((p) => p - 1)}
        />
      </div>
    </div>
  );
}




