import React from "react";

const BlockWind = ({ weather }) => {
  return (
    <div className="block block-wind">
      <h4>Wind Status</h4>
      <p>
        {Math.round(weather.wind_speed)}
        <span>Mph</span>
      </p>
      <div className="block-wind__direction">
        <div className="wind-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width="18px"
            height="18px"
            style={{
              transform: `rotate(${Math.round(weather.wind_direction)}deg)`,
            }}
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
          </svg>
        </div>
        <span>{weather.wind_direction_compass}</span>
      </div>
    </div>
  );
};

export default BlockWind;
