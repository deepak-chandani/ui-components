type BarListProps = { dataMap?: Map<number, number>; total: number };

export default function BarList({ dataMap, total }: BarListProps) {
  const entries = dataMap ? [...dataMap.entries()] : [];
  return (
    <div className="bar-list">
      {entries.map(([year, count]) => {
        return <Bar key={year} value={count} total={total} />;
      })}
    </div>
  );
}

type BarProps = { value: number; total: number }

function Bar({ value, total }: BarProps) {
  //TODO: on-hover we can show year & its value
  const height = (value / total) * 100;
  console.log(value, height);
  return (
    <div className="bar" style={{ height: height + "%" }}>
      {value}
    </div>
  );
}
