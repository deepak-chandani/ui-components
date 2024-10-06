import React, { useEffect } from "react";
import "./styles.css";
import Axis from "./Axis.tsx";
import BarList from "./BarList.tsx";
import { fetchData, tabulateData } from "./utils.ts";

export default function Histogram() {
  const [dataMap, setDataMap] = React.useState<Map<number, number>>();
  const [loading, setLoading] = React.useState(true);

  function loadData() {
    setLoading(true);
    fetchData().then((years) => {
      setLoading(false);
      const map = tabulateData(years);
      setDataMap(map);
    });
  }

  useEffect(() => {
    loadData();
  }, []);

  const years = dataMap ? Array.from(dataMap.keys()) : [];
  let frequency = { start: 0, end: 60 };
  if (dataMap) {
    const sortedValues = [...dataMap.values()].sort((a, b) => a - b);
    const start = Math.floor(sortedValues[0] / 10) * 10;
    const end = Math.ceil(sortedValues.at(-1) / 10) * 10;
    frequency = { start: start, end, max: sortedValues.at(-1) };
    console.log(sortedValues, frequency);
  }

  const total = frequency?.end ?? 40;
  if (loading) {
    return (
      <div className="histogram-container">
        <div className="graph">Loading...</div>
      </div>
    );
  }
  return (
    <>
      <div className="histogram-container">
        <div className="graph">
          <Axis
            start={10}
            end={frequency.end}
            step={10}
            orientation="vertical"
          />
          <BarList dataMap={dataMap} total={total} />
          <Axis
            start={years[0]}
            end={years.at(-1)}
            step={10}
            orientation="horizontal"
          />
        </div>
      </div>
      <div className="button-container">
        <button className="btn-refresh" onClick={loadData}>
          Refresh 🔃
        </button>
      </div>
    </>
  );
}
