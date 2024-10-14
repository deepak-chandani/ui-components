import Histogram from "./index"
import SVGHistogram from './SVGHistogram'

export default function HistogramDemo(){
  return (
    <div className="demo-container">
      <h3>Histogram component 👇</h3>
      <Histogram />

      <h3>SVG Histogram 👇</h3>
      <SVGHistogram />
    </div>
  )
}