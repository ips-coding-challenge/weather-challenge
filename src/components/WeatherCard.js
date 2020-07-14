import React from "react";
import { formatDate, getImage, convertCToF } from "../utils/helper";
import { useRecoilValue } from "recoil";
import { unitState } from "../state/state";

const WeatherCard = ({ weather, index }) => {
  const unit = useRecoilValue(unitState);
  return (
    <div className="weather-card">
      <div className="weather-card__day">
        {index === 0 ? "Tomorrow" : formatDate(weather.applicable_date)}
      </div>
      <img src={getImage(weather.weather_state_name)} alt="" />
      <div className="weather-card__temp">
        <div className="max">
          {unit === "c"
            ? Math.round(weather.max_temp)
            : convertCToF(Math.round(weather.max_temp))}
          <span>{unit === "c" ? "°C" : "°F"}</span>
        </div>
        <div className="min">
          {unit === "c"
            ? Math.round(weather.min_temp)
            : convertCToF(Math.round(weather.min_temp))}
          <span>{unit === "c" ? "°C" : "°F"}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
