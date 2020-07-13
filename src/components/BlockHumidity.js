import React from "react";

import ProgressBar from "./ProgressBar";

const BlockHumidity = ({ weather }) => {
  return (
    <div className="block block-humidity">
      <h4>Humidity</h4>
      <p>
        {Math.round(weather.humidity)}
        <span>%</span>
      </p>

      <ProgressBar value={weather.humidity} />
    </div>
  );
};

export default BlockHumidity;
