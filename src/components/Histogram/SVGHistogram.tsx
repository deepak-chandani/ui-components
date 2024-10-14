import React, { useState, useEffect } from "react";
import useDimensions from "./useDimensions";
import { fetchData, tabulateData } from "./utils.ts";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './styles-svg.css'

const defaultData = [
  { decade: "1950s", value: 20 },
  { decade: "1960s", value: 20 },
  { decade: "1970s", value: 30 },
  { decade: "1980s", value: 39 },
  { decade: "1990s", value: 30 },
  { decade: "2000s", value: 50 },
  { decade: "2010s", value: 62 },
];

const Histogram = () => {
  const { dimensions, ref } = useDimensions();
  const [dataMap, setDataMap] = useState<Map<number, number>>();
  const [data, setData] =
    useState<Array<{ decade: string | number; value: number }>>(defaultData);
  const [loading, setLoading] = useState(true);

  function loadData() {
    setLoading(true);
    fetchData().then((years) => {
      setLoading(false);
      const map = tabulateData(years);
      setDataMap(map);
      const entries = map.entries();
      setData(
        Array.from(entries).map(([decade, value]) => {
          return { decade, value };
        })
      );
    });
  }

  useEffect(() => {
    loadData();
  }, []);

  console.log({ dataMap });
  
  if (loading || dimensions===null) {
    return (
      <div className="histogram-container">
        <div className="graph">
        <Skeleton count={10} />
        </div>
      </div>
    );
  }

  const margin = { top: 20, right: 20, bottom: 30, left: 60 };
  const width = dimensions.width - margin.left - margin.right;
  const height = dimensions.height - margin.top - margin.bottom;

  const maxValue = Math.max(...data.map((d) => d.value));
  const barWidth = width / data.length;

  // Calculate tick values for Y-axis
  const yTicks = [0, Math.floor(maxValue / 4), Math.floor(maxValue / 2), Math.floor((3 * maxValue) / 4), Math.floor(maxValue)];
  // [0, 25%, 50%, 75%, 100%]

  return (
    <div ref={ref} className="svg-histogram-container">
        <svg width={dimensions.width} height={dimensions.height}>
          <g transform={`translate(${margin.left},${margin.top})`}>
            {/* Y-axis line */}
            <line x1={0} y1={0} x2={0} y2={height} stroke="black" />

            {/* Y-axis ticks and labels */}
            {yTicks.map((tick) => (
              <g
                key={tick}
                transform={`translate(0,${height - (tick / maxValue) * height})`}
              >
                <line x1={-6} y1={0} x2={0} y2={0} stroke="black" />
                <text
                  x={-10}
                  y={0}
                  textAnchor="end"
                  alignmentBaseline="middle"
                  fontSize="12"
                >
                  {tick}
                </text>
              </g>
            ))}

            {/* Bars */}
            {data.map((d, i) => (
              <g key={d.decade}>
                <text
                  key={'value-for-'+d.decade}
                  x={(i * barWidth) - 10  + barWidth / 2}
                  y={height - (d.value / maxValue) * height}
                  fontSize="12"
                >
                  {d.value}
                </text>
                <rect
                  key={d.decade}
                  x={i * barWidth}
                  y={height - (d.value / maxValue) * height}
                  width={barWidth - 6}
                  height={(d.value / maxValue) * height}
                  fill="#8884d8"
                />
              </g>
            ))}

            {/* X-axis line */}
            {/* <line x1={0} y1={height+1} x2={width} y2={height+1} stroke="black" /> */}

            {/* X-axis labels */}
            {data.map((d, i) => (
              <text
                key={d.decade}
                x={i * barWidth + barWidth / 2}
                y={height + 20}
                textAnchor="middle"
                fontSize="12"
              >
                {d.decade}
              </text>
            ))}

            {/* Horizontal grid lines */}
            {yTicks.map((tick) => (
              <line
                key={tick}
                x1={0}
                y1={height - (tick / maxValue) * height}
                x2={width}
                y2={height - (tick / maxValue) * height}
                stroke="#ccc"
                strokeDasharray="5,5"
              />
            ))}
          </g>
        </svg>
      <div className="button-container">
        <button className="btn-refresh" onClick={loadData}>
          Refresh 🔃
        </button>
      </div>
    </div>
    
  );
};

export default Histogram;
