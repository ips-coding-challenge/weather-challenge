import React, { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  weatherState,
  loadingState,
  currentCityState,
  showDrawerState,
  unitState,
} from "../state/state";
import { formatDate, getImage, convertCToF } from "../utils/helper";

const Today = ({ setGeolocation }) => {
  const weather = useRecoilValue(weatherState);
  const loading = useRecoilValue(loadingState);
  const currentCity = useRecoilValue(currentCityState);
  const [showDrawer, setShowDrawer] = useRecoilState(showDrawerState);
  const unit = useRecoilValue(unitState);

  const todayWeather = weather && weather[0] ? weather[0] : null;

  const handleLocation = () => {
    if ("geolocation" in navigator) {
      setGeolocation("");
    }
  };

  return (
    <div className="today">
      {loading && <span className="today__loading">Loading...</span>}

      {!loading && weather && weather[0] && (
        <>
          <button
            onClick={() => setShowDrawer(true)}
            className="btn btn-default btn-search"
          >
            Search for places
          </button>
          <button className="detect-location" onClick={handleLocation}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              width="18px"
              height="18px"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
            </svg>
          </button>
          <img
            className="today__img"
            src={getImage(todayWeather.weather_state_name)}
            alt="Weather"
          />

          <div className="today__temp">
            {unit === "c"
              ? Math.round(todayWeather.the_temp)
              : convertCToF(Math.round(todayWeather.the_temp))}
            <span className="unit">{unit === "c" ? "°C" : "°F"}</span>
          </div>

          <h3 className="today__state">{todayWeather.weather_state_name}</h3>

          <div className="today__date">
            Today &middot; {formatDate(todayWeather.applicable_date)}
          </div>

          <div className="today__location">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9C5 13.17 9.42 18.92 11.24 21.11C11.64 21.59 12.37 21.59 12.77 21.11C14.58 18.92 19 13.17 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                fill="#88869D"
              />
            </svg>

            {currentCity && <span>{currentCity.title}</span>}
          </div>
        </>
      )}
    </div>
  );
};

export default Today;
