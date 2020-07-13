import React from "react";

const ProgressBar = ({ value }) => {
  return (
    <div className="progressBar">
      <div className="progressBar__legend">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
      <div className="progressBar__bar">
        <div
          className="progressBar__bar--progress"
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <div className="progressBar__unit">%</div>
    </div>
  );
};

export default ProgressBar;
