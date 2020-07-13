import React from "react";
import { useRecoilValue } from "recoil";
import { weatherState } from "../state/state";
import WeatherCard from "./WeatherCard";

const Forecast = () => {
  const forecastWeather = useRecoilValue(weatherState);

  return (
    <div className="forecast">
      {forecastWeather &&
        forecastWeather.slice(1, forecastWeather.length).map((w, i) => {
          return <WeatherCard weather={w} index={i} key={w.id} />;
        })}
    </div>
  );
};

export default Forecast;
