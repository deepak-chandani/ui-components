import DataTable, { Columns } from "./DataTable";
import housesData from "./data/houses.json";
import usersData from "./data/users.json";

type House = (typeof housesData)[number];
type User = (typeof usersData)[number];
const columnsDefs: Array<{ field: keyof House; title: string }> = [
  { field: "id", title: "ID" },
  { field: "street", title: "Street" },
  { field: "city", title: "City" },
  { field: "built_year", title: "Build Year" },
];

const houseColumns: Columns<House> = [
  {
    key: "id",
    label: "ID",
    renderCell: (row) => "No:" + row.id,
    filterType: "range",
    // comparator: (a, b, direction) =>
  },
  { key: "street", label: "Street", filterType: "string" },
  { key: "city", label: "City", filterType: "string" },
  { key: "built_year", label: "Build Year", filterType: "range" },
];

const userColumns: Columns<User> = [
  {
    key: "id",
    label: "ID",
    renderCell: (row) => "No:" + row.id,
    filterType: "range",
    // comparator: (a, b, direction) =>
  },
  { key: "name", label: "Name", filterType: "string" },
  { key: "age", label: "Age", filterType: "range" },
  { key: "occupation", label: "Occupation", filterType: "string" },
];

function DemoApp() {
  return (
    <div className="demo-container">
      <h2>DataTable demo</h2>
      <div>
        <DataTable columns={houseColumns} data={housesData} />
      </div>
      <div>
        <DataTable columns={userColumns} data={usersData} />
      </div>
    </div>
  );
}

export default DemoApp;
