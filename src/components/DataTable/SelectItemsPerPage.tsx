type SelectItemsPerPageProps = {
  value: number;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

export default function SelectItemsPerPage({ value, onChange }: SelectItemsPerPageProps) {
  const options = [5, 10, 15, 20];

  return (
    <select value={value} onChange={onChange}>
      {options.map((item, index) => {
        return (
          <option key={index} value={item}>
            Show {item}
          </option>
        );
      })}
    </select>
  );
}