import { Filter, Filters } from "./types";

export function paginateData<TData>(data: Array<TData>, page: number, perPage:number) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const items = data.slice(start, end);
  const totalPageCount = Math.ceil(data.length / perPage);
  return { items, totalPageCount };
}

export function filterData<TData>(data: Array<TData>, filters?: Filters<TData>) {
  if (!filters || Object.keys(filters).length === 0) return data;

  return data.filter((row) => {
    const entries = Object.entries(filters) as Array<[string, Filter]>;
    // every filter should match
    return entries.every(([field, filter]) => {
      if (filter.type === "string") {
        return row[field].toLowerCase().includes(filter.value.toLowerCase());
      } else {
        // check field value isInRange(min, max)
        const { min = -Infinity, max = Infinity } = filter.value;
        const val = parseInt(row[field]);
        return val >= min && val <= max;
      }
    });
  });
}