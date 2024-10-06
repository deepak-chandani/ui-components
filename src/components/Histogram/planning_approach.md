
## Approach
 - what state ?
 - component design
 - 1950: 1951...1959 will come under 1950 key
 - to draw y-axis label, min=10 to max=80 stepSize=10

```js
// but we have to maintain the order of keys so btter to take Map<number, number>()
const dataMap = {
  1950: 10,
  1960: 18,
}

// components
 <Graph  />

 <Axis start={10} end={80} stepSize={10} orientation="vertical" />

 <Axis start={1980} end={2010} stepSize={10} orientation="horizontal" />

 // each Bar will have fixed width, and its height will be based on props.value
 <Bar year={1950} value={12} />
```