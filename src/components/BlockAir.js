import React from "react";

const BlockAir = ({ weather }) => {
  return (
    <div className="block block-air">
      <h4>Air Pressure</h4>
      <p>
        {Math.round(weather.air_pressure)}
        <span>mb</span>
      </p>
    </div>
  );
};

export default BlockAir;
