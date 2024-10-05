type RangeInputProps = {
  name: string;
  min?: number;
  max?: number;
  onChange: React.ChangeEventHandler<HTMLElement>
};
export default function RangeInput({ name, min, max, onChange }: RangeInputProps) {
  return (
    <div className="range-input-container">
      <input
        placeholder="min"
        data-key="min"
        name={name}
        value={min}
        onChange={onChange}
      />{" "}
      <input
        placeholder="max"
        data-key="max"
        name={name}
        value={max}
        onChange={onChange}
      />
    </div>
  );
}