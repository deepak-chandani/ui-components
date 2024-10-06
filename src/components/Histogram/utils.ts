export async function fetchData() {
  const res = await fetch(
    "https://www.random.org/integers/?num=200&min=1950&max=2019&col=1&base=10&format=plain"
  );
  const txtStr = await res.text();
  return txtStr
    .trim()
    .split("\n")
    .map((s) => parseInt(s))
    .sort((a, b) => a - b);
}

export function tabulateData(years: number[]) {
  return years.reduce((map, year) => {
    const decade = Math.floor(year / 10) * 10;
    if (!map.has(decade)) {
      map.set(decade, 0);
    }

    map.set(decade, map.get(decade) + 1);
    return map;
  }, new Map());
}

const barColors = [
  "rgb(242, 142, 44)",
  "rgb(89, 161, 79)",
  "rgb(175, 122, 161)",
  "rgb(237, 201, 73)",
  "rgb(225, 87, 89)",
];