type AxisProps = {
  start: number;
  end: number;
  step: number;
  orientation: "horizontal" | "vertical";
};

export default function Axis({
  start,
  end,
  step,
  orientation = "horizontal",
}: AxisProps) {
  function renderMarks() {
    const classes = ["mark", orientation];

    const arrow = orientation === "vertical" ? "➡" : ""; //'⬆';
    const marks = [
      // orientation === 'vertical' ? <div key={0} className={classes.concat('zero').join(' ')}><span>{0}</span> <span>{arrow}</span></div> : null,
    ];
    for (let i = start; i <= end; i += step) {
      marks.push(
        <div key={i} className={classes.join(" ")}>
          <span>{i}</span> <span>{arrow}</span>
        </div>
      );
    }
    return marks;
  }

  const classes = ["axis", orientation];

  return <div className={classes.join(" ")}>{renderMarks()}</div>;
}
