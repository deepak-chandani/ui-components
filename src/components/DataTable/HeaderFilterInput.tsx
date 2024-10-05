import RangeInput from "./RangeInput";
import { ColumnDef, Filter } from "./types";

type HeaderFilterInputProps<T> = {
  column: ColumnDef<T>;
  filter?: Filter;
  onChange: (e: React.ChangeEvent<HTMLElement>) => void;
};

export default function HeaderFilterInput<TData>({
  column,
  filter,
  onChange,
}: HeaderFilterInputProps<TData>) {
  // const field = column.key as keyof TData;
  const filterValue = filter ? filter.value : "";
  return (
    <div>
      {column.filterType === "string" ? (
        <input
          name={column.key}
          value={filterValue}
          onChange={onChange}
          data-filter-type={column.filterType}
        />
      ) : (
        <RangeInput
          name={column.key}
          min={filter?.value.min}
          max={filter?.value.max}
          onChange={onChange}
        />
      )}
    </div>
  );
}

